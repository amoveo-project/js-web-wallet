import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import Theme from 'theme';

import { ReactComponent as LogoIcon } from 'shared/assets/logo.svg';
import { ReactComponent as SvgNext } from 'shared/assets/icon-next.svg';

const Main = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => Theme.color.blue};
  color: #fff;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 50%;
    background: rgba(0, 0, 0, 0.15);
    pointer-events: none;
  }
`;
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
const GoBack = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80px;
  background: rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 9;

  &:hover {
    svg {
      transform: translate(-70%, -50%) rotate(180deg);
    }
  }
`;
const IconBack = styled(SvgNext)`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  fill: #fff;
  transition: transform 0.4s;
  transform: translate(-50%, -50%) rotate(180deg);
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
      <Main>
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
        <GoBack to="/">
          <IconBack />
        </GoBack>
      </Main>
    </Fragment>
  );
};

export default App;
