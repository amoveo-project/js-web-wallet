import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Link } from '@reach/router';
import Device from 'device';

import { ReactComponent as LogoIcon } from 'shared/assets/logo.svg';
import { ReactComponent as LogoCircleSvg } from 'shared/assets/logo-circle.svg';

import ExternalLink from 'shared/components/ExternalLink';

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
  padding: 0 20px;

  @media ${Device.laptopM} {
    padding: 0 50px;
  }
  @media ${Device.laptopL} {
    padding: 0 20px;
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
  display: none;

  @media ${Device.laptopM} {
    display: block;
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
  padding: 20px 0;
  font-size: 18px;
  position: relative;
  z-index: 2;

  @media ${Device.laptopM} {
    font-size: 20px;
    padding: 48px 0;
  }
`;
const FooterContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  @media ${Device.laptop} {
    flex-wrap: nowrap;
  }
`;

const BottomLinks = styled.div`
  text-align: left;
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  @media ${Device.laptop} {
    width: auto;
  }
`;
const BottomLinkStyle = css`
  font-size: 14px;
  color: #fff;
  margin: 0 30px 15px 0;
  font-weight: 500;
  opacity: 1;
  transition: opacity 0.4s;
  text-decoration: none;

  @media ${Device.laptop} {
    margin: 0 40px 0 0;
    font-size: 16px;
  }

  &:hover {
    text-decoration: underline;
  }
  &:last-child {
    margin-right: 0;
  }
`;
const BottomLink = styled(Link)`
  ${BottomLinkStyle}
`;
const ExtLink = styled(ExternalLink)`
  ${BottomLinkStyle}
`;
const Powered = styled.div`
  font-size: 16px;
  color: #fff;
  margin: 20px 0 0 0;
  font-weight: 500;
  transition: opacity 0.4s;

  @media ${Device.laptop} {
    margin: 0;
  }

  span {
    opacity: 0.5;
  }
  a {
    color: #fff;
    transition: all 0.4s;
    opacity: 0.5;

    &:hover {
      opacity: 1;
      text-decoration: none;
    }
  }
`;

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
          <FooterContainer>
            <BottomLinks>
              <BottomLink to="/download">Download</BottomLink>
              <BottomLink to="/faq">FAQ</BottomLink>
              <ExtLink to="https://tlg.name/amoveo_wallet">Support</ExtLink>
              <ExtLink to="https://github.com/amoveo-project/js-web-wallet">
                GitHub
              </ExtLink>
            </BottomLinks>
            <Powered>
              <span>Powered by</span>{' '}
              <a
                href="https://exan.tech"
                target="_blank"
                rel="noopener noreferrer"
              >
                Exan.tech
              </a>
            </Powered>
          </FooterContainer>
        </Footer>
        <LogoCircleWrap>
          <LogoCircle />
        </LogoCircleWrap>
      </Main>
    </Fragment>
  );
};

export default HomeTemplate;
