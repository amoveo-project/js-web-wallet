import React, { Fragment, useContext } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Device from 'device';

import { ReactComponent as LogoIcon } from 'shared/assets/logo.svg';
import { ReactComponent as SvgNext } from 'shared/assets/icon-next.svg';
import { ReactComponent as SvgPrev } from 'shared/assets/icon-prev.svg';

import GoBack from 'shared/components/GoBack.js';

import RecentContext from 'shared/contexts/RecentContext';

const Main = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => props.theme.color.blue};
  color: #fff;
  position: relative;
`;
const Header = styled.div`
  width: 100%;
  padding: 60px 0 0 0;
  position: relative;
  z-index: 2;
  margin: 0 0 80px 0;
`;
const MainWrap = styled.div`
  width: 100%;
  flex: 1;
`;
const Container = styled.div`
  width: 100%;
  max-width: 1230px;
  margin: 0 auto;
  padding: 0 15px;

  @media ${Device.laptopM} {
    padding: 0 50px;
  }
  @media ${Device.laptopL} {
    padding: 0 15px;
  }
`;

const Logo = styled(LogoIcon)`
  width: 195px;
  height: 60px;
`;
const IconBack = styled(SvgPrev)``;
const IconNext = styled(SvgNext)`
  width: 30px;
  height: 30px;
  background: ${props => props.theme.color.yellow};
  padding: 10px;
  border-radius: 30px;
  display: inline-block;
  margin: 0 0 0 20px;
  vertical-align: top;

  @media ${Device.laptopM} {
    width: 60px;
    height: 60px;
    padding: 20px;
  }
`;
const Body = styled.div`
  background: transparent;
  width: 100%;
  position: static;
  z-index: 2;
`;
const Title = styled.h1`
  font-size: 30px;
  margin: 0 0 20px 0;

  @media ${Device.laptopM} {
    font-size: 40px;
    margin: 0 0 40px 0;
  }

  span {
    color: ${props => props.theme.color.yellow};
    cursor: pointer;
  }
  .active {
    position: relative;
    cursor: default;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -8px;
      height: 4px;
      background: ${props => props.theme.color.yellow};
    }
  }
`;
const Wallets = styled.div``;
const Wallet = styled.div`
  margin: 0 0 30px 0;
  display: inline-block;
  width: 100%;

  @media ${Device.laptopM} {
    margin: 0 0 75px 0;
  }
`;
const Used = styled.p`
  font-size: 18px;
  color: #fff;
  opacity: 0.5;
  margin: 0 0 10px 0;
`;
const Name = styled.p`
  font-size: 20px;
  color: #fff;
  font-family: 'OCRAExtended';
  margin: 0;
  word-break: break-all;

  ${Wallet}:hover & {
    color: ${props => props.theme.color.yellow};
    cursor: pointer;
  }
`;
const Delete = styled.button`
  font-size: 18px;
  color: ${props => props.theme.color.yellow};
  text-transform: uppercase;
  margin: 20px 0 0 0;
  background: 0;
  border: 0;
  padding: 0;
`;

const Restore = () => {
  const { openWallet, wallets } = useContext(RecentContext);

  return (
    <Fragment>
      <Main>
        <MainWrap>
          <Header>
            <Container>
              <Link to="/">
                <Logo />
              </Link>
            </Container>
          </Header>
          <Body>
            <Container>
              <Title>Recent wallets</Title>
              <Wallets>
                {wallets.map(wallet => (
                  <Wallet
                    key={wallet.publicKey}
                    onClick={() => {
                      openWallet(wallet.publicKey);
                    }}
                  >
                    {/* <Used>Used 10.02.2019</Used> */}
                    <Name>
                      {Buffer.from(wallet.publicKey, 'hex').toString('base64')}
                    </Name>
                    {/* <Delete>Delete wallet</Delete> */}
                  </Wallet>
                ))}
              </Wallets>
            </Container>
          </Body>
        </MainWrap>
        <GoBack to="/">
          <IconBack />
        </GoBack>
      </Main>
    </Fragment>
  );
};

export default Restore;
