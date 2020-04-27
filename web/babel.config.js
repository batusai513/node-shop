module.exports = {
  presets: ['next/babel'],
  plugins: ['import-graphql', 'graphql-tag', ['styled-components', { ssr: true }]],
};
