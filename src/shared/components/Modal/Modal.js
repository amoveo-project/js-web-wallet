import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import Device from 'device';

const node = document.getElementById('modal');

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
  appearance: none;

  z-index: 999;

  @media ${Device.laptop} {
    padding: 0;
  }

  @supports (
    (-webkit-backdrop-filter: blur(1px)) or (backdrop-filter: blur(1px))
  ) {
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
  }
`;

const MainModalWindow = styled.div`
  width: 100%;
  max-width: 570px;
  background: ${props => props.theme.color[props.bgColor] || '#fff'};
  color: ${props => props.theme.color.blue};
  padding: ${props => props.padding || '90px 30px 30px 30px'};
  border-radius: 5px;
  text-align: ${props => props.textAlign || 'left'};
  position: relative;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.15);

  @media ${Device.laptop} {
    border-radius: 10px;
  }
`;

export function Modal({ bgColor, padding, textAlign, children }) {
  return createPortal(
    <ModalWrap>
      <MainModalWindow
        bgColor={bgColor}
        padding={padding}
        textAlign={textAlign}
      >
        {children}
      </MainModalWindow>
    </ModalWrap>,
    node,
  );
}
