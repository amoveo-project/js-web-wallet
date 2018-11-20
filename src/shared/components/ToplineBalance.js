import React, { useContext } from 'react';
import styled from 'styled-components';
import Device from 'device';

import AppContext from 'shared/contexts/AppContext';

const YourBalanceText = styled.p`
  font-size: 14px;
  opacity: 0.5;
  text-align: right;
  margin: 0 0 5px 0;

  @media ${Device.laptopM} {
    font-size: 16px;
  }
`;

const Balance = styled.div`
  font-size: 28px;
  color: ${props => props.theme.color.yellow};

  @media ${Device.laptopM} {
    font-size: 40px;
  }

  span {
    font-size: 18px;
    vertical-align: baseline;

    @media ${Device.laptopM} {
      font-size: 20px;
    }
  }
`;

const ToplineBalance = () => {
  const { balance } = useContext(AppContext);

  return (
    <div>
      <YourBalanceText>Your balance</YourBalanceText>
      <Balance>
        {balance.toFixed(0)}
        <span>.{String(balance).split('.')[1] || '00'}</span> VEO
      </Balance>
    </div>
  );
};

export default ToplineBalance;
