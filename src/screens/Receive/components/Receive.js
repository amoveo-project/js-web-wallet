import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import { ReactComponent as SvgNext } from 'shared/assets/icon-next.svg';
import { ReactComponent as SvgClipboard } from 'shared/assets/icon-clipboard.svg';

import Header from 'shared/components/Header.js';
import Topline from 'shared/components/Topline';

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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
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
const Address = styled.div`
  font-family: 'OCRAExtended';
  width: 100%;
  padding: 10px 0;
  margin: 0;
  line-height: 45px;
  font-size: 20px;
  color: #fff;
  word-break: break-all;
  line-height: 24px;
`;
const LabelField = styled(Input)``;
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
const QrCodeWrap = styled.div`
  width: 100%;
  max-width: 700px;
  border-right: solid 2px rgba(22, 26, 46, 0.3);
  padding: 0 30px 0 0;

  display: flex;
  justify-content: flex-start;
`;
const QrCode = styled.img`
  width: 170px;
  height: 170px;
  min-width: 170px;
  margin: 0 30px 0 0;
`;
const QrCodeTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin: 0 0 30px 0;
`;
const QrCodeAddress = styled.p`
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  margin: 0;
  word-break: break-word;
`;

const Receive = () => {
  return (
    <Fragment>
      <Main>
        <MainWrap>
          <Header />
          <Topline title="Receive" />
          <Body>
            <Container>
              <Form>
                <Fieldset>
                  <Label>
                    Your wallet address <IconClipboard />
                  </Label>
                  <Address>
                    49pn7NpkLncRLmqJSP6E3th14GuedWvHs7C2UEV9LGfkVTTtpmJ3JAgVQu5LLDcLV73Z5Nxx5okMnAN6nJdJuNdLENtx7i6
                  </Address>
                </Fieldset>
                <FieldsetCol>
                  <Label htmlFor="amount">Amount</Label>
                  <Amount
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </FieldsetCol>
                <FieldsetCol>
                  <Label htmlFor="label">Label</Label>
                  <LabelField
                    id="label"
                    type="text"
                    placeholder="e.g. payment for Chuck Norris"
                  />
                </FieldsetCol>
                <Fieldset>
                  <Label htmlFor="paymentid">Payment ID (optional)</Label>
                  <PaymentID
                    id="paymentid"
                    type="text"
                    placeholder="e.g. 59af9132941ec6e9f6ba3c4867e1cd92f2bd5fbce4325fc7b19bcdb55d640de5"
                    defaultValue="2c5e9d85aa884c2dd5f0494af754c1d726388227539911a9a834347c23e09713"
                  />
                </Fieldset>
              </Form>
            </Container>
          </Body>
        </MainWrap>
        <Footer>
          <Container>
            <FooterWrap>
              <QrCodeWrap>
                <QrCode
                  src="http://api.qrserver.com/v1/create-qr-code/?color=000000&amp;bgcolor=FFFFFF&amp;data=+viewo%3A49pn7NpkLncRLmqJSP6E3th14GuedWvHs7C2UEV9LGfkVT%0ATtpmJ3JAgVQu5LLDcLV73Z5Nxx5okMnAN6nJdJuNdLENtx7i6%3F%0Atx_payment_id%3Dc2c251accadde81cc5d73c08815813df8d8ab42b2%0A5112da08ef5d4c655d461f9+&amp;qzone=1&amp;margin=0&amp;size=400x400&amp;ecc=L"
                  alt="qr code"
                />
                <div>
                  <QrCodeTitle>
                    Use this QR code to quickly receive payments
                  </QrCodeTitle>
                  <QrCodeAddress>
                    viewo:49pn7NpkLncRLmqJSP6E3th14GuedWvHs7C2UEV9LGfkVTTtpmJ3JAgVQu5LLDcLV73Z5Nxx5okMnAN6nJdJuNdLENtx7i6?tx_payment_id=c2c251accadde81cc5d73c08815813df8d8ab42b25112da08ef5d4c655d461f9
                  </QrCodeAddress>
                </div>
              </QrCodeWrap>
              <FooterLink to="/send">
                Receive <IconNext />
              </FooterLink>
            </FooterWrap>
          </Container>
        </Footer>
      </Main>
    </Fragment>
  );
};

export default Receive;
