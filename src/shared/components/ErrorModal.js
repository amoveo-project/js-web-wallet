import React from 'react';
import styled from 'styled-components';

import { ReactComponent as SvgError } from 'shared/assets/icon-stop.svg';

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  appearance: none;

  z-index: 999;

  @supports (
    (-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))
  ) {
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
  }
`;
const Modal = styled.div`
  width: 100%;
  max-width: 570px;
  background: ${props => props.theme.color.yellow};
  color: ${props => props.theme.color.blue};
  padding: 90px 30px 30px 30px;
  border-radius: 10px;
  position: relative;
  text-align: center;
`;
const ModalIcon = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  padding: 20px;
  margin-left: -30px;
  background: ${props => props.theme.color.blue};
  border-radius: 0 0 30px 30px;
`;
const IconError = styled(SvgError)`
  width: 20px;
  height: 20px;
  fill: ${props => props.theme.color.yellow};
`;
const ModalTitle = styled.div`
  font-size: 40px;
  margin: 0 0 10px 0;
  font-weight: 300;
`;
const ModalText = styled.div`
  font-size: 20px;
  margin: 0 0 30px 0;
  font-weight: 300;
`;
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
const Buttons = styled.div`
  width: 100%;
  text-align: left;
  margin: 30px 0 0 0;
  text-align: center;
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

const ErrorModal = () => {
  return (
    <ModalWrap>
      <Modal>
        <ModalIcon>
          <IconError />
        </ModalIcon>
        <ModalTitle>An error has occurred</ModalTitle>
        <ModalText>Unfortunately we can't do anything about it</ModalText>
        <Buttons>
          <Button>Optional button</Button>
          <PrimaryButton>Primary button</PrimaryButton>
        </Buttons>
      </Modal>
    </ModalWrap>
  );
};

export default ErrorModal;
