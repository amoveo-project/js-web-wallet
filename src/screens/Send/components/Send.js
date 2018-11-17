import React, { Fragment, useContext } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

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
`;
const FeeValue = styled.span`
  font-weight: 500;
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

const Send = () => {
  const {
    address,
    amount,
    fee,
    handleAddressInput,
    handleAmountInput,
    handleFillMax,
    isSendEnabled,
  } = useContext(SendContext);

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
                    value={amount}
                    onChange={handleAmountInput}
                  />
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
                    Network fee: <FeeValue>{fee} VEO</FeeValue>
                  </span>
                ) : null}
              </Fee>
              <FooterLink to="/send" disabled={!isSendEnabled}>
                Send payment <IconNext />
              </FooterLink>
            </FooterWrap>
          </Container>
        </Footer>
      </Main>
    </Fragment>
  );
};

export default Send;
