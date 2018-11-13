import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

const Button = styled(Link)`
  display: inline-block;
  margin: 0 30px 0 0;
  padding: 30px;
  line-height: 60px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 20px;
  color: ${props => props.theme.color.blue};
  background: #fff;
  position: relative;
  transition: all 0.4s;
  text-align: center;
  min-width: 290px;
  user-select: none;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 60px;
    height: 60px;
    border-radius: 0 30px 30px 0;
    margin-top: -30px;
    background: ${props => props.theme.color.blue};
    transition: all 0.4s;
  }

  & span {
    font-weight: 500;
  }
  svg {
    width: 20px;
    height: 20px;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 15px;
    margin-top: -10px;
  }

  &:hover {
    &:after {
      width: 55px;
    }
  }
`;

export default Button;
