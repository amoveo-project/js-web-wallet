import React, { Fragment, useContext, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Device from 'device';

import { ReactComponent as SvgNext } from 'shared/assets/icon-next.svg';
import { ReactComponent as SvgClipboard } from 'shared/assets/icon-clipboard.svg';
import { ReactComponent as SvgLedger } from 'shared/assets/icon-ledger.svg';

import Header from 'shared/components/Header.js';
import Topline from 'shared/components/Topline';

import AppContext from 'shared/contexts/AppContext';
import ReceiveContext from 'shared/contexts/ReceiveContext';
import Decimal from 'decimal.js-light';

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
  z-index: 3;
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
  width: 100%;
  position: relative;

  @media ${Device.laptop} {
    max-width: 48%;
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
const VerifiedAddress = styled.span`
  color: ${props => props.theme.color.yellow};
  opacity: 0.5;
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
  flex-wrap: wrap;
`;
const FooterLink = styled(Link)`
  font-weight: 500;
  font-size: 18px;
  line-height: 30px;
  color: ${props => props.theme.color.blue};
  display: inline-block;
  text-decoration: none;
  width: 100%;
  text-align: right;

  @media ${Device.laptopM} {
    line-height: 60px;
    font-size: 20px;
    width: auto;
  }

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
const IconLedger = styled(SvgLedger)`
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
const QrCodeWrap = styled.div`
  width: 100%;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  @media ${Device.mobileL} {
    display: inline-block;
  }
  @media ${Device.laptop} {
    max-width: 70%;
    padding: 0 20px 0 0;
    border-right: solid 2px rgba(22, 26, 46, 0.3);
  }

  @media ${Device.laptopM} {
    padding: 0 30px 0 0;
    max-width: 700px;
  }
`;
const QrCode = styled.img`
  width: 120px;
  height: 120px;
  min-width: 120px;
  margin: 0 20px 0 0;
  float: left;

  @media ${Device.laptop} {
    width: 170px;
    height: 170px;
    min-width: 170px;
    margin: 0 30px 0 0;
  }
`;
const QrCodeTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  flex: 1;

  @media ${Device.laptop} {
    font-size: 20px;
  }
`;
const QrCodeAddress = styled.p`
  font-size: 14px;
  font-weight: 300;
  line-height: 20px;
  margin: 20px 0;
  word-break: break-all;

  @media ${Device.laptop} {
    font-size: 16px;
    line-height: 24px;
    margin: 30px 0 0 0;
  }
`;

const Receive = () => {
  const { isHardware, keys } = useContext(AppContext);
  const {
    amount,
    handleAmountInput,
    isAddressVerified,
    verifyLedgerAddress,
  } = useContext(ReceiveContext);

  useEffect(() => {
    const clipboard = new ClipboardJS('.js-copy-address', {
      text: () => keys.public,
    });

    return () => {
      clipboard.destroy();
    };
  }, []);

  const receiveUri = `amoveo:${encodeURIComponent(
    keys.public,
  )}?amount=${amount}`;

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
                    {isAddressVerified ? (
                      <VerifiedAddress>(✓ verified)</VerifiedAddress>
                    ) : null}
                    <IconClipboard
                      className="js-copy-address"
                      title="Copy address"
                    />
                    {isHardware ? (
                      <IconLedger
                        onClick={verifyLedgerAddress}
                        title="Verify address"
                      />
                    ) : null}
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
                    value={new Decimal(amount).toString()}
                    onChange={handleAmountInput}
                  />
                  <VeoLabel>VEO</VeoLabel>
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
                  src={`https://api.qrserver.com/v1/create-qr-code/?color=000000&bgcolor=FFFFFF&data=${encodeURIComponent(
                    receiveUri,
                  )}&qzone=1&margin=0&size=400x400&ecc=L`}
                  alt="qr code"
                />
                <QrCodeTitle>
                  Use this QR code to quickly receive payments
                </QrCodeTitle>
                <QrCodeAddress>{receiveUri}</QrCodeAddress>
              </QrCodeWrap>
              <FooterLink to="/dashboard/">
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
