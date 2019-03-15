import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'shared/components/Modal/Modal';
import { ModalText } from 'shared/components/Modal/ModalText';
import { Buttons } from 'shared/components/Modal/ModalButtons';

import AppContext from 'shared/contexts/AppContext';

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

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const SetPasswordModal = () => {
  const { setModal, storeWallet } = useContext(AppContext);

  const [password, setPassword] = useState('');

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleCancel() {
    storeWallet({
      password: '',
    });
    setModal(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    storeWallet({
      password,
    });
    setModal(null);
  }

  return (
    <Modal padding="30px">
      <ModalText size="40px">Set wallet password</ModalText>
      <ModalForm onSubmit={handleSubmit}>
        <ModalInput
          placeholder="Enter wallet password"
          onChange={handlePasswordChange}
          type="password"
          value={password}
          autoFocus
        />
        <Buttons>
          <Button type="button" onClick={handleCancel}>
            Cancel (insecure!)
          </Button>
          <PrimaryButton disabled={password.length < 4}>
            Set password
          </PrimaryButton>
        </Buttons>
      </ModalForm>
    </Modal>
  );
};

export default SetPasswordModal;
