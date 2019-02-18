import React, { Fragment, useContext } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Device from 'device';

import { ReactComponent as SvgWallet } from 'shared/assets/icon-wallet.svg';
import { ReactComponent as SvgRestore } from 'shared/assets/icon-restore.svg';
import AppContext from 'shared/contexts/AppContext';
import Button from 'shared/components/Button';

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
const HardwareLink = styled.a`
  opacity: 0.5;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  margin: 0 40px 0 0;
`;
// const HardwareLink = styled(WalletsLink)`
//   opacity: 0.5;
// `;
const IconWallet = styled(SvgWallet)`
  fill: #fff;
`;
const SvgRestore2 = styled(SvgRestore)`
  fill: #fff;
`;

const Home = () => {
  const { enterLedger, u2fSupport } = useContext(AppContext);

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

      <Buttons>
        {/*<MainButton to="">*/}
        {/*  <IconWallet />*/}
        {/*  <span>Last</span> wallet*/}
        {/*</MainButton>*/}
        <MainButton to="/create/">
          <SvgRestore2 />
          <span>Create</span> wallet
        </MainButton>
      </Buttons>
      <WalletsLinks>
        {/*<WalletsLink to="/recent/">Recent wallets</WalletsLink>*/}
        <WalletsLink to="/restore/">Restore wallet</WalletsLink>
        {u2fSupport ? (
          <HardwareLink onClick={enterLedger}>Use hardware wallet</HardwareLink>
        ) : null}
      </WalletsLinks>
    </Fragment>
  );
};

export default Home;
