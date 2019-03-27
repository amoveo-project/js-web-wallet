import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'shared/components/Modal/Modal';
import { ModalText } from 'shared/components/Modal/ModalText';
import { Buttons } from 'shared/components/Modal/ModalButtons';
import Device from 'device';

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
  font-size: 18px;
  font-weight: 500;
  padding: 18px 20px;
  margin: 0 15px 15px 0;
  display: inline-block;
  line-height: 20px;
  border: 2px solid ${props => props.theme.color.blue};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.4s;
  background: #fff;
  color: #000;

  @media ${Device.laptop} {
    margin: 0 15px 0 0;
    font-size: 20px;
    border-radius: 10px;
  }

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
const ErrorText = styled.div`
  margin-top: 20px;
  color: #220000;
`;

const RecoverPasswordModal = ({ navigate, walletId }) => {
  const { setModal, recoverWallet } = useContext(AppContext);

  const [error, setError] = useState('');
  const [password, setPassword] = useState('');

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleCancel() {
    setModal(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await recoverWallet({
        walletId,
        password,
      });
      setModal(null);
      navigate('/dashboard/');
    } catch (e) {
      setError(
        "Can't open this wallet. Looks like the wrong password was entered.",
      );
    }
  }

  return (
    <Modal padding="30px">
      <ModalText size="40px">Wallet password</ModalText>
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
            Cancel
          </Button>
          <PrimaryButton>Submit</PrimaryButton>
        </Buttons>
        <ErrorText>{error}</ErrorText>
      </ModalForm>
    </Modal>
  );
};

export default RecoverPasswordModal;
