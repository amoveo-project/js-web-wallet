import React from 'react';
import styled from 'styled-components';
import { Modal } from 'shared/components/Modal/Modal';
import { ModalTitle } from 'shared/components/Modal/ModalTitle';
import { ModalIcon } from 'shared/components/Modal/ModalIcon';
import { ModalText } from 'shared/components/Modal/ModalText';
import { Buttons } from 'shared/components/Modal/ModalButtons';

import { ReactComponent as SvgError } from 'shared/assets/icon-stop.svg';

const IconError = styled(SvgError)`
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
  background: ${props => props.theme.color.yellow};
  color: ${props => props.theme.color.blue};

  &:hover {
    background: #fff;
    border-color: #fff;
    color: ${props => props.theme.color.blue};
  }
`;
const PrimaryButton = styled(Button)`
  background: ${props => props.theme.color.blue};
  color: #fff;
`;

const ErrorModal = ({ text, onClick }) => {
  return (
    <Modal bgColor="yellow" textAlign="center">
      <ModalIcon>
        <IconError />
      </ModalIcon>
      <ModalTitle>An error has occurred</ModalTitle>
      <ModalText>{text}</ModalText>
      <Buttons textAlign="center">
        {/*<Button bgColor="yellow" color="blue">Optional button</Button>*/}
        <PrimaryButton onClick={onClick}>Ok</PrimaryButton>
      </Buttons>
    </Modal>
  );
};

export default ErrorModal;
