import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const ButtonMin = styled(Link)`
  display: inline-block;
  margin: 0;
  padding: 16px 20px;
  line-height: 24px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;
  color: ${props => props.theme.color.yellow};
  border: 2px solid ${props => props.theme.color.yellow};
  background: none;
  transition: all 0.4s;
  text-align: center;
  user-select: none;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.color.yellow};
    color: ${props => props.theme.color.blue};
  }
`;

export default ButtonMin;
