import React, { Fragment, useContext } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import { ReactComponent as SvgSend } from 'shared/assets/icon-send.svg';
import { ReactComponent as SvgNext } from 'shared/assets/icon-next.svg';

import Header from 'shared/components/Header.js';
import Topline from 'shared/components/Topline';

import AppContext from 'shared/contexts/AppContext';
import SendContext from 'shared/contexts/SendContext';

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
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  user-select: none;
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
  max-height: 67px;
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
  align-items: flex-end;
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
  appearance: none;

  z-index: 999;

  @supports (
    (-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))
  ) {
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
  }
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
  background: #fff;

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

const Send = () => {
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
                    <Max htmlFor="amount">Send max</Max>
                  </LabelContainer>
                  <Amount
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </FieldsetCol>
                <Fieldset>
                  <Label htmlFor="address">Receiver address</Label>
                  <Address
                    id="address"
                    type="text"
                    placeholder="Paste recipient address"
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
                Network fee: <span>0.5 VEO</span>
              </Fee>
              <FooterLink to="/send" disabled>
                Send payment <IconNext />
              </FooterLink>
            </FooterWrap>
          </Container>
        </Footer>
        {/* <ModalWrap>
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
        </ModalWrap> */}
      </Main>
    </Fragment>
  );
};

export default Send;
