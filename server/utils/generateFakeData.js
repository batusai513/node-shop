const faker = require('faker');
const { PrismaClient } = require('@prisma/client');

// const permissionsList = [
//   'ADMIN',
//   'USER',
//   'ITEMCREATE',
//   'ITEMUPDATE',
//   'ITEMDELETE',
//   'PERMISSIONUPDATE',
// ];

const client = new PrismaClient();

console.log('Seeding');

const user = client.user.create({
  data: {
    name: 'Richard Roncancio',
    email: 'richard.batusai+2@gmail.com',
    password: '12345678',
    permissions: {
      set: ['ADMIN'],
    },
  },
});

user.then((u) => {
  const promises = Array(20)
    .fill()
    .map(() =>
      client.item.create({
        data: {
          user: {
            connect: {
              id: u.id,
            },
          },
          title: faker.commerce.productName(),
          description: faker.lorem.words(10),
          price: parseFloat(faker.commerce.price(1000)),
          image: faker.image.technics(500),
          largeImage: faker.image.technics(1000),
        },
      }),
    );

  return Promise.all([...promises]).then(() => {
    console.info('All done');
    process.exit(0);
  });
});
