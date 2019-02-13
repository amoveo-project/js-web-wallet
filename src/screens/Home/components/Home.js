import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';
import Device from 'device';

import { ReactComponent as SvgWallet } from 'shared/assets/icon-wallet.svg';
import { ReactComponent as SvgRestore } from 'shared/assets/icon-restore.svg';
import Button from 'shared/components/Button';

import AppContext from 'shared/contexts/AppContext';

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

const Links = styled.div`
  margin-top: 2em;
`;

const LedgerButton = styled.a`
  color: ${props => props.theme.color.yellow};
  font-weight: 500;
`;

const IconWallet = styled(SvgWallet)`
  fill: ${props => props.theme.color.yellow};
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
        <CreateButton to="/create/">
          <IconWallet />
          <span>Create</span> wallet
        </CreateButton>
        <Button to="/restore/">
          <SvgRestore2 />
          <span>Open</span> wallet
        </Button>
      </Buttons>
      <Links>
        {u2fSupport && false ? ( // TODO uncomment later when modals will be ready
          <LedgerButton href="#" disabled={!u2fSupport} onClick={enterLedger}>
            <span>Use Ledger</span> Hardware Wallet
          </LedgerButton>
        ) : null}
      </Links>
    </Fragment>
  );
};

export default Home;
