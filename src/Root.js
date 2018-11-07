import React from 'react';
import { Router } from '@reach/router';

import App from './containers/App';
import Home from './containers/Home';
import Test from './containers/Test';

import NotFound from './components/NotFound';

const Root = () => (
  <App>
    <Router>
      <Home path="/" />
      <Test path="/test" />
      <NotFound default />
    </Router>
  </App>
);

export default Root;
