import React from 'react';
import { Router } from '@reach/router';

import GlobalStyles from './globalStyles';

import CreateRestoreTemplate from 'shared/components/CreateRestoreTemplate';
import HomeTemplate from 'shared/components/HomeTemplate';

import Create from './screens/Create';
import Dashboard from './screens/Dashboard';
import Exchange from './screens/Exchange';
import Home from './screens/Home';
import NotFound from './screens/NotFound';
import Receive from './screens/Receive';
import Restore from './screens/Restore';
import Send from './screens/Send';
import Test from './screens/Test';

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

      <Dashboard path="/dashboard" />
      <Send path="/send" />
      <Receive path="/receive" />
      <Exchange path="/exchange" />

      <Test path="/test" />

      <NotFound default />
    </Router>
  </React.Fragment>
);

export default App;
