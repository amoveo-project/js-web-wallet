import React from 'react';
import styled from 'styled-components';

import { ReactComponent as SvgLedger } from 'shared/assets/icon-ledger.svg';
import { Modal } from 'shared/components/Modal/Modal';
import { ModalTitle } from 'shared/components/Modal/ModalTitle';
import { ModalIcon } from 'shared/components/Modal/ModalIcon';
import { ModalText } from 'shared/components/Modal/ModalText';
import { Buttons } from 'shared/components/Modal/ModalButtons';

const IconLedger = styled(SvgLedger)`
  width: 20px;
  height: 20px;
  fill: ${props => props.theme.color.yellow};
`;
const Button = styled.button`
  font-size: 20px;
  font-weight: 500;
  padding: 18px 20px;
  margin: 0 30px 0 0;
  display: inline-block;
  line-height: 20px;
  border: 2px solid ${props => props.theme.color.blue};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s;
  background: ${props => props.theme.color.blue};
  color: #fff;

  &:hover {
    background: ${props => props.theme.color.yellow};
    border-color: ${props => props.theme.color.yellow};
    color: ${props => props.theme.color.blue};
  }
`;

const LedgerModal = ({ title, text, onClick }) => {
  return (
    <Modal textAlign="center">
      <ModalIcon>
        <IconLedger />
      </ModalIcon>
      <ModalTitle>{title}</ModalTitle>
      <ModalText>{text}</ModalText>
      <Buttons textAlign="center">
        <Button onClick={onClick}>OK</Button>
      </Buttons>
    </Modal>
  );
};

export default LedgerModal;
