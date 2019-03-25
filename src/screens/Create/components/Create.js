import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';
import Device from 'device';

import { ReactComponent as SvgDownload } from 'shared/assets/icon-download.svg';

import AppContext from 'shared/contexts/AppContext';
import CreateContext from 'shared/contexts/CreateContext';

const Title = styled.h1`
  font-weight: 500;
  font-size: 30px;
  margin: 0 0 20px 0;

  @media ${Device.laptopM} {
    font-size: 40px;
    margin: 0 0 40px 0;
  }
`;
const PassPhrase = styled.p`
  font-weight: normal;
  font-size: 20px;
  font-family: 'OCRAExtended', sans-serif;
  line-height: 1.5;
  font-weight: normal;
  margin: 0 0 30px;
`;
const DownloadTitle = styled.p`
  font-weight: 500;
  font-size: 30px;
  margin: 0 0 30px 0;
  color: ${props => props.theme.color.yellow};

  @media ${Device.laptop} {
    font-size: 40px;
    margin: 0 0 40px 0;
  }
`;
const DownloadText = styled.p`
  font-size: 18px;
  margin: 0 20px 0 0;
  font-weight: 300;

  @media ${Device.laptopM} {
    width: 100%;
    font-size: 20px;
    margin: 0 0 40px 0;
  }
`;
const MainWrap = styled.div`
  width: 100%;
  flex: 1;
  position: static;
  z-index: 2;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: wrap;

  @media ${Device.laptop} {
    flex-wrap: nowrap;
  }

  &:after {
    @media ${Device.laptop} {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 50%;
      background: rgba(0, 0, 0, 0.15);
      z-index: 0;
      pointer-events: none;
    }
  }
`;
const Half = styled.div`
  width: 100%;
  padding: 0;
  z-index: 2;

  &:nth-child(2n) {
    @media ${Device.laptop} {
      padding: 0 30px 0 0;
    }
  }

  @media ${Device.laptop} {
    max-width: 500px;
    padding: 0 30px 0 0;
  }
`;
const DownloadWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media ${Device.laptopM} {
    flex-wrap: wrap;
  }
`;
const Download = styled.button`
  border: 2px solid ${props => props.theme.color.yellow};
  color: ${props => props.theme.color.yellow};
  padding: 18px;
  line-height: 20px;
  border-radius: 10px;
  font-size: 20px;
  background: none;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    background: ${props => props.theme.color.yellow};
    color: ${props => props.theme.color.blue};
  }

  svg {
    fill: currentColor;
    width: 20px;
    height: 20px;
    float: left;
    margin: 0;

    @media ${Device.laptopM} {
      margin: 0 20px 0 0;
    }
  }

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const DownloadButtonText = styled.span`
  display: none;

  @media ${Device.laptopM} {
    display: inline-block;
  }

  span {
    font-weight: 500;
  }
`;

const Create = () => {
  const { isWalletCreated, passphrase } = useContext(AppContext);
  const { downloadPassphrase } = useContext(CreateContext);

  return (
    <Fragment>
      <MainWrap>
        <Half>
          <Title>
            Your <br />
            passphrase
          </Title>
          <PassPhrase>{passphrase}</PassPhrase>
        </Half>
        <Half>
          <DownloadTitle>Download your passphrase file</DownloadTitle>
          <DownloadWrap>
            <DownloadText>This is very important!</DownloadText>
            <Download onClick={downloadPassphrase} disabled={!isWalletCreated}>
              <SvgDownload />
              <DownloadButtonText>
                <span>Download</span> (.txt{' '}
                {passphrase ? `${passphrase.length} bytes` : null})
              </DownloadButtonText>
            </Download>
          </DownloadWrap>
        </Half>
      </MainWrap>
    </Fragment>
  );
};

export default Create;
