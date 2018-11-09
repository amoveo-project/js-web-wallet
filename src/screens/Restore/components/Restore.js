import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import Theme from 'theme';

import { ReactComponent as SvgDownload } from 'shared/assets/icon-download.svg';

const Title = styled.h1`
  font-size: 40px;
  margin: 0 0 40px 0;

  span {
    color: ${props => Theme.color.yellow};
  }
`;
const PassPhraseLabel = styled.label`
  display: inline-block;
  font-size: 16px;
  opacity: 0.5;
  margin: 0 0 20px 0;
`;
const PassPhraseArea = styled.textarea`
  font-family: 'OCRAExtended', 'Michroma', sans-serif;
  font-weight: normal;
  font-size: 20px;
  line-height: 1.5;
  width: 100%;
  background: #11142b;
  border: none;
  color: #fff;
  padding: 130px 50px;
  text-align: center;

  &::placeholder {
    color: #fff;
    opacity: 0.3;
  }
`;
const MainWrap = styled.div`
  width: 100%;
  flex: 1;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: warp;
  background: red;
`;

const Restore = () => {
  return (
    <Fragment>
      <Title>
        Restore with <span>passphrase</span> or <span>private key</span>
      </Title>
      <PassPhraseLabel htmlFor="">Your passphrase</PassPhraseLabel>
      <PassPhraseArea
        id="passphrase"
        placeholder="Enter or paste your passphrase"
      />
    </Fragment>
  );
};

export default Restore;
