import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import { ReactComponent as LogoIcon } from '../assets/icons/logo.svg';

const Header = styled.div`
  background: transparent;
`;

const Logo = styled(LogoIcon)`
  width: 100px;
  height: 100px;

  & g {
    fill: salmon;
  }
`;

const Body = styled.div`
  background: transparent;
`;

const Footer = styled.div`
  background: transparent;
`;

const HeaderLink = styled(Link)`
  color: #5d8ab8;
`;

const App = ({ children }) => {
  return (
    <Fragment>
      <Header>
        <Logo />
        <HeaderLink to="/">Home</HeaderLink>
        <HeaderLink to="/not-found">Not Found</HeaderLink>
      </Header>

      <Body>{children}</Body>

      <Footer>footer</Footer>
    </Fragment>
  );
};

export default App;
