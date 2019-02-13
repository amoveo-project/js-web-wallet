import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Device from 'device';

import { ReactComponent as SvgWallet } from 'shared/assets/icon-wallet.svg';
import { ReactComponent as SvgRestore } from 'shared/assets/icon-restore.svg';
import Button from 'shared/components/Button.js';
import ErrorModal from 'shared/components/ErrorModal';

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
const MainButton = styled(Button)`
  &:first-child {
    background: ${props => props.theme.color.yellow};

    svg {
      fill: ${props => props.theme.color.yellow};
    }
  }
`;
const WalletsLinks = styled.div`
  margin: 40px 0 0 0;
`;
const WalletsLink = styled(Link)`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  margin: 0 40px 0 0;
`;
const HardwareLink = styled(WalletsLink)`
  opacity: 0.5;
`;

const IconWallet = styled(SvgWallet)`
  fill: #fff;
`;
const SvgRestore2 = styled(SvgRestore)`
  fill: #fff;
`;

const Home = () => {
  return (
    <Fragment>
      <Title>
        The simplest&nbsp;way <br />
        to use Amoveo
      </Title>
      <Subtitle>
        Send and receive VEO safely and securely, <br />
        anywhere and any time.
      </Subtitle>
      {window._isElectron ? (
        <Fragment>
          <Buttons>
            <MainButton to="/create/">
              <IconWallet />
              <span>Last</span> wallet
            </MainButton>
            <MainButton to="/restore/">
              <SvgRestore2 />
              <span>Create</span> wallet
            </MainButton>
          </Buttons>
          <WalletsLinks>
            <WalletsLink to="/recent/">Recent wallets</WalletsLink>
            <WalletsLink to="">Restore wallet</WalletsLink>
            <HardwareLink to="">Use hardware wallet</HardwareLink>
          </WalletsLinks>
        </Fragment>
      ) : (
        <Buttons>
          <MainButton to="/create/">
            <IconWallet />
            <span>Create</span> wallet
          </MainButton>
          <MainButton to="/restore/">
            <SvgRestore2 />
            <span>Restore</span> wallet
          </MainButton>
        </Buttons>
      )}

      <ErrorModal />
    </Fragment>
  );
};

export default Home;
