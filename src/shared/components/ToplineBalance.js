import React, { useContext } from 'react';
import styled from 'styled-components';
import Device from 'device';

import AppContext from 'shared/contexts/AppContext';
import { ReactComponent as SvgPending } from 'shared/assets/icon-pending.svg';
import Decimal from 'decimal.js-light';

const BalanceWrapper = styled.div`
  position: relative;
`;
const BalanceRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;
const SyncProgress = styled.span`
  margin-right: 12px;

  font-size: 16px;

  @media ${Device.laptopM} {
    font-size: 20px;
  }
`;
const Balance = styled.div`
  font-size: 28px;
  text-align: right;
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
  font-size: 14px;
  line-height: 16px;
  text-align: right;
  margin: 5px 0 0 0;
  font-weight: 300;

  @media ${Device.laptopM} {
    font-size: 16px;
  }
`;
const IconPending = styled(SvgPending)`
  width: 16px;
  height: 16px;
  margin: 0 10px 0 0;
  fill: #fff;
  opacity: 0.5;
`;

const ToplineBalance = () => {
  const {
    balance,
    headerIdSync,
    headerIdTop,
    keys,
    pendingTransactions,
  } = useContext(AppContext);

  const pendingBalances = pendingTransactions.reduce(
    (acc, cur) => {
      const isSpend = cur.from === keys.public;

      if (isSpend) {
        acc.spend += cur.amount;
      } else {
        acc.receive += cur.amount;
      }

      return acc;
    },
    {
      spend: 0,
      receive: 0,
    },
  );

  const isShowSync =
    headerIdSync > 0 && headerIdTop > 0 && headerIdSync < headerIdTop;

  return (
    <BalanceWrapper>
      <BalanceRow>
        {isShowSync ? (
          <SyncProgress>
            sync in progress {headerIdSync} / {headerIdTop}
          </SyncProgress>
        ) : null}
        <Balance>
          {new Decimal(balance).mul(1e-8).val() | 0}
          <span>.{balance % 10 ** 8}</span> VEO
        </Balance>
      </BalanceRow>
      {pendingTransactions.length > 0 && (
        <Pending>
          <IconPending />
          <span>
            Pending:
            {pendingBalances.receive > 0
              ? ` +${new Decimal(pendingBalances.receive).mul(1e-8).val()}`
              : null}
            {pendingBalances.receive > 0 && pendingBalances.spend > 0
              ? ' /'
              : null}
            {pendingBalances.spend > 0
              ? ` −${new Decimal(pendingBalances.spend).mul(1e-8).val()}`
              : null}
          </span>
        </Pending>
      )}
    </BalanceWrapper>
  );
};

export default ToplineBalance;
