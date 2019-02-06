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
const ModalText = styled.div`
  font-size: 20px;
  margin: 0 0 30px 0;
  font-weight: 300;
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

const SendModal = ({ transaction, onHide }) => {
  return (
    <ModalWrap>
      <Modal>
        <ModalIcon>
          <IconSend />
        </ModalIcon>
        <ModalText>Transaction has been sent</ModalText>
        <Buttons>
          <Ok onClick={onHide}>OK, thanks</Ok>
          <a
            href={`https://explorer.veopool.pw/?input=${encodeURIComponent(
              transaction.hash,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InBlockchain>View in blockchain</InBlockchain>
          </a>
        </Buttons>
      </Modal>
    </ModalWrap>
  );
};

export default SendModal;
