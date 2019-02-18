import styled from 'styled-components';

export const ModalIcon = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  padding: 20px;
  margin-left: -30px;
  background: ${props => props.theme.color.blue};
  border-radius: 0 0 30px 30px;
`;
