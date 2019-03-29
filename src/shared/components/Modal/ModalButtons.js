import styled from 'styled-components';
import Device from 'device';

export const Buttons = styled.div`
  width: 100%;
  margin: 30px 0 15px 0;
  text-align: ${props => props.textAlign || 'left'};

  @media ${Device.laptop} {
    margin: 30px 0 0 0;
  }
`;
