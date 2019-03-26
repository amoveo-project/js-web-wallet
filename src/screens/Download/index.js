import React, { Fragment } from 'react';
import styled from 'styled-components';
import Device from 'device';

import { ReactComponent as IconCircleSvg } from 'shared/assets/icon-download-arrow.svg';
import { ReactComponent as SvgPrev } from 'shared/assets/icon-prev.svg';
import { ReactComponent as SvgWindows } from 'shared/assets/icon-windows.svg';
import { ReactComponent as SvgOsx } from 'shared/assets/icon-osx.svg';
import { ReactComponent as SvgLinux } from 'shared/assets/icon-linux.svg';
import { ReactComponent as SvgAndroid } from 'shared/assets/icon-android.svg';
import { ReactComponent as SvgIos } from 'shared/assets/icon-ios.svg';

import GoBack from 'shared/components/GoBack.js';

const Main = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: ${props => props.theme.color.blue};
  color: #fff;

  @media ${Device.tablet} {
    justify-content: center;
  }
`;
const Body = styled.div`
  background: transparent;
  width: 100%;
  position: relative;
  z-index: 2;
  display: flex;
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

  @media ${Device.laptopM} {
    width: 780px;
  }
`;
const DownloadCircle = styled(IconCircleSvg)`
  display: none;
  pointer-events: none;

  @media ${Device.tablet} {
    display: block;
    width: 800px;
    height: 800px;
    margin-top: -400px;
    position: absolute;
    top: 50%;
  }
  @media ${Device.laptopM} {
    width: 960px;
    height: 960px;
    margin-top: -480px;
  }
`;
const IconBack = styled(SvgPrev)``;
const Title = styled.h1`
  color: #fff;
  font-size: 30px;
  font-weight: 300;

  span {
    font-weight: 500;
  }

  @media ${Device.tablet} {
    font-size: 60px;
  }
`;
const Choose = styled.p`
  color: #fff;
  opacity: 0.5;
  font-size: 18px;
  margin: 20px 0 30px;

  @media ${Device.tablet} {
    font-size: 20px;
    margin: 40px 0;
  }
`;
const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const DeviceButtons = styled.div`
  display: flex;
  margin: 30px 0 0 0;

  @media ${Device.tablet} {
    margin: 42px 0 0 0;
  }
`;
const DownloadApp = styled.a`
  display: flex;
  background: ${props => props.theme.color.yellow};
  color: ${props => props.theme.color.blue};
  padding: 20px 10px;
  border-radius: 5px;
  margin: 0 0 20px 0;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: 100%;
  position: relative;
  font-weight: 500;
  font-size: 18px;

  @media ${Device.tablet} {
    width: auto;
    min-width: 270px;
    margin: 0 30px 30px 0;
    padding: 30px 10px;
    border-radius: 10px;
    justify-content: flex-start;
    font-size: 20px;
  }
  @media ${Device.laptopM} {
    margin: 0 30px 0 0;
    padding: 40px 20px;
  }

  svg {
    fill: ${props => props.theme.color.blue};
    height: 20px;
    margin: 0 30px 0 0;
    transition: all 0.4s;

    position: absolute;
    top: 50%;
    left: 20px;
    margin-top: -10px;

    @media ${Device.tablet} {
      position: static;
      height: 40px;
      margin-top: 0;
    }
  }
  &:hover {
    svg {
      transform: scale(1.2);
    }
  }
`;
const DownloadDeviceApp = styled.a`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
  display: flex;
  color: #fff;
  padding: 0;
  margin: 0 60px 0 0;
  align-items: center;
  text-decoration: none;

  @media ${Device.tablet} {
    font-size: 20px;
  }

  svg {
    fill: #fff;
    height: 20px;
    margin: 0 20px 0 0;
    transition: all 0.4s;
    opacity: 0.5;
  }
  &:hover {
    svg {
      opacity: 1;
    }
  }
`;

const DownloadContainer = () => (
  <Fragment>
    <Main>
      <Body>
        <Container>
          <Title>
            <span>Download</span> <br />
            Amoveo Wallet
          </Title>
          <Choose>Choose your platform</Choose>
          <Buttons>
            <DownloadApp href="#">
              <SvgWindows />
              Windows
            </DownloadApp>
            <DownloadApp href="#">
              <SvgOsx />
              MacOS
            </DownloadApp>
            <DownloadApp href="#">
              <SvgLinux />
              Linux
            </DownloadApp>
          </Buttons>
          <DeviceButtons>
            <DownloadDeviceApp href="#">
              <SvgAndroid />
              Android
            </DownloadDeviceApp>
            <DownloadDeviceApp href="#">
              <SvgIos />
              iOS
            </DownloadDeviceApp>
          </DeviceButtons>
        </Container>
      </Body>
      <LogoCircleWrap>
        <DownloadCircle />
      </LogoCircleWrap>
      <GoBack to="/">
        <IconBack />
      </GoBack>
    </Main>
  </Fragment>
);

export default DownloadContainer;
