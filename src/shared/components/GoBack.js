import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Device from 'device';

const GoBack = styled(Link)`
  display: none;

  @media ${Device.laptopM} {
    display: inline-block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 40px;
    background: rgba(0, 0, 0, 0.15);
    cursor: pointer;
    z-index: 9;
    color: #fff;
  }
  @media ${Device.laptopL} {
    width: 80px;
  }

  svg {
    width: 10px;
    height: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    fill: currentColor;
    transition: transform 0.4s;
    transform: translate(-50%, -50%);

    @media ${Device.laptopL} {
      width: 20px;
      height: 20px;
    }
  }

  &:hover {
    svg {
      transform: translate(-70%, -50%);
    }
  }
`;

export default GoBack;
