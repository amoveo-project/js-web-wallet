import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import Theme from 'theme';

import { ReactComponent as SvgWallet } from 'shared/assets/icon-wallet.svg';
import { ReactComponent as SvgRestore } from 'shared/assets/icon-restore.svg';

const Title = styled.h1`
  font-weight: 500;
  font-size: 60px;
  margin: 0 0 40px 0;
  max-width: 500px;
`;
const Subtitle = styled.h1`
  font-weight: 300;
  font-size: 20px;
  opacity: 0.5;
  max-width: 500px;
`;
const Buttons = styled.div`
  margin: 40px 0 0 0;
`;
const Button = styled(Link)`
  display: inline-block;
  margin: 0 30px 0 0;
  padding: 30px 30px 30px 90px;
  line-height: 60px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 20px;
  color: #161a2e;
  background: #fff;
  position: relative;
  transition: all 0.4s;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 60px;
    height: 60px;
    border-radius: 0 30px 30px 0;
    margin-top: -30px;
    background: ${props => Theme.color.blue};
    transition: all 0.4s;
  }

  &:first-child {
    background: #fff200;
  }

  & span {
    font-weight: 500;
  }
  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 15px;
    margin-top: -10px;
  }

  &:hover {
    &:after {
      width: 55px;
    }
  }
`;

const IconWallet = styled(SvgWallet)`
  fill: ${props => Theme.color.yellow};
`;
const SvgRestore2 = styled(SvgRestore)`
  fill: #fff;
  width: 23px;
`;

const Home = () => {
  return (
    <Fragment>
      <Title>The simplest wayto use VEO</Title>
      <Subtitle>
        Send and receive Viewo (VEO) safely and securely, anywhere and any time.
      </Subtitle>
      <Buttons>
        <Button to="/create">
          <IconWallet />
          <span>Create</span> wallet
        </Button>
        <Button to="/create">
          <SvgRestore2 />
          <span>Restore</span> wallet
        </Button>
      </Buttons>
    </Fragment>
  );
};

export default Home;
