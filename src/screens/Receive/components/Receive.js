import React, { Fragment, useContext, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import { Link } from '@reach/router';
import styled from 'styled-components';

import { ReactComponent as SvgNext } from 'shared/assets/icon-next.svg';
import { ReactComponent as SvgClipboard } from 'shared/assets/icon-clipboard.svg';

import Header from 'shared/components/Header.js';
import Topline from 'shared/components/Topline';

import AppContext from 'shared/contexts/AppContext';
import ReceiveContext from 'shared/contexts/ReceiveContext';

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
  const { keys } = useContext(AppContext);
  const { amount, handleAmountInput } = useContext(ReceiveContext);

  useEffect(() => {
    const clipboard = new ClipboardJS('.js-copy-address', {
      text: () => keys.public,
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  const receiveUri = `${keys.public}?value=${amount}e8`;

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
                    Your wallet address{' '}
                    <IconClipboard className="js-copy-address" />
                  </Label>
                  <Address>{keys.public}</Address>
                </Fieldset>
                <FieldsetCol>
                  <Label htmlFor="amount">Amount</Label>
                  <Amount
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={handleAmountInput}
                  />
                </FieldsetCol>
              </Form>
            </Container>
          </Body>
        </MainWrap>
        <Footer>
          <Container>
            <FooterWrap>
              <QrCodeWrap>
                <QrCode
                  src={`http://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=${encodeURIComponent(
                    receiveUri,
                  )}&qzone=1&margin=0&size=400x400&ecc=L`}
                  alt="qr code"
                />
                <div>
                  <QrCodeTitle>
                    Use this QR code to quickly receive payments
                  </QrCodeTitle>
                  <QrCodeAddress>{receiveUri}</QrCodeAddress>
                </div>
              </QrCodeWrap>
              <FooterLink to="/dashboard">
                Dashboard <IconNext />
              </FooterLink>
            </FooterWrap>
          </Container>
        </Footer>
      </Main>
    </Fragment>
  );
};

export default Receive;
