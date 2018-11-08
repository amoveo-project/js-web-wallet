import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const Title = styled.h1`
  font-weight: 500;
  font-size: 60px;
  margin: 0 0 40px 0;
  max-width: 500px;
`;
const Subtitle = styled.h1`
  font-weight: 300;
  font-size: 20px;
  opacity: 0.5;
  max-width: 500px;
`;
const Btnswrap = styled.div`
  margin: 40px 0 0 0;
`;
const Btn = styled(Link)`
  display: inline-block;
  margin: 0 30px 0 0;
  padding: 30px 30px 30px 90px;
  line-height: 60px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 20px;
  color: #161a2e;
  background: #fff;

  &:first-child {
    background: #fff200;
  }

  & span {
    font-weight: 500;
  }
`;

const Home = () => {
  return (
    <Fragment>
      <Title>The simplest wayto use VEO</Title>
      <Subtitle>
        Send and receive Viewo (VEO) safely and securely, anywhere and any time.
      </Subtitle>
      <Btnswrap>
        <Btn to="/create">
          <span>Create</span> wallet
        </Btn>
        <Btn to="/create">
          <span>Restore</span> wallet
        </Btn>
      </Btnswrap>
    </Fragment>
  );
};

export default Home;
