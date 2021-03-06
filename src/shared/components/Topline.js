import React from 'react';
import styled from 'styled-components';
import Device from 'device';

import ToplineBalance from 'shared/components/ToplineBalance';

const Wrapper = styled.section`
  width: 100%;
  padding: 15px 0;
  background: rgba(0, 0, 0, 0.15);
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

const FlexContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 28px;
  margin: 15px 15px 15px 0;
  line-height: 1.15;
  font-weight: 500;

  @media ${Device.laptopM} {
    font-size: 36px;
    margin: 20px 20px 20px 0;
  }
  @media ${Device.laptopL} {
    font-size: 40px;
    margin: 25px 20px 25px 0;
  }
`;

const Topline = ({ title = '' }) => {
  return (
    <Wrapper>
      <FlexContainer>
        <Title>{title}</Title>
        <ToplineBalance />
      </FlexContainer>
    </Wrapper>
  );
};

export default Topline;
