import React from 'react';
import styled from 'styled-components';
import { Modal } from 'shared/components/Modal/Modal';
import { ModalText } from 'shared/components/Modal/ModalText';
import { Buttons } from 'shared/components/Modal/ModalButtons';

const ModalForm = styled.form`
  margin: 0;
  padding: 0;
`;
const ModalInput = styled.input`
  padding: 20px 0;
  line-height: 20px;
  margin: 0;
  border: 0;
  border-bottom: 2px solid #c2c2c8;
  font-size: 20px;
  width: 100%;
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

const PasswordModal = () => {
  return (
    <Modal padding="30px">
      <ModalText size="40px">Wallet password</ModalText>
      <ModalForm>
        <ModalInput placeholder="Enter wallet password" />
        <Buttons>
          <Button>Cancel</Button>
          <PrimaryButton>Submits</PrimaryButton>
        </Buttons>
      </ModalForm>
    </Modal>
  );
};

export default PasswordModal;
