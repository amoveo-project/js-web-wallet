import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';
import Device from 'device';

import RestoreContext from 'shared/contexts/RestoreContext';

import { PRIVATE_KEY_LENGTH } from '../constants/keys';

const Title = styled.h1`
  font-size: 30px;
  margin: 0 0 20px 0;

  @media ${Device.laptopM} {
    font-size: 40px;
    margin: 0 0 40px 0;
  }

  span {
    color: ${props => props.theme.color.yellow};
    cursor: pointer;

    &.active {
      position: relative;
      cursor: default;
      text-decoration: underline;

      @media ${Device.laptop} {
        text-decoration: none;
      }

      &:after {
        @media ${Device.laptop} {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -8px;
          height: 4px;
          background: ${props => props.theme.color.yellow};
        }
      }
    }
  }
`;
const TabName = styled.span`
  &.active {
  }
`;
const PassPhraseLabel = styled.label`
  display: inline-block;
  font-size: 16px;
  opacity: 0.5;
  margin: 0 0 20px 0;
`;
const PassPhraseArea = styled.textarea`
  font-family: 'OCRAExtended', sans-serif;
  font-weight: normal;
  font-size: 20px;
  line-height: 30px;
  width: 100%;
  min-height: 150px;
  background: rgba(0, 0, 0, 0.15);
  border: none;
  border-radius: 10px;
  color: #fff;
  padding: 75px 30px;
  text-align: center;
  resize: none;

  &::placeholder {
    color: #fff;
    opacity: 0.3;
  }
`;
const PrivateKey = styled.input`
  font-family: 'OCRAExtended', sans-serif;
  font-weight: normal;
  font-size: 20px;
  line-height: 20px;
  width: 100%;
  background: none;
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 20px 20px 20px 0;
  text-align: left;
  transition: all 0.4s;

  &::placeholder {
    color: #fff;
    opacity: 0.3;
  }
  &:focus,
  &:hover {
    border-color: #fff;
  }
`;
const PrivateKeyLabel = styled(PassPhraseLabel)`
  margin: 0;
`;
const LoadKey = styled.div`
  display: inline-block;
  border: 2px solid ${props => props.theme.color.yellow};
  color: ${props => props.theme.color.yellow};
  padding: 18px 30px;
  margin: 40px 0 0 0;
  line-height: 20px;
  border-radius: 10px;
  font-size: 20px;
  background: none;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    background: ${props => props.theme.color.yellow};
    color: ${props => props.theme.color.blue};
  }

  svg {
    fill: currentColor;
    width: 20px;
    height: 20px;
    float: left;
    margin: 0 20px 0 0;
  }
  span {
    font-weight: 500;
  }

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const LoadKeyInput = styled.input`
  position: fixed;
  top: -1000px;
  opacity: 0;
`;

const Restore = () => {
  const {
    currentTab,
    handleKeyLoading,
    handlePassphraseInput,
    handlePrivateKeyInput,
    handleTabChange,
    tempPassphrase,
    tempPrivateKey,
  } = useContext(RestoreContext);

  const isPassphraseTab = currentTab === 'passphrase';
  const isPrivateKeyTab = currentTab === 'privateKey';

  return (
    <Fragment>
      <Title>
        Restore with{' '}
        <TabName
          className={`${isPassphraseTab ? 'active' : ''}`}
          onClick={() => handleTabChange('passphrase')}
        >
          passphrase
        </TabName>{' '}
        or{' '}
        <TabName
          className={`${isPrivateKeyTab ? 'active' : ''}`}
          onClick={() => handleTabChange('privateKey')}
        >
          private key
        </TabName>
      </Title>
      {isPassphraseTab ? (
        <Fragment>
          <PassPhraseLabel htmlFor="passphrase">
            Your passphrase
          </PassPhraseLabel>
          <PassPhraseArea
            autoFocus
            id="passphrase"
            placeholder="Enter or paste your passphrase"
            rows="1"
            value={tempPassphrase}
            onChange={handlePassphraseInput}
          />
        </Fragment>
      ) : (
        <Fragment>
          <PrivateKeyLabel htmlFor="privatekey">
            Private key ({PRIVATE_KEY_LENGTH} symbols)
          </PrivateKeyLabel>
          <PrivateKey
            id="privatekey"
            placeholder="Enter or paste your private key"
            autoComplete="off"
            value={tempPrivateKey}
            onChange={handlePrivateKeyInput}
          />
          <label htmlFor="privatekeyInput">
            <LoadKey>Load key from file</LoadKey>
          </label>
          <LoadKeyInput
            id="privatekeyInput"
            type="file"
            onChange={handleKeyLoading}
            accept="text/*"
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Restore;
