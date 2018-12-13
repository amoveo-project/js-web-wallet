import React, { Fragment, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import ClipboardJS from 'clipboard';
import { Link } from '@reach/router';
import { format, fromUnixTime } from 'date-fns';

import Device from 'device';
import { ReactComponent as SvgReceive } from 'shared/assets/icon-receive.svg';
import { ReactComponent as SvgSend } from 'shared/assets/icon-send.svg';
import { ReactComponent as SvgPending } from 'shared/assets/icon-pending.svg';
import { ReactComponent as SvgPrev } from 'shared/assets/icon-prev.svg';
import { ReactComponent as SvgClipboard } from 'shared/assets/icon-clipboard.svg';

import Header from 'shared/components/Header.js';
import ButtonMin from 'shared/components/ButtonMin.js';
import GoBack from 'shared/components/GoBack.js';

import AppContext from 'shared/contexts/AppContext';

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

  @media ${Device.laptopM} {
    padding: 0 50px;
  }
  @media ${Device.laptopL} {
    padding: 0 15px;
  }
`;
const TransactionTopline = styled.section`
  width: 100%;
  padding: 15px 0;
  background: ${props => (props.isSpend ? '#fff' : props.theme.color.yellow)};
  color: ${props => props.theme.color.blue};
`;
const IconReceive = styled(SvgReceive)`
  width: 30px;
  height: 30px;
  padding: 5px;
  margin: 0 20px 0 0;
`;
const IconSend = styled(SvgSend)`
  width: 30px;
  height: 30px;
  padding: 5px;
  margin: 0 20px 0 0;
`;
const IconPending = styled(SvgPending)`
  fill: currentColor;
  opacity: 0.5;
  position: absolute;
  top: -10px;
  right: -10px;
  width: 16px;
  height: 16px;
`;
const IconBack = styled(SvgPrev)``;
const FlexContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 28px;
  margin: 15px 15px 15px 0;
  line-height: 1.15;
  font-weight: 500;

  @media ${Device.laptopM} {
    font-size: 40px;
    margin: 25px 20px 25px 0;
  }
`;
const BalanceWrap = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;
const Balance = styled.div`
  font-size: 28px;
  color: ${props => props.theme.color.blue};

  @media ${Device.laptopM} {
    font-size: 40px;
  }

  span {
    font-size: 18px;
    vertical-align: baseline;

    @media ${Device.laptopM} {
      font-size: 20px;
    }
  }
`;
const Body = styled.div`
  width: 100%;
  padding: 30px 0 60px 0;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;
const Fieldset = styled.fieldset`
  padding: 0;
  margin: 0 0 30px 0;
  border: none;
  width: 100%;

  @media ${Device.laptopM} {
    margin: 0 0 60px 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;
const FieldsetCol = styled(Fieldset)`
  max-width: 30%;
`;
const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Label = styled.label`
  font-size: 14px;
  font-weight: 300;
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  user-select: none;

  @media ${Device.laptopM} {
    font-size: 16px;
  }
`;
const Field = styled.div`
  width: 100%;
  padding: 10px 0;
  margin: 0;
  line-height: 28px;
  font-size: 16px;
  transition: all 0.4s;
  color: #fff;

  @media ${Device.laptopM} {
    font-size: 20px;
    line-height: 45px;
  }
`;
const Amount = styled(Field)`
  font-size: 45px;
`;
const To = styled(Field)`
  font-family: 'OCRAExtended';
  word-break: break-all;
`;
const LabelField = styled(Field)``;
const PaymentID = styled(Field)``;
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
const Blockchain = styled(Link)`
  color: ${props => props.theme.color.yellow};
  border
`;
const ExplorerLink = styled(ButtonMin)``;

const TransactionReceive = ({ transactionId }) => {
  const { keys, pendingTransactions, transactions } = useContext(AppContext);

  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const id = decodeURIComponent(transactionId);

    const allTransactions = [...pendingTransactions, ...transactions];
    const transaction = allTransactions.find(item => item.hash === id);

    setTransaction(transaction);

    const clipboard = new ClipboardJS('.js-copy-hash', {
      text: () => transaction.hash,
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  if (!transaction) {
    return null;
  }

  const isSpend = transaction.from === keys.public;
  const isPending = Boolean(transaction._isPending);

  return (
    <Fragment>
      <Main>
        <MainWrap>
          <Header />
          <TransactionTopline isSpend={isSpend}>
            <FlexContainer>
              <Title>Transaction details</Title>
              <BalanceWrap>
                {isSpend ? <IconSend /> : <IconReceive />}
                <Balance>
                  {transaction.amount / 1e8} VEO
                  {isPending ? <IconPending /> : null}
                </Balance>
              </BalanceWrap>
            </FlexContainer>
          </TransactionTopline>
          <Body>
            <Container>
              <Form>
                <Fieldset>
                  <Label>{isSpend ? 'To' : 'From'}</Label>
                  <To>{isSpend ? transaction.to : transaction.from}</To>
                </Fieldset>
                <FieldsetCol>
                  <Label>When</Label>
                  <Field>
                    {format(
                      fromUnixTime(transaction.timestamp),
                      'dd.MM.yyyy HH:mm:ss',
                    )}
                  </Field>
                </FieldsetCol>
                <FieldsetCol>
                  <Label>Network fee</Label>
                  <Field>{transaction.fee / 1e8} VEO</Field>
                </FieldsetCol>
                {!isPending ? (
                  <FieldsetCol>
                    <Label>Blocknumber</Label>
                    <Field>{transaction.blocknumber}</Field>
                  </FieldsetCol>
                ) : null}
                <Fieldset>
                  <Label>
                    {!isPending ? 'Transaction ID' : 'Pending ID'}&nbsp;
                    <IconClipboard className="js-copy-hash" />
                  </Label>
                  <Field>{transaction.hash}</Field>
                </Fieldset>
                {!isPending ? (
                  <Fieldset>
                    <ExplorerLink
                      href={`https://explorer.veopool.pw/?input=${encodeURIComponent(
                        transaction.hash,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View in blockchain
                    </ExplorerLink>
                  </Fieldset>
                ) : null}
              </Form>
            </Container>
          </Body>
        </MainWrap>
        <GoBack to="/dashboard/">
          <IconBack />
        </GoBack>
      </Main>
    </Fragment>
  );
};

export default TransactionReceive;
