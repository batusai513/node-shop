import React from 'react';
import Home from './index';
import { withApollo } from '../utils/create_client';

export default withApollo(Home);
