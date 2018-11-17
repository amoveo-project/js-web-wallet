import React from 'react';
import styled from 'styled-components';

import { ReactComponent as SvgSend } from 'shared/assets/icon-send.svg';

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
  background: #fff;
  color: ${props => props.theme.color.blue};
  padding: 90px 30px 30px 30px;
  border-radius: 10px;
  text-align: center;
  position: relative;
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
const IconSend = styled(SvgSend)`
  width: 20px;
  height: 20px;
  fill: ${props => props.theme.color.yellow};
`;
const SendValue = styled.div`
  font-size: 40px;
  margin: 0 0 10px 0;
  font-weight: 300;

  span {
    font-size: 20px;
    vertical-align: baseline;
  }
`;
const ModalText = styled.div`
  font-size: 20px;
  margin: 0 0 30px 0;
  font-weight: 300;
`;
const SendToAdress = styled.div`
  font-size: 16px;
  margin: 0 0 10px 0;
  opacity: 0.5;
  word-break: break-all;
  line-height: 1.5;
`;
const Buttons = styled.div`
  width: 100%;
  text-align: center;
  margin: 30px 0 0 0;
`;
const Ok = styled.button`
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

  &:hover {
    background: ${props => props.theme.color.yellow};
    border-color: ${props => props.theme.color.yellow};
    color: ${props => props.theme.color.blue};
  }
`;
const InBlockchain = styled(Ok)`
  background: ${props => props.theme.color.blue};
  color: #fff;
`;

const SendModal = () => {
  return (
    <ModalWrap>
      <Modal>
        <ModalIcon>
          <IconSend />
        </ModalIcon>
        <SendValue>
          20
          <span>.00879345</span> VEO
        </SendValue>
        <ModalText>has been sent to</ModalText>
        <SendToAdress>
          49pn7NpkLncRLmqJSP6E3th14GuedWvHs7C2UEV9LGfkVTTtpmJ3JAgVQu5LLDcLV73Z5Nxx5okMnAN6nJdJuNdLENtx7i6
        </SendToAdress>
        <Buttons>
          <Ok>OK, thanks</Ok>
          <InBlockchain to="/">See in blockchain</InBlockchain>
        </Buttons>
      </Modal>
    </ModalWrap>
  );
};

export default SendModal;
