import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import Theme from 'theme';

import { ReactComponent as LogoIcon } from 'shared/assets/logo.svg';
import { ReactComponent as SvgNext } from 'shared/assets/icon-next.svg';

const Header = styled.div`
  width: 100%;
  padding: 60px 0 0 0;
  position: relative;
  z-index: 2;
  margin: 0 0 80px 0;
`;
const MainWrap = styled.div`
  width: 100%;
  flex: 1;
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
const IconNext = styled(SvgNext)`
  width: 60px;
  height: 60px;
  background: ${props => Theme.color.yellow};
  padding: 20px;
  border-radius: 30px;
  display: inline-block;
  margin: 0 0 0 20px;
  vertical-align: top;
`;

const Body = styled.div`
  background: transparent;
  width: 100%;
  position: relative;
  z-index: 2;
`;
const HeaderLink = styled(Link)`
  color: #5d8ab8;
`;
const Footer = styled.footer`
  width: 100%;
  font-size: 20px;
  position: relative;
  z-index: 2;
`;
const FooterWrap = styled.div`
  background: #fff;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
`;
const FooterLink = styled(Link)`
  font-weight: 500;
  line-height: 60px;
  color: ${props => Theme.color.blue};
  display: inline-block;
`;

const App = ({ children }) => {
  return (
    <Fragment>
      <MainWrap>
        <Header>
          <Container>
            <Link to="/">
              <Logo />
            </Link>
          </Container>
        </Header>
        <Body>
          <Container>{children}</Container>
        </Body>
      </MainWrap>
      <Footer>
        <Container>
          <FooterWrap>
            <FooterLink to="/support">Support</FooterLink>
            <FooterLink to="/support">
              <span>Create wallet</span>
              <IconNext />
            </FooterLink>
          </FooterWrap>
        </Container>
      </Footer>
    </Fragment>
  );
};

export default App;
