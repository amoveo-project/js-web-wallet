import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import Theme from 'theme';

import { ReactComponent as SvgDownload } from 'shared/assets/icon-download.svg';

const Title = styled.h1`
  font-weight: 500;
  font-size: 60px;
  margin: 0 0 40px 0;
`;
const PassPhrase = styled.p`
  font-weight: normal;
  font-size: 20px;
  font-family: OCRAExtended;
  line-height: 1.5;
`;
const DownloadTitle = styled.p`
  font-weight: 500;
  font-size: 60px;
  margin: 0 0 40px 0;
  color: ${props => Theme.color.yellow};
`;
const DownloadText = styled.p`
  font-size: 20px;
  margin: 0 0 40px 0;
  font-weight: 300;
`;
const MainWrap = styled.div`
  width: 100%;
  flex: 1;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
`;
const Half = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 0 30px 0 0;
`;
const Download = styled.button`
  border: 2px solid ${props => Theme.color.yellow};
  color: ${props => Theme.color.yellow};
  padding: 20px;
  line-height: 20px;
  border-radius: 10px;
  font-size: 20px;
  background: none;
  cursor: pointer;

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

const Restore = () => {
  return (
    <Fragment>
      <MainWrap>
        <Half>
          <Title>Restore</Title>
          <PassPhrase>
            dapper gopher push lofty asylum tequila locker awakened custom
            popular idled serving tequila
          </PassPhrase>
        </Half>
        <Half>
          <DownloadTitle>Download your passphrase file</DownloadTitle>
          <DownloadText>This is very important!</DownloadText>
          <Download>
            <SvgDownload />
            <span>Download</span> (.txt 25 KB)
          </Download>
        </Half>
      </MainWrap>
    </Fragment>
  );
};

export default Restore;
