import React, { Fragment, useContext } from 'react';
import { Link } from '@reach/router';
import styled, { css } from 'styled-components';
import Device from 'device';

import { ReactComponent as LogoIcon } from 'shared/assets/logo.svg';
import { ReactComponent as SvgNext } from 'shared/assets/icon-next.svg';
import { ReactComponent as SvgPrev } from 'shared/assets/icon-prev.svg';

import GoBack from 'shared/components/GoBack.js';
import SetPasswordModal from 'shared/components/SetPasswordModal';

import AppContext from 'shared/contexts/AppContext';

const Main = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => props.theme.color.blue};
  color: #fff;
  position: relative;
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

  @media ${Device.laptopM} {
    padding: 0 50px;
  }
  @media ${Device.laptopL} {
    padding: 0 15px;
  }
`;

const Logo = styled(LogoIcon)`
  width: 195px;
  height: 60px;
`;
const IconBack = styled(SvgPrev)``;
const IconNext = styled(SvgNext)`
  width: 30px;
  height: 30px;
  background: ${props => props.theme.color.yellow};
  padding: 10px;
  border-radius: 30px;
  display: inline-block;
  margin: 0 0 0 20px;
  vertical-align: top;

  @media ${Device.laptopM} {
    width: 60px;
    height: 60px;
    padding: 20px;
  }
`;

const Body = styled.div`
  background: transparent;
  width: 100%;
  position: static;
  z-index: 2;
`;
const Footer = styled.footer`
  width: 100%;
  font-size: 18px;
  position: relative;
  z-index: 2;

  @media ${Device.laptopM} {
    font-size: 20px;
  }
`;
const FooterWrap = styled.div`
  background: #fff;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
  margin: 40px 0 0 0;
`;
const FooterExternalLinks = styled.div``;
const linkStyles = css`
  font-weight: 500;
  line-height: 30px;
  color: ${props => props.theme.color.blue};
  display: inline-block;

  @media ${Device.laptopM} {
    line-height: 60px;
  }

  &[disabled] {
    pointer-events: none;
    svg {
      opacity: 0.5;
    }
  }
`;
const FooterLink = styled(Link)`
  ${linkStyles}
  text-decoration: none;
`;
const FooterExternalLink = styled.a`
  ${linkStyles}
`;
const SupportLink = styled(FooterExternalLink)`
  margin-right: 15px;
`;
const GithubLink = styled(FooterExternalLink)``;

const App = ({ children, path }) => {
  const { isWalletCreated, password, setModal, storeWallet } = useContext(
    AppContext,
  );

  const isRestore = path && path.startsWith('/restore');

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
              <FooterExternalLinks>
                <SupportLink
                  href="https://t.me/amoveo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Support
                </SupportLink>
                {!window._isElectron ? (
                  <GithubLink
                    href="https://github.com/amoveo-project/js-web-wallet/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </GithubLink>
                ) : null}
              </FooterExternalLinks>
              <FooterLink
                to="/dashboard/"
                disabled={!isWalletCreated}
                onClick={() => {
                  if (window._isElectron) {
                    setModal(<SetPasswordModal />);
                  }
                }}
              >
                <span>{isRestore ? 'Restore' : 'Create'} wallet</span>
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
