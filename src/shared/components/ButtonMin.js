import styled from 'styled-components';
import Device from 'device';

const ButtonMin = styled.a`
  display: inline-block;
  margin: 0;
  padding: 10px 15px;
  line-height: 20px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  color: ${props => props.theme.color.yellow};
  border: 2px solid ${props => props.theme.color.yellow};
  background: none;
  transition: all 0.4s;
  text-align: center;
  user-select: none;
  cursor: pointer;

  @media ${Device.laptopM} {
    padding: 16px 20px;
    line-height: 24px;
    border-radius: 10px;
    font-size: 20px;
  }

  &:hover {
    background: ${props => props.theme.color.yellow};
    color: ${props => props.theme.color.blue};
  }
`;

export default ButtonMin;
