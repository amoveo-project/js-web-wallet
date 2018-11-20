import React, { Fragment, useContext } from 'react';
import styled from 'styled-components';
import Device from 'device';

import RestoreContext from 'shared/contexts/RestoreContext';

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
  }
  .active {
    text-decoration: underline;
    cursor: default;
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
  min-height: 240px;
  background: rgba(0, 0, 0, 0.15);
  border: none;
  border-radius: 10px;
  color: #fff;
  padding: 50px;
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

  &::placeholder {
    color: #fff;
    opacity: 0.3;
  }
`;
const PrivateKeyLabel = styled(PassPhraseLabel)`
  margin: 0;
`;
const MainWrap = styled.div`
  width: 100%;
  flex: 1;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: warp;
  background: red;
`;

const Restore = () => {
  const {
    currentTab,
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
            Private key (64 symbols)
          </PrivateKeyLabel>
          <PrivateKey
            id="privatekey"
            placeholder="Enter or paste your private key"
            value={tempPrivateKey}
            onChange={handlePrivateKeyInput}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Restore;
