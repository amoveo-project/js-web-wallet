import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';
import Device from 'device';

import { ReactComponent as SvgNext } from 'shared/assets/icon-next.svg';

import Header from 'shared/components/Header.js';
import Topline from 'shared/components/Topline';

import SendModal from './SendModal';

import SendContext from 'shared/contexts/SendContext';
import Decimal from 'decimal.js-light';

Decimal.config({ toExpNeg: -8 });

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
const Body = styled.div`
  width: 100%;
  padding: 30px 0 60px 0;
`;
const Form = styled.form`
  width: 100%;
`;
const Fieldset = styled.fieldset`
  padding: 0;
  margin: 0 0 60px 0;
  border: none;
  width: 100%;

  &:last-of-type {
    margin-bottom: 0;
  }
`;
const FieldsetCol = styled(Fieldset)`
  max-width: 48%;
  position: relative;
`;
const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const VeoLabel = styled.div`
  position: absolute;
  top: 34px;
  right: 0;
  font-size: 14px;
  font-weight: 300;

  @media ${Device.laptopM} {
    font-size: 20px;
    top: 44px;
  }
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
const FillMax = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: ${props => props.theme.color.yellow};
  cursor: pointer;
  user-select: none;
`;
const Input = styled.input`
  background: none;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  width: 100%;
  padding: 10px 0;
  margin: 0;
  line-height: 24px;
  font-size: 18px;
  transition: all 0.4s;
  color: #fff;

  @media ${Device.laptopM} {
    font-size: 20px;
    line-height: 45px;
  }

  &:hover {
    border-color: rgba(255, 255, 255, 1);
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;
const Amount = styled(Input)`
  font-size: 24px;
  padding-right: 50px;

  @media ${Device.laptopM} {
    font-size: 45px;
    padding-right: 60px;
  }
`;
const Address = styled(Input)`
  font-family: 'OCRAExtended';
`;
const Footer = styled.footer`
  width: 100%;
  font-size: 18px;
  position: relative;
  z-index: 2;

  @media ${Device.laptopM} {
    font-size: 20px;
  }
`;
const FooterWrap = styled.div`
  background: #fff;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-radius: 10px 10px 0 0;
  margin: 40px 0 0 0;
  color: ${props => props.theme.color.blue};
`;
const SendMoney = styled.div`
  font-weight: 500;
  line-height: 30px;
  color: ${props => props.theme.color.blue};
  display: inline-block;
  text-decoration: none;
  cursor: pointer;

  @media ${Device.laptopM} {
    line-height: 60px;
  }

  &[disabled] {
    pointer-events: none;
    svg {
      opacity: 0.5;
    }
  }
`;
const Fee = styled.div`
  font-size: 18px;
  font-weight: 300;
  line-height: 30px;

  @media ${Device.laptopM} {
    line-height: 60px;
    font-size: 20px;
  }
`;
const FeeValue = styled.span`
  font-weight: 500;
`;
const IconNext = styled(SvgNext)`
  width: 30px;
  height: 30px;
  background: ${props => props.theme.color.yellow};
  padding: 10px;
  border-radius: 30px;
  display: inline-block;
  margin: 0 0 0 10px;
  vertical-align: top;

  @media ${Device.laptopM} {
    width: 60px;
    height: 60px;
    padding: 20px;
    margin: 0 0 0 20px;
  }
`;

const Send = () => {
  const {
    address,
    amount,
    fee,
    handleAddressInput,
    handleAmountInput,
    handleFillMax,
    handleHideModal,
    handleSendMoney,
    isSendEnabled,
    sentTransaction,
  } = useContext(SendContext);

  if (sentTransaction) {
    return <SendModal transaction={sentTransaction} onHide={handleHideModal} />;
  }

  return (
    <Fragment>
      <Main>
        <MainWrap>
          <Header />
          <Topline title="Send" />
          <Body>
            <Container>
              <Form>
                <FieldsetCol>
                  <LabelContainer>
                    <Label htmlFor="amount">Amount</Label>
                    {fee > 0 ? (
                      <FillMax htmlFor="amount" onClick={handleFillMax}>
                        Send max
                      </FillMax>
                    ) : null}
                  </LabelContainer>
                  <Amount
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={new Decimal(amount).mul(1e-8).val()}
                    onChange={handleAmountInput}
                  />
                  <VeoLabel>VEO</VeoLabel>
                </FieldsetCol>
                <Fieldset>
                  <Label htmlFor="address">Receiver address</Label>
                  <Address
                    id="address"
                    type="text"
                    placeholder="Paste recipient address"
                    value={address}
                    onChange={handleAddressInput}
                  />
                </Fieldset>
              </Form>
            </Container>
          </Body>
        </MainWrap>
        <Footer>
          <Container>
            <FooterWrap>
              <Fee>
                {fee > 0 ? (
                  <span>
                    Network fee:{' '}
                    <FeeValue>{new Decimal(fee).mul(1e-8).val()} VEO</FeeValue>
                  </span>
                ) : null}
              </Fee>
              <SendMoney onClick={handleSendMoney} disabled={!isSendEnabled}>
                Send payment <IconNext />
              </SendMoney>
            </FooterWrap>
          </Container>
        </Footer>
      </Main>
    </Fragment>
  );
};

export default Send;
