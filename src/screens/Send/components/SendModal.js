import React from 'react';
import styled from 'styled-components';
import { Modal } from 'shared/components/Modal/Modal';
import { ModalIcon } from 'shared/components/Modal/ModalIcon';
import { ModalText } from 'shared/components/Modal/ModalText';
import { Buttons } from 'shared/components/Modal/ModalButtons';

import { ReactComponent as SvgSend } from 'shared/assets/icon-send.svg';

const IconSend = styled(SvgSend)`
  width: 20px;
  height: 20px;
  fill: ${props => props.theme.color.yellow};
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
    <Modal textAlign="center">
      <ModalIcon>
        <IconSend />
      </ModalIcon>
      <ModalText>Transaction has been sent</ModalText>
      <Buttons textAlign="center">
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
  );
};

export default SendModal;
