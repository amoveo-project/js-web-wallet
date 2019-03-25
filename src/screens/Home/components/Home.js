import React, { Fragment, useContext } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Device from 'device';

import { ReactComponent as SvgWallet } from 'shared/assets/icon-wallet.svg';
import { ReactComponent as SvgRestore } from 'shared/assets/icon-restore.svg';

import Button from 'shared/components/Button';

import AppContext from 'shared/contexts/AppContext';
import HomeContext from 'shared/contexts/HomeContext';

const Title = styled.h1`
  font-weight: 500;
  font-size: 30px;
  margin: 0 0 20px 0;
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
  flex-wrap: wrap;

  @media ${Device.laptop} {
    justify-content: flex-start;
    flex-wrap: nowrap;
  }
`;
const MainButton = styled(Button)`
  cursor: pointer;
  width: 100%;

  &:first-child {
    background: ${props => props.theme.color.yellow};

    @media ${Device.laptop} {
      margin-right: 30px;
    }

    svg {
      fill: ${props => props.theme.color.yellow};
    }
  }

  @media ${Device.laptop} {
    width: auto;
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
  text-decoration: underline;
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
  const { lastWalletId, openLastWallet, recentWallets } = useContext(
    HomeContext,
  );

  const isLastWallet = Boolean(lastWalletId);
  const isRecentWallets = recentWallets.length > 0;

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

      {!window._isElectron ? (
        <Buttons>
          <MainButton to="/create/" as={Link}>
            <IconWallet />
            <span>Create</span> wallet
          </MainButton>
          <MainButton to="/restore/" as={Link}>
            <SvgRestore2 />
            <span>Restore</span> wallet
          </MainButton>
        </Buttons>
      ) : null}

      {window._isElectron ? (
        <Buttons>
          {isLastWallet ? (
            <MainButton onClick={openLastWallet} as="div">
              <IconWallet />
              <span>Last</span> wallet
            </MainButton>
          ) : null}
          <MainButton to="/create/" as={Link}>
            <SvgRestore2 />
            <span>Create</span> wallet
          </MainButton>
        </Buttons>
      ) : null}

      {window._isElectron || u2fSupport ? (
        <WalletsLinks>
          {window._isElectron ? (
            <Fragment>
              {isRecentWallets ? (
                <WalletsLink to="/recent/">Recent wallets</WalletsLink>
              ) : null}
              <WalletsLink to="/restore/">Restore wallet</WalletsLink>
            </Fragment>
          ) : null}
          {u2fSupport ? (
            <HardwareLink onClick={enterLedger}>
              Use hardware wallet
            </HardwareLink>
          ) : null}
        </WalletsLinks>
      ) : null}
    </Fragment>
  );
};

export default Home;
