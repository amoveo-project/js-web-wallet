import React, { Fragment, useContext } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import Device from 'device';

import PartialNavLink from 'shared/components/PartialNavLink';

import { downloadFile } from 'shared/utils/browser';

import { ReactComponent as LogoIcon } from 'shared/assets/logo.svg';
import { ReactComponent as SvgGear } from 'shared/assets/icon-gear.svg';

import AppContext from 'shared/contexts/AppContext';

import {
  DOWNLOAD_PASSPHRASE,
  DOWNLOAD_PRIVATE_KEY,
} from 'shared/constants/actions';

const HeaderSection = styled.section`
  width: 100%;
  padding: 15px 0;
  position: relative;
  z-index: 2;
`;
const Container = styled.div`
  width: 100%;
  max-width: 1230px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${Device.laptopM} {
    padding: 0 50px;
  }
  @media ${Device.laptopL} {
    padding: 0 15px;
  }
`;
const LogoLink = styled(Link)`
  margin: 0 60px 0 0;
  display: inline-block;
  float: left;
`;
const Logo = styled(LogoIcon)`
  width: 98px;
  height: 30px;
  vertical-align: top;
`;
const Menu = styled.nav`
  display: inline-block;
  vertical-align: top;
`;
const MenuItem = styled(PartialNavLink)`
  font-size: 16px;
  opacity: 0.5;
  transition: all 0.4s;
  font-weight: 500;
  float: left;
  margin: 0 30px 0 0;
  color: #fff;
  text-decoration: none;
  position: relative;
  line-height: 30px;

  &.active {
    opacity: 1;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -15px;
      height: 2px;
      background: ${props => props.theme.color.yellow};
    }
  }
  &:hover {
    opacity: 1;
  }
  &[disabled] {
    opacity: 0.15;
    pointer-events: none;
  }
`;
const HeaderLink = styled(Link)`
  color: #5d8ab8;
`;
const IconGear = styled(SvgGear)`
  width: 20px;
  height: 20px;
  margin: 0;
  margin: 0;
  fill: currentColor;
`;
const UserMenu = styled.div``;
const Settings = styled.div`
  display: inline-block;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    background: ${props => props.theme.color.yellow};
    border-radius: 4px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s;
    transform: translateY(-10px);
  }

  &.notice {
    &:after {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
  &:hover {
    .settingsdropdown {
      opacity: 1;
      visibility: visible;
      transform: scaleY(1);
    }
  }
`;
const SettingsToggle = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  padding: 5px;
  color: #fff;
  cursor: pointer;
  transition: all 0.4s;
  opacity: 0.5;

  &:hover {
    opacity: 1;
    transform: rotate(90deg);
  }
`;
const SettingsDropdownItem = styled.div`
  display: block;
  font-size: 16px;
  font-weight: 300;
  line-height: 18px;
  padding: 10px 0;
  color: ${props => props.theme.color.blue};
  text-decoration: none;
  position: relative;

  &.active {
    font-weight: 600;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: -26px;
      width: 10px;
      height: 10px;
      border-radius: 10px;
      background: ${props => props.theme.color.yellow};
      border: solid 2px ${props => props.theme.color.blue};
      transform: translateY(-50%);
    }
  }

  &:hover {
    cursor: pointer;
  }
`;
const SettingsDropdown = styled.div`
  position: absolute;
  top: 45px;
  right: 5px;
  opacity: 0;
  padding: 20px;
  visibility: hidden;
  width: 240px;
  background: #fff;
  z-index: 99;
  transition: all 0.4s 0.2s;
  transform-origin: top center;
  transform: scaleY(0);

  &:after {
    content: '';
    position: absolute;
    top: -2px;
    right: 0;
    height: 2px;
    width: 20px;
    background: ${props => props.theme.color.yellow};
  }
`;
const LogOut = styled(Link)`
  opacity: 0.5;
  font-weight: 500;
  font-size: 16px;
  display: inline-block;
  line-height: 30px;
  margin: 0 0 0 25px;
  color: #fff;
  text-decoration: none;
  transition: all 0.4s;

  &:hover {
    opacity: 1;
  }
`;

const Header = () => {
  const {
    isWalletCreated,
    keys,
    passphrase,
    setUnusedActions,
    unusedActions,
  } = useContext(AppContext);

  const downloadPassphrase = () => {
    downloadFile(passphrase, 'passphrase', 'text/plain');

    setUnusedActions(unusedActions =>
      unusedActions.filter(item => item !== DOWNLOAD_PASSPHRASE),
    );
  };

  const downloadPrivateKey = () => {
    downloadFile(keys.private, 'key', 'text/plain');

    setUnusedActions(unusedActions =>
      unusedActions.filter(item => item !== DOWNLOAD_PRIVATE_KEY),
    );
  };

  return (
    <Fragment>
      <HeaderSection>
        <Container>
          <div>
            <LogoLink to={isWalletCreated ? '/dashboard/' : '/'}>
              <Logo />
            </LogoLink>
            <Menu>
              <MenuItem to="/dashboard/">Dashboard</MenuItem>
              <MenuItem to="/send/">Send</MenuItem>
              <MenuItem to="/receive/">Receive</MenuItem>
              <MenuItem to="/exchange/" disabled>
                Exchange
              </MenuItem>
            </Menu>
          </div>
          <UserMenu>
            <Settings className={unusedActions.length > 0 ? 'notice' : null}>
              <SettingsToggle>
                <IconGear className="gear" />
              </SettingsToggle>
              <SettingsDropdown className="settingsdropdown">
                <SettingsDropdownItem
                  onClick={downloadPrivateKey}
                  className={
                    unusedActions.length > 0 &&
                    unusedActions.includes(DOWNLOAD_PRIVATE_KEY)
                      ? 'active'
                      : null
                  }
                >
                  Download private key
                </SettingsDropdownItem>
                {passphrase ? (
                  <SettingsDropdownItem
                    onClick={downloadPassphrase}
                    className={
                      unusedActions.length > 0 &&
                      unusedActions.includes(DOWNLOAD_PASSPHRASE)
                        ? 'active'
                        : null
                    }
                  >
                    Download passphrase file
                  </SettingsDropdownItem>
                ) : null}
              </SettingsDropdown>
            </Settings>
            <LogOut to="/">Log out</LogOut>
          </UserMenu>
        </Container>
      </HeaderSection>
    </Fragment>
  );
};

export default Header;
