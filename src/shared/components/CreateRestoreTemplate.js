import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import Theme from 'theme';

import { ReactComponent as LogoIcon } from 'shared/assets/logo.svg';
import { ReactComponent as LogoCircleSvg } from 'shared/assets/logo-circle.svg';

const Header = styled.div`
  width: 100%;
  padding: 60px 0 0 0;
  position: relative;
  z-index: 2;
`;
const Container = styled.div`
  width: 100%;
  max-width: 1230px;
  margin: 0 auto;
  padding: 0 15px;
`;

const Logo = styled(LogoIcon)`
  width: 195px;
  height: 60px;

  & g {
  }
`;

const Body = styled.div`
  background: transparent;
  width: 100%;
  position: relative;
  z-index: 2;
`;

const Footer = styled.div`
  width: 100%;
  padding: 48px 0;
  font-size: 20px;
  position: relative;
  z-index: 2;
`;

const HeaderLink = styled(Link)`
  color: #5d8ab8;
`;
const FooterLink = styled(Link)`
  color: ${props => Theme.color.yellow};
  font-weight: 500;
`;

const App = ({ children }) => {
  return (
    <Fragment>
      <Header>
        <Container>
          <Logo />
        </Container>
      </Header>
      <Body>
        <Container>{children}</Container>
      </Body>
      <Footer>
        <Container>
          <FooterLink to="/support">Support</FooterLink>
        </Container>
      </Footer>
    </Fragment>
  );
};

export default App;
