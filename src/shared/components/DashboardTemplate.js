import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import { ReactComponent as LogoIcon } from 'shared/assets/logo.svg';
import { ReactComponent as SvgSend } from 'shared/assets/icon-send.svg';
import { ReactComponent as SvgReceive } from 'shared/assets/icon-receive.svg';
import { ReactComponent as SvgGear } from 'shared/assets/icon-gear.svg';
import { ReactComponent as SvgClipboard } from 'shared/assets/icon-clipboard.svg';
import { ReactComponent as SvgPrev } from 'shared/assets/icon-arrow-left.svg';
import { ReactComponent as SvgNext } from 'shared/assets/icon-arrow-right.svg';
import Button from 'shared/components/Button.js';

const Main = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${props => props.theme.color.blue};
  color: #fff;
`;
const MainWrap = styled.div`
  width: 100%;
  flex: 1;
`;
const Header = styled.div`
  width: 100%;
  padding: 15px 0;
  position: relative;
  z-index: 2;
`;
const Container = styled.div`
  width: 100%;
  max-width: 1230px;
  margin: 0 auto;
  padding: 0 15px;
`;
const Topline = styled.section`
  width: 100%;
  padding: 15px 0;
  background: rgba(0, 0, 0, 0.15);
`;
const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const FlexContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 40px;
  margin: 25px 20px 25px 0;
  line-height: 1.15;
  font-weight: 500;
`;
const YourBalanceText = styled.p`
  font-size: 16px;
  opacity: 0.5;
  text-align: right;
  margin: 0 0 5px 0;
`;
const Balance = styled.div`
  font-size: 40px;
  color: ${props => props.theme.color.yellow};

  span {
    font-size: 20px;
    vertical-align: baseline;
  }
`;
const LogoLink = styled(Link)`
  margin: 0 60px 0 0;
  display: inline-block;
  float: left;
`;
const Logo = styled(LogoIcon)`
  width: 98px;
  height: 30px;
  vertical-align: top;
`;
const Menu = styled.nav`
  display: inline-block;
  vertical-align: top;
`;
const MenuItem = styled(Link)`
  font-size: 16px;
  opacity: 0.5;
  transition: all 0.4s;
  font-weight: 500;
  float: left;
  margin: 0 30px 0 0;
  color: #fff;
  text-decoration: none;
  position: relative;
  line-height: 30px;

  &.active {
    opacity: 1;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -15px;
      height: 2px;
      background: ${props => props.theme.color.yellow};
    }
  }
  &:hover {
    opacity: 1;
  }
  &[disabled] {
    opacity: 0.15;
  }
`;
const Body = styled.div`
  width: 100%;
  padding: 30px 0 60px 0;
`;
const Wallet = styled.div`
  flex: 1;
`;
const WalletAddress = styled.div`
  font-family: 'OCRAExtended';
  font-size: 20px;
  word-break: break-all;
`;
const YourWalletText = styled.div`
  font-size: 16px;
  margin: 0 0 20px 0;
  user-select: none;

  span {
    opacity: 0.5;
  }
`;

const TransactionsLabel = styled.h3`
  margin: 30px 0 20px 0;
  font-size: 16px;
  font-weight: 300;
  opacity: 0.5;
`;
const HeaderLink = styled(Link)`
  color: #5d8ab8;
`;
const SendButton = styled(Button)`
  background: #fff;
  min-width: 270px;
  font-weight: 500;
`;
const ReceiveButton = styled(Button)`
  background: ${props => props.theme.color.yellow};
  min-width: 270px;
  font-weight: 500;
`;
const IconSend = styled(SvgSend)`
  fill: #fff;
`;
const IconReceive = styled(SvgReceive)`
  fill: ${props => props.theme.color.yellow};
`;
const IconClipboard = styled(SvgClipboard)`
  width: 16px;
  height: 16px;
  margin: 0 0 0 10px;
  fill: ${props => props.theme.color.yellow};
  cursor: pointer;

  &:active {
    transform: scale(0.9);
  }
`;
const IconGear = styled(SvgGear)`
  width: 20px;
  height: 20px;
  margin: 0;
  margin: 0;
  fill: currentColor;
`;
const UserMenu = styled.div``;
const Settings = styled.div`
  display: inline-block;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    background: ${props => props.theme.color.yellow};
    border-radius: 4px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s;
    transform: translateY(-10px);
  }

  &.notice {
    &:after {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
  &:hover {
    .settingsdropdown {
      opacity: 1;
      visibility: visible;
      transform: scaleY(1);
    }
  }
`;
const SettingsToggle = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  padding: 5px;
  color: #fff;
  cursor: pointer;
  transition: all 0.4s;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    transform: rotate(90deg);
  }
`;
const SettingsDropdownItem = styled(Link)`
  display: block;
  font-size: 16px;
  font-weight: 300;
  line-height: 18px;
  padding: 10px 0;
  color: ${props => props.theme.color.blue};
  text-decoration: none;
  position: relative;

  &.active {
    font-weight: 600;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: -26px;
      width: 10px;
      height: 10px;
      border-radius: 10px;
      background: ${props => props.theme.color.yellow};
      border: solid 2px ${props => props.theme.color.blue};
      transform: translateY(-50%);
    }
  }
`;
const SettingsDropdown = styled.div`
  position: absolute;
  top: 45px;
  right: 5px;
  opacity: 0;
  padding: 20px;
  visibility: hidden;
  width: 240px;
  background: #fff;
  z-index: 99;
  transition: all 0.4s 0.2s;
  transform-origin: top center;
  transform: scaleY(0);

  &:after {
    content: '';
    position: absolute;
    top: -2px;
    right: 0;
    height: 2px;
    width: 20px;
    background: ${props => props.theme.color.yellow};
  }
`;
const LogOut = styled(Link)`
  opacity: 0.5;
  font-weight: 500;
  font-size: 16px;
  display: inline-block;
  line-height: 30px;
  margin: 0 0 0 25px;
  color: #fff;
  text-decoration: none;
  transition: all 0.4s;

  &:hover {
    opacity: 1;
  }
`;
const Transactions = styled.section``;
const TransactionsPlaceholder = styled.p`
  font-weight: 500;
  text-align: center;
  margin: 0;
  background: rgba(0, 0, 0, 0.15);
  color: rgba(255, 255, 255, 0.5);
  padding: 40px 20px;
  border-radius: 10px;
`;
const Transaction = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  padding: 10px;

  &:nth-child(2n) {
    background: rgba(0, 0, 0, 0.15);
  }
  &:first-child {
    font-weight: 500;
  }
  &:last-child {
    background: none;
    justify-content: space-between;
    margin-top: 10px;
  }
`;
const TransactionsCol = styled.div`
  width: 100%;
  line-height: 20px;
  font-size: 16px;

  svg {
    width: 20px;
    height: 20px;
    padding: 4px;
    margin: 0;
    display: inline-block;
  }
`;
const Value = styled(TransactionsCol)`
  max-width: 160px;
`;
const Date = styled(TransactionsCol)`
  max-width: 160px;
`;
const Mixin = styled(TransactionsCol)`
  max-width: 70px;
`;
const Type = styled(TransactionsCol)`
  max-width: 20px;
  text-align: center;
`;
const TransactionsId = styled.div`
  flex: 1;
  padding-left: 30px;
  position: relative;
  word-break: break-all;
`;
const TransactionsNext = styled.div`
  color: ${props => props.theme.color.yellow};
  line-height: 16px;
  font-weight: 500;
  cursor: pointer;
`;
const TransactionsCounter = styled.div`
  opacity: 0.5;
  font-weight: 500;
`;
const TransactionsPrev = styled(TransactionsNext)``;
const IconBack = styled(SvgPrev)`
  width: 8px;
  height: 18px;
  transition: transform 0.4s;
  fill: currentColor;
  margin: 0 10px 0 0;
`;
const IconNext = styled(SvgNext)`
  width: 8px;
  height: 18px;
  transition: transform 0.4s;
  fill: currentColor;
  margin: 0 0 0 10px;
`;

const transactions = [
  {
    value: '20.00879345',
    date: '26.10.2018 12:24',
    mixin: '6',
    type: 'send',
    id:
      '49pn7NpkLncRLmqJSP6E3th14GuedWvHs7C2UEV9LGfkVTTtpmJ3JAgVQu5LLDcLV73Z5Nxx49pn7NpkLncRLmqJSP6E3th14GuedWvHs7C2UEV9LGfkVTTtpmJ3JAgVQu5LLDcLV73Z5Nxx',
  },
  {
    value: '20.00879345',
    date: '26.10.2018 12:24',
    mixin: '6',
    type: 'send',
    id:
      '49pn7NpkLncRLmqJSP6E3th14GuedWvHs7C2UEV9LGfkVTTtpmJ3JAgVQu5LLDcLV73Z5Nxx',
  },
  {
    value: '20.00879345',
    date: '26.10.2018 12:24',
    mixin: '6',
    type: 'send',
    id:
      '49pn7NpkLncRLmqJSP6E3th14GuedWvHs7C2UEV9LGfkVTTtpmJ3JAgVQu5LLDcLV73Z5Nxx',
  },
  {
    value: '20.00879345',
    date: '26.10.2018 12:24',
    mixin: '6',
    type: 'receive',
    id:
      '49pn7NpkLncRLmqJSP6E3th14GuedWvHs7C2UEV9LGfkVTTtpmJ3JAgVQu5LLDcLV73Z5Nxx',
  },
  {
    value: '20.00879345',
    date: '26.10.2018 12:24',
    mixin: '6',
    type: 'receive',
    id:
      '49pn7NpkLncRLmqJSP6E3th14GuedWvHs7C2UEV9LGfkVTTtpmJ3JAgVQu5LLDcLV73Z5Nxx',
  },
  {
    value: '20.00879345',
    date: '26.10.2018 12:24',
    mixin: '6',
    type: 'send',
    id:
      '49pn7NpkLncRLmqJSP6E3th14GuedWvHs7C2UEV9LGfkVTTtpmJ3JAgVQu5LLDcLV73Z5Nxx',
  },
];

const DashboardTemplate = ({ children }) => {
  return (
    <Fragment>
      <Main>
        <MainWrap>
          <Header>
            <FlexContainer>
              <div>
                <LogoLink to="/">
                  <Logo />
                </LogoLink>
                <Menu>
                  <MenuItem to="/dashboard" className="active">
                    Dashboard
                  </MenuItem>
                  <MenuItem to="/send">Send</MenuItem>
                  <MenuItem to="/receive">Receive</MenuItem>
                  <MenuItem to="/exchange" disabled>
                    Exchange
                  </MenuItem>
                </Menu>
              </div>
              <UserMenu>
                <Settings className="notice">
                  <SettingsToggle>
                    <IconGear className="gear" />
                  </SettingsToggle>
                  <SettingsDropdown className="settingsdropdown">
                    <SettingsDropdownItem to="/">
                      Review private key
                    </SettingsDropdownItem>
                    <SettingsDropdownItem to="/">
                      Account details
                    </SettingsDropdownItem>
                    <SettingsDropdownItem to="/" className="active">
                      Download passphrase file
                    </SettingsDropdownItem>
                  </SettingsDropdown>
                </Settings>
                <LogOut to="/">Log out</LogOut>
              </UserMenu>
            </FlexContainer>
          </Header>
          <Topline>
            <FlexContainer>
              <Title>Dashboard</Title>
              <div>
                <YourBalanceText>Your balance</YourBalanceText>
                <Balance>
                  20
                  <span>.00879345</span> VEO
                </Balance>
              </div>
            </FlexContainer>
          </Topline>
          <Body>
            <FlexContainer>
              <SendButton to="/send">
                <IconSend />
                Send
              </SendButton>
              <ReceiveButton to="/receive">
                <IconReceive />
                Receive
              </ReceiveButton>
              <Wallet>
                <YourWalletText>
                  <span>Your wallet address</span> <IconClipboard />
                </YourWalletText>
                <WalletAddress>
                  49pn7NpkLncRLmqJSP6E3th14GuedWvHs7C2UEV9LGfkVTTtpmJ3JAgVQu5LLDcLV73Z5Nxx5okMnAN6nJdJuNdLENtx7i6
                </WalletAddress>
              </Wallet>
              {children}
            </FlexContainer>
            <Container>
              <TransactionsLabel>Transactions</TransactionsLabel>
              <Transactions>
                {transactions.length > 0 ? (
                  <Transaction>
                    <Value>Value</Value>
                    <Date>Date</Date>
                    <Mixin>Mixin</Mixin>
                    <Type />
                    <TransactionsId>Transaction ID</TransactionsId>
                  </Transaction>
                ) : (
                  <TransactionsPlaceholder>
                    Your transactions will be displayed here
                  </TransactionsPlaceholder>
                )}

                {transactions.map(transaction => (
                  <Transaction>
                    <Value>{transaction.value}</Value>
                    <Date>{transaction.date}</Date>
                    <Mixin>{transaction.mixin}</Mixin>
                    <Type>
                      {transaction.type == 'send' ? (
                        <IconSend />
                      ) : (
                        <IconReceive />
                      )}
                    </Type>
                    <TransactionsId>{transaction.id}</TransactionsId>
                  </Transaction>
                ))}
                <Transaction>
                  <TransactionsPrev>
                    <IconBack />
                    Previous 10
                  </TransactionsPrev>
                  <TransactionsCounter>2 / 10</TransactionsCounter>
                  <TransactionsNext>
                    Next 10
                    <IconNext />
                  </TransactionsNext>
                </Transaction>
              </Transactions>
            </Container>
          </Body>
        </MainWrap>
      </Main>
    </Fragment>
  );
};

export default DashboardTemplate;
