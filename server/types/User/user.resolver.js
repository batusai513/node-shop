const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const ms = require('ms');
const jwt = require('jsonwebtoken');
const { transport, makeNiceEmail } = require('../../utils/mailer');

const pRandomBytes = promisify(randomBytes);

module.exports = {
  Query: {
    getUsers(_, __, { db }) {
      return db.user.findMany();
    },
    me(_, __, { db, req }) {
      const { userId } = req;
      if (userId) {
        return db.user.findOne({ where: { id: userId } });
      }

      return null;
    },
  },

  Mutation: {
    async resetPassword(_, { input }, { db, res }) {
      // check if passwords match
      const { resetToken, password, confirmPassword } = input;
      if (password != confirmPassword) {
        throw new Error("Password doesn't match");
      }
      // check if it's a legit reset token
      // check if it's expired
      const [user] = await db.user.findMany({
        where: {
          resetToken,
          AND: {
            resetTokenExpiry: {
              gte: Date.now() - ms('1 hour'),
            },
          },
        },
      });
      console.log(user);
      if (!user) {
        throw new Error('Token invalid or expired');
      }
      // hash the new password
      const hashed = await bcrypt.hash(password, 10);
      // save the new password to user, remove reset token fields
      const updatedUser = await db.user.update({
        where: {
          id: parseInt(user.id, 10),
        },
        data: {
          password: hashed,
          resetTokenExpiry: null,
          resetToken: null,
        },
      });
      // generate jwt
      // set jwt cookie
      sendTokenViaCookie(generateToken(updatedUser.id), res);
      // return updated user
      return updatedUser;
    },
    async requestReset(_, { input }, { db }) {
      const { email } = input;
      // check if user exists
      const user = await db.user.findOne({ where: { email } });
      if (user) {
        // generate the token and expiry time
        const resetToken = (await pRandomBytes(20)).toString('hex');
        const resetTokenExpiry = ms('1 hour') + Date.now();
        await db.user.update({
          where: {
            email,
          },
          data: {
            resetToken,
            resetTokenExpiry,
          },
        });

        console.log(resetToken);

        const mailResponse = await transport.sendMail({
          from: 'richard.batusai@gmail.com',
          to: user.email,
          subject: 'Your password reset token',
          html: makeNiceEmail(`Your password reset token is
          
          <a href="http://localhost:3000/reset?resetToken=${resetToken}">Click here to reset</a>`),
        });

        console.log(mailResponse);

        return {
          message: 'success',
        };
        //email the reset token
      }
      throw new Error('User not found');
    },
    signout(_, __, { res }) {
      res.clearCookie('token');
      return {
        message: 'Logout succesfully',
      };
    },
    async signin(_, { input }, { db, res }) {
      input.email = input.email.toLowerCase();
      const user = await db.user.findOne({
        where: { email: input.email },
      });
      if (user) {
        const matched = await bcrypt.compare(
          input.password,
          user.password,
        );
        if (matched) {
          sendTokenViaCookie(generateToken(user.id), res);
          return user;
        }
      }

      throw new AuthenticationError('Invalid email or password');
    },
    signup(_, { input }, { db, res }) {
      input.email = input.email.toLowerCase();
      return bcrypt.hash(input.password, 10).then((hashed) => {
        input.password = hashed;
        return db.user
          .create({
            data: {
              ...input,
              permissions: {
                set: ['USER'],
              },
            },
          })
          .then((user) => {
            sendTokenViaCookie(generateToken(user.id), res);
            return user;
          })
          .catch((err) => {
            console.warn(err);
            throw err;
          });
      });
    },
  },
};

function generateToken(userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return token;
}

function sendTokenViaCookie(token, res) {
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: ms('1 hour'), //1000 * 60 * 60 * 24,
  });
}
