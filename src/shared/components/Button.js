import { Link } from '@reach/router';
import styled from 'styled-components';
import Device from 'device';

const Button = styled(Link)`
  display: inline-block;
  margin: 0 20px 0 0;
  padding: 20px;
  line-height: 40px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 18px;
  color: ${props => props.theme.color.blue};
  background: #fff;
  position: relative;
  transition: all 0.4s;
  text-align: center;
  min-width: 200px;
  width: 46%;
  user-select: none;

  @media ${Device.laptop} {
    min-width: 270px;
    max-width: 270px;
    font-size: 18px;
    line-height: 50px;
    padding: 20px;
    margin: 0 20px 0 0;
  }
  @media ${Device.laptopM} {
    min-width: 290px;
    max-width: 290px;
    font-size: 20px;
    line-height: 60px;
    padding: 30px;
    margin: 0 30px 0 0;
  }

  &:last-of-type {
    margin: 0;
  }

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 40px;
    height: 40px;
    border-radius: 0 30px 30px 0;
    margin-top: -20px;
    background: ${props => props.theme.color.blue};
    transition: all 0.4s;

    @media ${Device.laptop} {
      width: 60px;
      height: 60px;
      margin-top: -30px;
    }
  }

  & span {
    font-weight: 500;
  }
  svg {
    width: 16px;
    height: 16px;
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 5px;
    margin-top: -8px;

    @media ${Device.laptop} {
      left: 15px;
      width: 20px;
      height: 20px;
      margin-top: -10px;
    }
  }

  &:hover {
    &:after {
      width: 45px;

      @media ${Device.laptop} {
        width: 55px;
      }
    }
  }
`;

export default Button;
