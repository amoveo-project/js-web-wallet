import React from 'react';
import { Router } from '@reach/router';

import GlobalStyles from './globalStyles';

import Template from 'shared/components/Template';

import Home from './screens/Home';
import Test from './screens/Test';
import NotFound from './screens/NotFound';

const App = () => (
  <React.Fragment>
    <GlobalStyles />

    <Router className="routerwrap">
      <Test path="/test" />

      <Template default>
        <Home path="/" />
        <NotFound default />
      </Template>
    </Router>
  </React.Fragment>
);

export default App;
