import React, { Fragment, useContext } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import { ReactComponent as SvgDownload } from 'shared/assets/icon-download.svg';

import AppContext from 'shared/contexts/AppContext';
import CreateContext from 'shared/contexts/CreateContext';

const Title = styled.h1`
  font-weight: 500;
  font-size: 60px;
  margin: 0 0 40px 0;
`;
const PassPhrase = styled.p`
  font-weight: normal;
  font-size: 20px;
  font-family: 'OCRAExtended', sans-serif;
  line-height: 1.5;
  font-weight: normal;
`;
const DownloadTitle = styled.p`
  font-weight: 500;
  font-size: 60px;
  margin: 0 0 40px 0;
  color: ${props => props.theme.color.yellow};
`;
const DownloadText = styled.p`
  font-size: 20px;
  margin: 0 0 40px 0;
  font-weight: 300;
`;
const MainWrap = styled.div`
  width: 100%;
  flex: 1;
  position: static;
  z-index: 2;
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  &:after {
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
`;
const Half = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 0 30px 0 0;
  z-index: 2;
`;
const Download = styled.button`
  border: 2px solid ${props => props.theme.color.yellow};
  color: ${props => props.theme.color.yellow};
  padding: 20px;
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
    margin: 0 20px 0 0;
  }
  span {
    font-weight: 500;
  }
`;

const Create = () => {
  const { isWalletCreated, passphrase } = useContext(AppContext);
  const { downloadPrivateKey } = useContext(CreateContext);

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
          <DownloadText>This is very important!</DownloadText>
          <Download onClick={downloadPrivateKey} disabled={!isWalletCreated}>
            <SvgDownload />
            <span>Download</span> (.txt 64 bytes)
          </Download>
        </Half>
      </MainWrap>
    </Fragment>
  );
};

export default Create;
