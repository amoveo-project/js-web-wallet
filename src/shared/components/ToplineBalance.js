import React, { useContext } from 'react';
import styled from 'styled-components';

import AppContext from 'shared/contexts/AppContext';

const YourBalanceText = styled.p`
  font-size: 16px;
  opacity: 0.5;
  text-align: right;
  margin: 0 0 5px 0;
`;

const Balance = styled.div`
  font-size: 40px;
  color: ${props => props.theme.color.yellow};

  span {
    font-size: 20px;
    vertical-align: baseline;
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
