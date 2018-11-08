import React from 'react';
import { Router } from '@reach/router';

import App from './containers/App';
import Home from './containers/Home';
import Test from './containers/Test';

import NotFound from './components/NotFound';

const Root = () => (
  <Router className="routerwrap">
    <Test path="/test" />

    <App default>
      <Home path="/" />
      <NotFound default />
    </App>
  </Router>
);

export default Root;
