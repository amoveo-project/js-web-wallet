import React from 'react';
import { Router } from '@reach/router';

import GlobalStyles from './globalStyles';

import HomeTemplate from 'shared/components/HomeTemplate';
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
      <HomeTemplate path="/">
        <Home path="/" />
      </HomeTemplate>

      <CreateRestoreTemplate path="/create">
        <Create path="/" />
      </CreateRestoreTemplate>

      <CreateRestoreTemplate path="/restore">
        <Restore path="/" />
      </CreateRestoreTemplate>

      <Test path="/test" />

      <NotFound default />
    </Router>
  </React.Fragment>
);

export default App;
