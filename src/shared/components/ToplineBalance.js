import React, { useContext } from 'react';
import styled from 'styled-components';
import Device from 'device';

import AppContext from 'shared/contexts/AppContext';
import { ReactComponent as SvgPending } from 'shared/assets/icon-pending.svg';

const BalanceWrapper = styled.div`
  position: relative;
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
const Pending = styled.div`
  color: #fff;
  font-size: 16px;
  text-align: right;
  margin: 5px 0 0 0;
  line-height: 1.13;
  font-weight: 300;
`;
const IconPending = styled(SvgPending)`
  width: 16px;
  height: 16px;
  margin: 0 10px 0 0;
  fill: #fff;
  opacity: 0.5;
`;

const ToplineBalance = () => {
  const { balance } = useContext(AppContext);

  return (
    <BalanceWrapper>
      <Balance>
        {balance.toFixed(0)}
        <span>.{String(balance).split('.')[1] || '00'}</span> VEO
      </Balance>
      <Pending>
        <IconPending />
        <span>Pending: 40.0175869</span>
      </Pending>
    </BalanceWrapper>
  );
};

export default ToplineBalance;
