import React, { Fragment } from 'react';
import styled from 'styled-components';
import Device from 'device';

import { ReactComponent as SvgPrev } from 'shared/assets/icon-prev.svg';

import GoBack from 'shared/components/GoBack.js';

const Main = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: ${props => props.theme.color.blue};
  color: #fff;
`;
const Body = styled.div`
  background: transparent;
  width: 100%;
  position: relative;
  z-index: 2;
  display: flex;
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
const IconBack = styled(SvgPrev)``;
const Title = styled.h1`
  color: #fff;
  font-size: 30px;
  font-weight: 500;

  @media ${Device.tablet} {
    font-size: 60px;
  }
`;
const FaqWrap = styled.main``;
const FaqGroup = styled.section`
  padding: 20px 0;
  border-top: 2px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;

  @media ${Device.tablet} {
    padding: 30px 0;
  }
`;
const FaqGroupTitle = styled.h2`
  width: 100%;
  font-weight: 300;
  margin: 0 0 40px 0;
  padding: 0;
  font-size: 16px;
  text-transform: uppercase;
  line-height: 22px;

  @media ${Device.laptop} {
    max-width: 370px;
    padding: 0 100px 0 0;
    margin: 0;
    line-height: 24px;
  }
`;
const FaqGroupWrap = styled.div`
  flex: 1;
`;
const FaqItem = styled.div`
  padding: 0 0 0 20px;
  margin: 0 0 30px 0;
  position: relative;
  cursor: pointer;

  @media ${Device.laptop} {
    margin: 0 0 60px 0;
  }
  &.active {
    &:after {
      opacity: 1;
    }
    div {
      display: block;
      opacity: 0.5;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 2px;
    background: ${props => props.theme.color.yellow};
    opacity: 0.3;
    transition: all 0.4s;
  }
`;
const Question = styled.h3`
  margin: 0;
  font-size: 18px;
  line-height: 21px;

  @media ${Device.laptop} {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
  }
`;
const Answer = styled.div`
  font-size: 16px;
  opacity: 0.5;
  font-weight: 300;
  margin: 20px 0 0 0;
  display: none;
  transition: opacity 0.4s;
  opacity: 0;
  line-height: 1.4;

  @media ${Device.laptop} {
    font-size: 16px;
    margin: 30px 0 0 0;
  }
`;

const faqdata = [
  {
    group: 'Lorem ipsum dolor sit amet',
    id: 1,
    items: [
      {
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        id: '1',
      },
      {
        question:
          'Ssed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        id: '2',
      },
      {
        question:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat?',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        id: '3',
      },
      {
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        id: '4',
      },
    ],
  },
  {
    group: 'SSED DO EIUSMOD TEMPOR INCIDIDUNT UT',
    id: 2,
    items: [
      {
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        id: '1',
      },
      {
        question:
          'Ssed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        id: '2',
      },
      {
        question:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat?',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        id: '3',
      },
      {
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
        answer:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        id: '4',
      },
    ],
  },
];

const FaqContainer = () => (
  <Fragment>
    <Main>
      <Body>
        <Container>
          <Title>FAQ</Title>
          <FaqWrap>
            {faqdata.map((faq, groupIndex) => (
              <FaqGroup>
                <FaqGroupTitle>{faq.group}</FaqGroupTitle>
                <FaqGroupWrap>
                  {faq.items.map((item, index) => (
                    <FaqItem
                      className={
                        groupIndex === 0 && index === 0 ? 'active' : ''
                      }
                    >
                      <Question>{item.question}</Question>
                      <Answer>{item.answer}</Answer>
                    </FaqItem>
                  ))}
                </FaqGroupWrap>
              </FaqGroup>
            ))}
          </FaqWrap>
        </Container>
      </Body>
      <GoBack to="/">
        <IconBack />
      </GoBack>
    </Main>
  </Fragment>
);

export default FaqContainer;
