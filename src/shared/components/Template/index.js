import React from 'react';

import Template from './components/Template';

class TemplateContainer extends React.Component {
  render() {
    const { children } = this.props;

    return <Template>{children}</Template>;
  }
}

export default TemplateContainer;
