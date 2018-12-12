import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Device from 'device';

import { ReactComponent as SvgWallet } from 'shared/assets/icon-wallet.svg';
import { ReactComponent as SvgRestore } from 'shared/assets/icon-restore.svg';
import Button from 'shared/components/Button.js';

const Title = styled.h1`
  font-weight: 500;
  font-size: 40px;
  margin: 0 0 30px 0;
  max-width: 500px;

  @media ${Device.laptopM} {
    font-size: 60px;
    margin: 0 0 40px 0;
    max-width: 500px;
  }
`;
const Subtitle = styled.p`
  font-weight: 300;
  font-size: 18px;
  opacity: 0.5;
  max-width: 500px;

  @media ${Device.laptopM} {
    font-size: 20px;
  }
`;
const Buttons = styled.div`
  margin: 40px 0 0 0;
  display: flex;
  justify-content: space-between;

  @media ${Device.laptop} {
    justify-content: flex-start;
  }
`;
const CreateButton = styled(Button)`
  background: ${props => props.theme.color.yellow};
`;

const IconWallet = styled(SvgWallet)`
  fill: ${props => props.theme.color.yellow};
`;
const SvgRestore2 = styled(SvgRestore)`
  fill: #fff;
`;

const Home = () => {
  return (
    <Fragment>
      <Title>The simplest way to use Amoveo</Title>
      <Subtitle>
        Send and receive VEO safely and securely, anywhere and any time.
      </Subtitle>
      <Buttons>
        <CreateButton to="/create/">
          <IconWallet />
          <span>Create</span> wallet
        </CreateButton>
        <Button to="/restore/">
          <SvgRestore2 />
          <span>Restore</span> wallet
        </Button>
      </Buttons>
    </Fragment>
  );
};

export default Home;
