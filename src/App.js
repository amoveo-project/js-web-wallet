import React from 'react';
import { Router } from '@reach/router';

import GlobalStyles from './globalStyles';

import Template from 'shared/components/Template';
import CreateRestoreTemplate from 'shared/components/CreateRestoreTemplate';

import Home from './screens/Home';
import Create from './screens/Create';
import Restore from './screens/Restore';
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

      <CreateRestoreTemplate default>
        <Create path="/create" />
        <Restore path="/restore" />
      </CreateRestoreTemplate>
    </Router>
  </React.Fragment>
);

export default App;
