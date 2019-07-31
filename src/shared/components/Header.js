import React, { Fragment, useContext, useState } from 'react';
import { Link } from '@reach/router';
import styled, { css } from 'styled-components';
import Device from 'device';

import PartialNavLink from 'shared/components/PartialNavLink';
import ExternalLink from 'shared/components/ExternalLink';

import { downloadFile } from 'shared/utils/browser';

import { ReactComponent as LogoIcon } from 'shared/assets/logo.svg';
import { ReactComponent as SvgTelegram } from 'shared/assets/icon-telegram.svg';
import { ReactComponent as SvgGear } from 'shared/assets/icon-gear.svg';
import { ReactComponent as SvgClose } from 'shared/assets/icon-close.svg';

import AppContext from 'shared/contexts/AppContext';

import {
  DOWNLOAD_PASSPHRASE,
  DOWNLOAD_PRIVATE_KEY,
} from 'shared/constants/actions';

const HeaderSection = styled.section`
  width: 100%;
  padding: 15px 0;
  position: relative;
  z-index: 3;
`;
const Container = styled.div`
  width: 100%;
  max-width: 1230px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${Device.laptopM} {
    padding: 0 50px;
  }
  @media ${Device.laptopL} {
    padding: 0 20px;
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
const Close = styled(SvgClose)`
  width: 40px;
  height: 40px;
  padding: 10px;
  fill: #fff;
  position: absolute;
  top: 30px;
  right: 20px;
  z-index: 4;
  transform: scale(1);
  transition: all 0.4s;
  cursor: pointer;

  &:active {
    transform: scale(0.5);
  }

  @media ${Device.tablet} {
    display: none;
  }
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.color.blue};
  transform: translateX(-100%);
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  transition: all 0.4s;
  padding: 30px 20px;

  &.active {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }

  @media ${Device.tablet} {
    display: flex;
    flex-direction: row;
    position: static;
    background: none;
    padding: 0;
    opacity: 1;
    transform: translateX(0);
    visibility: visible;
  }
`;
const MenuHamburger = styled.div`
  display: flex;
  width: 16px;
  height: 14px;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;

  @media ${Device.tablet} {
    display: none;
  }

  span {
    display: inline-block;
    width: 100%;
    height: 2px;
    background: #fff;
  }
`;
const MainNav = styled.nav`
  display: inline-block;
  vertical-align: top;
`;

const menuItemCss = css`
  font-size: 18px;
  transition: all 0.4s;
  font-weight: 500;
  float: left;
  margin: 0;
  padding: 5px 0;
  color: #fff;
  text-decoration: none;
  position: relative;
  line-height: 30px;
  width: 100%;

  @media ${Device.tablet} {
    font-size: 16px;
    width: auto;
    opacity: 0.5;
    padding: 0;
    margin: 0 30px 0 0;
  }

  &.mobileonly {
    @media ${Device.tablet} {
      display: none;
    }
  }
  &.separate {
    margin-top: 40px;

    @media ${Device.tablet} {
      margin-top: 0;
    }
  }

  &.active {
    opacity: 1;
    color: ${props => props.theme.color.yellow};

    @media ${Device.tablet} {
      color: #fff;
    }

    &:after {
      @media ${Device.tablet} {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: -15px;
        height: 2px;
        background: ${props => props.theme.color.yellow};
      }
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
const MenuItem = styled(PartialNavLink)`
  ${menuItemCss}
`;
const MenuItemExternal = styled(ExternalLink)`
  ${menuItemCss}
  display: inline-flex;
  align-items: center;

  @media ${Device.tablet} {
    flex-direction: row-reverse;
  }
`;
const SupportLink = styled.a`
  font-size: 18px;
  transition: all 0.4s;
  font-weight: 500;
  float: left;
  margin: 0;
  padding: 5px 0;
  color: #fff;
  text-decoration: none;
  position: relative;
  line-height: 30px;
  width: 100%;

  &.mobileonly {
    @media ${Device.tablet} {
      display: none;
    }
  }

  @media ${Device.tablet} {
    font-size: 16px;
    width: auto;
    opacity: 0.5;
    padding: 0;
    margin: 0 30px 0 0;
  }
`;
const IconTelegram = styled(SvgTelegram)`
  width: 23px;
  height: 20px;
  fill: currentColor;
  margin: 0 0 0 10px;

  @media ${Device.tablet} {
    margin: 0 10px 0 0;
  }
`;
const IconGear = styled(SvgGear)`
  width: 20px;
  height: 20px;
  margin: 0;
  margin: 0;
  fill: currentColor;
  display: none;

  @media ${Device.tablet} {
    display: inline-block;
  }
`;
const UserMenu = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 40px;

  @media ${Device.tablet} {
    width: auto;
    margin-top: 0;
    flex-direction: row;
    justify-content: flex-end;
  }
`;
const Settings = styled.div`
  display: inline-block;
  position: relative;

  &:after {
    @media ${Device.tablet} {
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
  padding: 5px 0;
  color: #fff;
  cursor: pointer;
  transition: all 0.4s;
  opacity: 1;

  @media ${Device.tablet} {
    opacity: 0.5;
    width: 30px;
    height: 30px;
    padding: 5px;
  }
  &:hover {
    @media ${Device.tablet} {
      opacity: 1;
      transform: rotate(90deg);
    }
  }

  span {
    font-weight: 500;
    font-size: 18px;

    @media ${Device.tablet} {
      display: none;
    }
  }
`;
const SettingsDropdownItem = styled.div`
  display: block;
  font-size: 18px;
  font-weight: 500;
  line-height: 18px;
  padding: 10px 0;
  color: ${props => props.theme.color.blue};
  text-decoration: none;
  position: relative;

  @media ${Device.tablet} {
    font-size: 16px;
    font-weight: 300;
  }

  &.active {
    font-weight: 600;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: -26px;
      width: 8px;
      height: 8px;
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
  left: 0;
  opacity: 0;
  padding: 20px;
  visibility: hidden;
  width: 100%;
  background: #fff;
  z-index: 99;
  transition: all 0.4s 0.2s;
  transform-origin: top center;
  transform: scaleY(0);

  @media ${Device.tablet} {
    width: 240px;
    right: 5px;
    left: auto;
  }

  &:after {
    content: '';
    position: absolute;
    top: -2px;
    left: 0;
    height: 2px;
    width: 20px;
    background: ${props => props.theme.color.yellow};

    @media ${Device.tablet} {
      right: 0;
      left: auto;
    }
  }
`;
const LogOut = styled(Link)`
  opacity: 0.5;
  font-weight: 500;
  font-size: 18px;
  display: inline-block;
  line-height: 30px;
  margin: 0;
  color: #fff;
  text-decoration: none;
  transition: all 0.4s;

  &:hover {
    opacity: 1;
  }

  @media ${Device.tablet} {
    margin: 0 0 0 25px;
    font-size: 16px;
  }
`;

const Header = () => {
  const {
    isHardware,
    isWalletCreated,
    passphrase,
    setUnusedActions,
    unusedActions,
    veo,
  } = useContext(AppContext);

  const [isOpened, setIsOpened] = useState(false);

  const handleToggleMenu = () => {
    setIsOpened(isOpened === false ? true : false);
  };

  const downloadPassphrase = () => {
    downloadFile(passphrase, 'passphrase', 'text/plain');

    setUnusedActions(unusedActions =>
      unusedActions.filter(item => item !== DOWNLOAD_PASSPHRASE),
    );
  };

  const downloadPrivateKey = () => {
    const keyPair = veo.keys.getKeyPair();

    downloadFile(keyPair.private, 'key', 'text/plain');

    setUnusedActions(unusedActions =>
      unusedActions.filter(item => item !== DOWNLOAD_PRIVATE_KEY),
    );
  };

  const isSettingsAvailable = !isHardware;

  return (
    <Fragment>
      <HeaderSection>
        <Container>
          <LogoLink to={isWalletCreated ? '/dashboard/' : '/'}>
            <Logo />
          </LogoLink>
          <Menu className={isOpened ? 'active' : ''}>
            <MainNav>
              <MenuItem to="/dashboard/">Dashboard</MenuItem>
              <MenuItem to="/send/">Send</MenuItem>
              <MenuItem to="/receive/">Receive</MenuItem>
              <MenuItemExternal to="http://tlg.name/ExchangeAmoveo_bot">
                Exchange
                <IconTelegram />
              </MenuItemExternal>
              <MenuItem to="/faq" className="mobileonly separate">
                Faq
              </MenuItem>
              <MenuItem to="/download" className="mobileonly">
                Download
              </MenuItem>
              <SupportLink
                href="https://tlg.name/amoveo_wallet"
                target="_blank"
                rel="noopener noreferrer"
                className="mobileonly"
              >
                Support
              </SupportLink>
            </MainNav>
            <UserMenu>
              {isSettingsAvailable ? (
                <Settings
                  className={unusedActions.length > 0 ? 'notice' : null}
                >
                  <SettingsToggle>
                    <IconGear className="gear" />
                    <span>Settings</span>
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
              ) : null}
              <LogOut to="/logout">Log out</LogOut>
            </UserMenu>
            <Close onClick={handleToggleMenu} />
          </Menu>
          <MenuHamburger onClick={handleToggleMenu}>
            <span />
            <span />
            <span />
          </MenuHamburger>
        </Container>
      </HeaderSection>
    </Fragment>
  );
};

export default Header;
