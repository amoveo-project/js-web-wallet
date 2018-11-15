import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import { ReactComponent as SvgSend } from 'shared/assets/icon-send.svg';
import { ReactComponent as SvgNext } from 'shared/assets/icon-next.svg';

import Header from 'shared/components/Header.js';
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
const Body = styled.div`
  width: 100%;
  padding: 30px 0 60px 0;
`;
const Form = styled.form`
  width: 100%;
`;
const Field = styled.fieldset`
  padding: 0;
  margin: 0 0 60px 0;
  border: none;
  width: 100%;

  &:last-of-type {
    margin-bottom: 0;
  }
`;
const AmountField = styled(Field)`
  max-width: 570px;
`;
const LabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Label = styled.label`
  font-size: 16px;
  font-weight: 300;
  margin: 0;
  opacity: 0.5;
  cursor: pointer;
`;
const Max = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: ${props => props.theme.color.yellow};
`;
const Input = styled.input`
  background: none;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  width: 100%;
  padding: 10px 0;
  margin: 0;
  line-height: 45px;
  font-size: 20px;
  transition: all 0.4s;
  color: #fff;

  &:hover {
    border-color: rgba(255, 255, 255, 1);
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;
const Amount = styled(Input)`
  font-size: 45px;
`;
const Address = styled(Input)``;
const PaymentID = styled(Input)``;

const Footer = styled.footer`
  width: 100%;
  font-size: 20px;
  position: relative;
  z-index: 2;
`;
const FooterWrap = styled.div`
  background: #fff;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
  margin: 40px 0 0 0;
  color: ${props => props.theme.color.blue};
`;
const FooterLink = styled(Link)`
  font-weight: 500;
  line-height: 60px;
  color: ${props => props.theme.color.blue};
  display: inline-block;
  text-decoration: none;

  &[disabled] {
    pointer-events: none;
    svg {
      opacity: 0.5;
    }
  }
`;

const Fee = styled.div`
  font-size: 20px;
  font-weight: 300;
  line-height: 60px;
  span {
    font-weight: 500;
  }
`;
const IconNext = styled(SvgNext)`
  width: 60px;
  height: 60px;
  background: ${props => props.theme.color.yellow};
  padding: 20px;
  border-radius: 30px;
  display: inline-block;
  margin: 0 0 0 20px;
  vertical-align: top;
`;
const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div`
  width: 100%;
  max-width: 570px;
  background: #fff;
  color: ${props => props.theme.color.blue};
  padding: 90px 30px 30px 30px;
  border-radius: 10px;
  text-align: center;
  position: relative;
`;
const ModalIcon = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  padding: 20px;
  margin-left: -30px;
  background: ${props => props.theme.color.blue};
  border-radius: 0 0 30px 30px;
`;
const IconSend = styled(SvgSend)`
  width: 20px;
  height: 20px;
  fill: ${props => props.theme.color.yellow};
`;
const SendValue = styled.div`
  font-size: 40px;
  margin: 0 0 10px 0;
  font-weight: 300;

  span {
    font-size: 20px;
    vertical-align: baseline;
  }
`;
const ModalText = styled.div`
  font-size: 20px;
  margin: 0 0 30px 0;
  font-weight: 300;
`;
const SendToAdress = styled.div`
  font-size: 16px;
  margin: 0 0 10px 0;
  opacity: 0.5;
  word-break: break-all;
  line-height: 1.5;
`;
const Buttons = styled.div`
  width: 100%;
  text-align: center;
  margin: 30px 0 0 0;
`;
const Ok = styled.button`
  font-size: 20px;
  font-weight: 500;
  padding: 18px 20px;
  margin: 0 15px;
  display: inline-block;
  line-height: 20px;
  border: 2px solid ${props => props.theme.color.blue};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    background: ${props => props.theme.color.yellow};
    border-color: ${props => props.theme.color.yellow};
    color: ${props => props.theme.color.blue};
  }
`;
const InBlockchain = styled(Ok)`
  background: ${props => props.theme.color.blue};
  color: #fff;
`;

const SendTemplate = ({ children }) => {
  return (
    <Fragment>
      <Main>
        <MainWrap>
          <Header />
          <Topline>
            <FlexContainer>
              <Title>Send</Title>
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
            <Container>
              <Form>
                <AmountField>
                  <LabelContainer>
                    <Label htmlFor="amount">Amount</Label>
                    <Max htmlFor="amount">Send max</Max>
                  </LabelContainer>
                  <Amount
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </AmountField>
                <Field>
                  <Label htmlFor="address">Receiver address</Label>
                  <Address
                    id="address"
                    type="text"
                    placeholder="e.g. donate@getviewo.org / donate.getviewo.org / a full Viewo address"
                  />
                </Field>
                <Field>
                  <Label htmlFor="address">Payment ID (optional)</Label>
                  <PaymentID
                    id="paymentid"
                    type="text"
                    placeholder="e.g. 59af9132941ec6e9f6ba3c4867e1cd92f2bd5fbce4325fc7b19bcdb55d640de5"
                  />
                </Field>
              </Form>
            </Container>
          </Body>
        </MainWrap>
        <Footer>
          <Container>
            <FooterWrap>
              <Fee>
                Network fee: <span>0.5 VEO</span>
              </Fee>
              <FooterLink to="/send" disabled>
                Send payment <IconNext />
              </FooterLink>
            </FooterWrap>
          </Container>
        </Footer>
        <ModalWrap>
          <Modal>
            <ModalIcon>
              <IconSend />
            </ModalIcon>
            <SendValue>
              20
              <span>.00879345</span> VEO
            </SendValue>
            <ModalText>has been sent to</ModalText>
            <SendToAdress>
              49pn7NpkLncRLmqJSP6E3th14GuedWvHs7C2UEV9LGfkVTTtpmJ3JAgVQu5LLDcLV73Z5Nxx5okMnAN6nJdJuNdLENtx7i6
            </SendToAdress>
            <Buttons>
              <Ok>OK, thanks</Ok>
              <InBlockchain to="/">See in blockchain</InBlockchain>
            </Buttons>
          </Modal>
        </ModalWrap>
      </Main>
    </Fragment>
  );
};

export default SendTemplate;
