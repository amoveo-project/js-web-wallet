import styled from 'styled-components';
import Device from 'device';

export const ModalText = styled.div`
  font-size: 28px;
  margin: 0 0 30px 0;
  font-weight: 300;

  @media ${Device.laptop} {
    font-size: ${props => props.size || '40px'};
  }
`;
