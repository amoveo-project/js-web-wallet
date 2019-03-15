import React from 'react';
import styled from 'styled-components';

import { Modal } from 'shared/components/Modal/Modal';
import { ModalText } from 'shared/components/Modal/ModalText';
import { ModalTitle } from 'shared/components/Modal/ModalTitle';
import { Buttons } from 'shared/components/Modal/ModalButtons';

const ModalForm = styled.form`
  margin: 0;
  padding: 0;
`;
const Button = styled.button`
  font-size: 20px;
  font-weight: 500;
  padding: 18px 20px;
  margin: 0 15px;
  display: inline-block;
  line-height: 20px;
  border: 2px solid ${props => props.theme.color.blue};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s;
  background: #fff;
  color: #000;

  &:hover {
    background: ${props => props.theme.color.yellow};
    border-color: ${props => props.theme.color.yellow};
    color: ${props => props.theme.color.blue};
  }
`;
const PrimaryButton = styled(Button)`
  background: ${props => props.theme.color.blue};
  color: #fff;
`;

const RecoverPasswordModal = ({ onCancel, onSubmit, text, title }) => {
  return (
    <Modal textAlign="center">
      <ModalTitle>{title}</ModalTitle>
      <ModalText>{text}</ModalText>
      <ModalForm
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Buttons textAlign="center">
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
          <PrimaryButton>Ok</PrimaryButton>
        </Buttons>
      </ModalForm>
    </Modal>
  );
};

export default RecoverPasswordModal;
