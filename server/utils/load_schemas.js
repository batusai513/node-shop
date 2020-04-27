const glob = require('glob');
const path = require('path');
const fs = require('fs');

const paths = glob.sync(
  `${path.resolve(__dirname, '..', 'types')}/**/*.schema.graphql`
);

const files = paths.map((path) => {
  return fs.readFileSync(path, { encoding: 'utf-8' });
});

module.exports = function loadSchemas() {
  return files.join('');
};
