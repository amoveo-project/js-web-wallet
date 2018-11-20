import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import ClipboardJS from 'clipboard';
import { format, fromUnixTime } from 'date-fns';

import Device from 'device';
import { ReactComponent as SvgSend } from 'shared/assets/icon-send.svg';
import { ReactComponent as SvgReceive } from 'shared/assets/icon-receive.svg';
import { ReactComponent as SvgPending } from 'shared/assets/icon-pending.svg';
import { ReactComponent as SvgClipboard } from 'shared/assets/icon-clipboard.svg';
import { ReactComponent as SvgPrev } from 'shared/assets/icon-arrow-left.svg';
import { ReactComponent as SvgNext } from 'shared/assets/icon-arrow-right.svg';

import Button from 'shared/components/Button.js';
import Header from 'shared/components/Header.js';
import Topline from 'shared/components/Topline';

import AppContext from 'shared/contexts/AppContext';
import DashboardContext from 'shared/contexts/DashboardContext';

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
const Container = styled.div`
  width: 100%;
  max-width: 1230px;
  margin: 0 auto;
  padding: 0 15px;
`;
const FlexContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  @media ${Device.laptop} {
    justify-content: flex-start;
  }
  @media ${Device.laptopM} {
    justify-content: space-between;
  }
`;
const Body = styled.div`
  width: 100%;
  padding: 30px 0 60px 0;
`;
const Wallet = styled.div`
  width: 100%;
  margin: 30px 0 0 0;

  @media ${Device.laptop} {
    flex: 1;
    width: auto;
    margin: 0 0 0 30px;
  }
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
const IconPending = styled(SvgPending)`
  fill: #fff;
  opacity: 0.5;
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
  position: relative;

  &:nth-child(2n) {
    background: rgba(0, 0, 0, 0.15);
  }
  &:first-child {
    font-weight: 500;
  }
`;
const TransactionNav = styled(Transaction)`
  background: none;
  justify-content: space-between;
  margin-top: 10px;
`;
const TransactionsCol = styled.div`
  width: 100%;
  line-height: 18px;
  font-size: 14px;

  @media ${Device.laptopM} {
    font-size: 16px;
    line-height: 20px;
  }

  svg {
    width: 18px;
    height: 18px;
    padding: 4px;
    margin: 0;
    display: inline-block;

    @media ${Device.laptopM} {
      width: 20px;
      height: 20px;
    }
  }
`;
const Value = styled(TransactionsCol)`
  max-width: 15%;

  @media ${Device.laptopM} {
    max-width: 160px;
  }

  svg {
    margin: 0 5px 0 0;
  }
`;
const Date = styled(TransactionsCol)`
  max-width: 15%;

  @media ${Device.laptopM} {
    max-width: 150px;
  }
`;
const Fee = styled(TransactionsCol)`
  max-width: 15%;

  @media ${Device.laptopM} {
    max-width: 150px;
  }
`;
const Type = styled(TransactionsCol)`
  max-width: 20px;
  text-align: center;
`;
const TransactionsId = styled.div`
  flex: 1;
  position: relative;
  word-break: break-all;
  font-size: 14px;
  padding-left: 3px;

  @media ${Device.laptopM} {
    font-size: 16px;
  }
`;
const TransactionLink = styled(Link)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  cursor: pointer;
  text-decoration: none;
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

const Dashboard = ({ children }) => {
  const { keys, transactions } = useContext(AppContext);
  const {} = useContext(DashboardContext);

  useEffect(() => {
    const clipboard = new ClipboardJS('.js-copy-address', {
      text: () => keys.public,
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  return (
    <Fragment>
      <Main>
        <MainWrap>
          <Header />
          <Topline title="Dashboard" />
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
                  <span>Your wallet address</span>{' '}
                  <IconClipboard className="js-copy-address" />
                </YourWalletText>
                <WalletAddress>{keys.public}</WalletAddress>
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
                    <Fee>Fee</Fee>
                    <Type />
                    <TransactionsId>Transaction ID</TransactionsId>
                  </Transaction>
                ) : (
                  <TransactionsPlaceholder>
                    Your transactions will be displayed here
                  </TransactionsPlaceholder>
                )}

                {transactions.map(transaction => (
                  <Transaction key={transaction.hash}>
                    <Value>
                      <IconPending />
                      {transaction.amount / 1e8}
                    </Value>
                    <Date>
                      {format(
                        fromUnixTime(transaction.timestamp),
                        'dd.MM.yyyy HH:mm',
                      )}
                    </Date>
                    <Fee>{transaction.fee / 1e8}</Fee>
                    <Type>
                      {transaction.from === keys.public ? (
                        <IconSend />
                      ) : (
                        <IconReceive />
                      )}
                    </Type>
                    <TransactionsId>{transaction.hash}</TransactionsId>
                    <TransactionLink to={`/dashboard/${transaction.nonce}`} />
                  </Transaction>
                ))}
                {/* <TransactionNav>
                  <TransactionsPrev>
                    <IconBack />
                    Previous 10
                  </TransactionsPrev>
                  <TransactionsCounter>2 / 10</TransactionsCounter>
                  <TransactionsNext>
                    Next 10
                    <IconNext />
                  </TransactionsNext>
                </Transaction> */}
              </Transactions>
            </Container>
          </Body>
        </MainWrap>
      </Main>
    </Fragment>
  );
};

export default Dashboard;
