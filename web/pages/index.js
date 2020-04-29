import React from 'react';
import Items from '../components/Items';
import { withApollo } from '../utils/apollo';

const Home = () => (
  <div>
    <Items />
  </div>
);

export default withApollo({ ssr: true })(Home);
