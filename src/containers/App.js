import React from 'react';

import App from '../components/App';

class AppContainer extends React.Component {
  render() {
    const { children } = this.props;

    return <App>{children}</App>;
  }
}

export default AppContainer;
