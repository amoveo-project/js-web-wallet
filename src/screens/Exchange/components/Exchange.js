import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import Header from 'shared/components/Header.js';

import Device from 'device';

import { ReactComponent as SvgExchange } from 'shared/assets/icon-exchange.svg';
import { ReactComponent as SvgNext } from 'shared/assets/icon-next.svg';
import { ReactComponent as SvgDropDown } from 'shared/assets/icon-arrow-down.svg';

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
  display: flex;
  flex-direction: column;
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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
`;
const Topline = styled.section`
  background: ${props => props.theme.color.yellow};
  color: ${props => props.theme.color.blue};
  padding: 30px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Toggle = styled.div`
  background: ${props => props.theme.color.blue};
  color: #fff;
  width: 60px;
  height: 60px;
  padding: 18px;
  text-align: center;
  border-radius: 30px;
  cursor: pointer;
`;
const IconExchange = styled(SvgExchange)`
  fill: #fff;
  width: 24px;
  height: 24px;
`;
const IconDropDown = styled(SvgDropDown)`
  fill: ${props => props.theme.color.blue};
  width: 14px;
  height: 8px;
  display: inline-block;
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
const Coin = styled.h3`
  font-size: 40px;
  text-transform: uppercase;
  margin: 0;
  display: inline-block;
`;
const CoinValue = styled.span`
  font-size: 16px;
  position: absolute;
  bottom: -20px;
  left: 0;
`;
const ExchangeFrom = styled.div`
  text-align: left;
  position: relative;
`;
const ExchangeTo = styled(ExchangeFrom)`
  text-align: right;

  span {
    right: 0;
    left: auto;
  }
`;
const Total = styled.div`
  font-size: 120px;
  font-weight: 500;
  text-align: center;
  color: #fff;
  width: 100%;
  margin: 0 0 30px 0;
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
  align-items: center;
  border-radius: 10px 10px 0 0;
  margin: 40px 0 0 0;
  color: ${props => props.theme.color.blue};
`;
const FooterLink = styled(Link)`
  font-weight: 300;
  font-size: 18px;
  line-height: 30px;
  color: ${props => props.theme.color.blue};
  display: inline-block;
  text-decoration: none;

  span {
    font-weight: 500;
  }

  @media ${Device.laptopM} {
    line-height: 60px;
    font-size: 20px;
  }

  &[disabled] {
    pointer-events: none;
    svg {
      opacity: 0.5;
    }
  }
`;
const SendAll = styled.div`
  font-size: 16px;
  font-weight: 500;
  user-select: none;
  cursor: pointer;
  color: ${props => props.theme.color.yellow};
`;
const Course = styled.div`
  font-size: 16px;
  font-weight: 300;
  text-align: center;
`;

const Exchange = () => {
  return (
    <Fragment>
      <Main>
        <MainWrap>
          <Header />
          <Topline>
            <FlexContainer>
              <ExchangeFrom>
                <Coin>ETH</Coin>
                <IconDropDown />
                <CoinValue>55.20</CoinValue>
              </ExchangeFrom>
              <Toggle>
                <IconExchange />
              </Toggle>
              <ExchangeTo>
                <Coin>VEO</Coin>
                <IconDropDown />
                <CoinValue>20.00879345</CoinValue>
              </ExchangeTo>
            </FlexContainer>
          </Topline>
          <Body>
            <Total>55.20</Total>
            <SendAll>Send all</SendAll>
          </Body>
        </MainWrap>
        <Footer>
          <Course>1 VEO = 0.00004536 ETH</Course>
          <Container>
            <FooterWrap>
              <div>
                <p>Top up limit: 100 VEO</p>
                <p>Network fee: 0.5 VEO</p>
              </div>
              <FooterLink to="/dashboard">
                You'll receive 2000.0021 <span>VEO</span> <IconNext />
              </FooterLink>
            </FooterWrap>
          </Container>
        </Footer>
      </Main>
    </Fragment>
  );
};

export default Exchange;
