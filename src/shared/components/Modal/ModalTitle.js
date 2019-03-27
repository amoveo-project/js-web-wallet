import styled from 'styled-components';
import Device from 'device';

export const ModalTitle = styled.div`
  font-size: 28px;
  margin: 0 0 10px 0;
  font-weight: 300;

  @media ${Device.laptop} {
    font-size: 40px;
  }
`;
