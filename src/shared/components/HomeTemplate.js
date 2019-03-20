import React, { Fragment } from 'react';
import styled from 'styled-components';
import Device from 'device';

import { ReactComponent as LogoIcon } from 'shared/assets/logo.svg';
import { ReactComponent as LogoCircleSvg } from 'shared/assets/logo-circle.svg';

const Main = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${props => props.theme.color.blue};
  color: #fff;
`;
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

  @media ${Device.laptopM} {
    padding: 0 50px;
  }
  @media ${Device.laptopL} {
    padding: 0 15px;
  }
`;
const LogoCircleWrap = styled.div`
  flex: none;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 70%;
  overflow: hidden;
  pointer-events: none;

  @media ${Device.laptopM} {
    width: 780px;
  }
`;
const Logo = styled(LogoIcon)`
  width: 195px;
  height: 60px;

  & g {
  }
`;
const LogoCircle = styled(LogoCircleSvg)`
  width: 800px;
  height: 800px;
  margin-top: -400px;
  position: absolute;
  top: 50%;
  pointer-events: none;

  @media ${Device.laptopM} {
    width: 960px;
    height: 960px;
    margin-top: -480px;
  }
`;

const Body = styled.div`
  background: transparent;
  width: 100%;
  position: relative;
  z-index: 2;
`;

const Footer = styled.footer`
  width: 100%;
  padding: 48px 0;
  font-size: 18px;
  position: relative;
  z-index: 2;

  @media ${Device.laptopM} {
    font-size: 20px;
  }
`;
const FooterExternalLink = styled.a`
  color: #fff;
  font-weight: 500;
  opacity: 0.5;
  transition: opacity 0.4s;

  &:hover {
    opacity: 1;
  }
`;

const SupportLink = styled(FooterExternalLink)`
  margin-right: 15px;
`;
const GithubLink = styled(FooterExternalLink)``;

const HomeTemplate = ({ children }) => {
  return (
    <Fragment>
      <Main>
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
            <SupportLink
              href="https://tlg.name/amoveo_wallet"
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
                GitHub
              </GithubLink>
            ) : null}
          </Container>
        </Footer>
        <LogoCircleWrap>
          <LogoCircle />
        </LogoCircleWrap>
      </Main>
    </Fragment>
  );
};

export default HomeTemplate;
