import React from 'react';
import Home from './index';
import { withApollo } from '../utils/apollo';

export default withApollo()(Home);
