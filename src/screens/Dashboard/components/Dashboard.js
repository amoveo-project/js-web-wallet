import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import ClipboardJS from 'clipboard';
import { format, fromUnixTime } from 'date-fns';
import Decimal from 'decimal.js-light';

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

import { TRANSACTIONS_PER_PAGE } from '../constants/transactions';

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
  padding: 0 20px;

  @media ${Device.laptopM} {
    padding: 0 50px;
  }
  @media ${Device.laptopL} {
    padding: 0 20px;
  }
`;
const FlexContainer = styled(Container)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  @media ${Device.tablet} {
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

  @media ${Device.mobileM} {
    flex: 1;
    width: auto;
    margin: 0 0 0 30px;
  }
`;
const WalletAddress = styled.div`
  font-family: 'OCRAExtended';
  font-size: 18px;
  word-break: break-all;

  @media ${Device.laptopM} {
    font-size: 20px;
  }
`;
const YourWalletText = styled.div`
  font-size: 14px;
  margin: 0 0 20px 0;
  user-select: none;

  @media ${Device.laptopM} {
    font-size: 16px;
  }

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
const Label = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 5px 0;

  @media ${Device.tablet} {
    display: none;
  }
`;
const MainButton = styled(Button)`
  padding: 0;
  margin: 0 20px 0 0;
  float: left;
  text-align: left;
  width: auto;
  min-width: auto !important;
  height: auto;
  line-height: normal;

  @media ${Device.laptop} {
    padding: 30px;
    text-align: center;
    width: 100%;
    max-width: 270px;
  }

  svg {
    position: static;
    width: 60px;
    height: 60px;
    padding: 20px;
    margin: 0;
    top: auto;
    fill: ${props => props.theme.color.blue};

    @media ${Device.laptop} {
      fill: #fff;
      padding: 0;
      width: 20px;
      height: 20px;
      position: absolute;
      z-index: 2;
      top: 50%;
      left: 15px;
      margin-top: -10px;
    }
  }
  &:after {
    display: none;
    @media ${Device.laptop} {
      display: inline-block;
    }
  }
  span {
    display: none;
    @media ${Device.laptop} {
      display: inline-block;
    }
  }
`;
const SendButton = styled(MainButton)`
  background: #fff;
  min-width: 270px;
  font-weight: 500;
`;
const ReceiveButton = styled(MainButton)`
  background: ${props => props.theme.color.yellow};
  min-width: 270px;
  font-weight: 500;
`;
const IconSend = styled(SvgSend)`
  fill: #fff;
`;
const IconReceive = styled(SvgReceive)`
  fill: ${props => props.theme.color.yellow};
  @media ${Device.laptop} {
    fill: ${props => props.theme.color.yellow} !important;
  }
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
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  padding: 20px 10px;
  position: relative;

  @media ${Device.tablet} {
    flex-wrap: nowrap;
    padding: 10px;
  }

  &:nth-child(2n) {
    background: rgba(0, 0, 0, 0.15);
  }
  &:first-child {
    display: none;

    div {
      padding-left: 0;
    }

    @media ${Device.tablet} {
      display: flex;
      font-weight: 500;
    }
  }
`;
const TransactionNav = styled(Transaction)`
  background: none !important;
  justify-content: space-between;
  margin-top: 10px;
`;
const TransactionsCol = styled.div`
  width: 100%;
  line-height: 18px;
  font-size: 14px;
  padding: 10px 0;
  margin: 0 0 10px 0;

  @media ${Device.laptopM} {
    font-size: 16px;
    line-height: 20px;
    padding: 0;
    margin: 0;
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
  @media ${Device.tablet} {
    max-width: 160px;
  }
  svg {
    margin: 0 5px 0 0;
  }
`;
const Date = styled(TransactionsCol)`
  @media ${Device.tablet} {
    max-width: 150px;
  }
`;
const Fee = styled(TransactionsCol)`
  @media ${Device.tablet} {
    max-width: 150px;
  }
`;
const Type = styled(TransactionsCol)`
  position: absolute;
  top: 22px;
  left: 0;
  @media ${Device.tablet} {
    top: 0;
    max-width: 20px;
    text-align: center;
  }
`;
const Address = styled.div`
  flex: 1;
  position: relative;
  word-break: break-all;
  font-size: 14px;
  padding-left: 0;
  @media ${Device.laptopM} {
    font-size: 16px;
    padding-left: 24px;
  }
`;
const AddressID = styled.div`
  padding: 0 0 0 30px;

  @media ${Device.laptopM} {
    padding: 0;
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

  &[disabled] {
    opacity: 0;
    pointer-events: none;
  }
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
  const { keys, pendingTransactions, transactions } = useContext(AppContext);
  const { currentPage, handlePageChange } = useContext(DashboardContext);

  useEffect(() => {
    const clipboard = new ClipboardJS('.js-copy-address', {
      text: () => keys.public,
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  const allTransactions = [...pendingTransactions, ...transactions];

  const maxPage = Math.ceil(allTransactions.length / TRANSACTIONS_PER_PAGE);

  const visibleTransactions = allTransactions.slice(
    (currentPage - 1) * TRANSACTIONS_PER_PAGE,
    currentPage * TRANSACTIONS_PER_PAGE,
  );

  return (
    <Fragment>
      <Main>
        <MainWrap>
          <Header />
          <Topline title="Dashboard" />
          <Body>
            <FlexContainer>
              <SendButton to="/send/">
                <IconSend />
                <span>Send</span>
              </SendButton>
              <ReceiveButton to="/receive/">
                <IconReceive />
                <span>Receive</span>
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
                {visibleTransactions.length > 0 ? (
                  <Transaction>
                    <Value>Value</Value>
                    <Date>Date</Date>
                    <Fee>Fee</Fee>
                    <Address>Address</Address>
                  </Transaction>
                ) : (
                  <TransactionsPlaceholder>
                    Your transactions will be displayed here
                  </TransactionsPlaceholder>
                )}

                {visibleTransactions.map(transaction => (
                  <Transaction key={transaction.hash}>
                    <Value>
                      <Label>Value</Label>
                      {transaction._isPending ? <IconPending /> : null}
                      {new Decimal(transaction.amount).mul(1e-8).val()}
                    </Value>
                    <Date>
                      <Label>Date</Label>
                      {format(
                        fromUnixTime(transaction.timestamp),
                        'dd.MM.yyyy HH:mm',
                      )}
                    </Date>
                    <Fee>
                      <Label>Fee</Label>
                      {new Decimal(transaction.fee).mul(1e-8).val()}
                    </Fee>

                    <Address>
                      <Label>Transaction ID</Label>
                      <Type>
                        {transaction.from === keys.public ? (
                          <IconSend />
                        ) : (
                          <IconReceive />
                        )}
                      </Type>
                      <AddressID>
                        {transaction.from === keys.public
                          ? transaction.to
                          : transaction.from}
                      </AddressID>
                    </Address>
                    <TransactionLink
                      to={`/dashboard/${encodeURIComponent(transaction.hash)}`}
                    />
                  </Transaction>
                ))}
                {allTransactions.length > TRANSACTIONS_PER_PAGE ? (
                  <TransactionNav>
                    <TransactionsPrev
                      onClick={() => {
                        handlePageChange(-1);
                      }}
                      disabled={currentPage < 2}
                    >
                      <IconBack />
                      Previous {TRANSACTIONS_PER_PAGE}
                    </TransactionsPrev>
                    <TransactionsCounter>
                      {currentPage} / {maxPage}
                    </TransactionsCounter>
                    <TransactionsNext
                      onClick={() => {
                        handlePageChange(1);
                      }}
                      disabled={currentPage >= maxPage}
                    >
                      Next {TRANSACTIONS_PER_PAGE}
                      <IconNext />
                    </TransactionsNext>
                  </TransactionNav>
                ) : null}
              </Transactions>
            </Container>
          </Body>
        </MainWrap>
      </Main>
    </Fragment>
  );
};

export default Dashboard;
