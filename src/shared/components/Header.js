import React, { Fragment } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';

import { ReactComponent as LogoIcon } from 'shared/assets/logo.svg';
import { ReactComponent as SvgGear } from 'shared/assets/icon-gear.svg';

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
const MenuItem = styled(Link)`
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
const SettingsDropdownItem = styled(Link)`
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

const Header = ({ children }) => {
  return (
    <Fragment>
      <HeaderSection>
        <Container>
          <div>
            <LogoLink to="/">
              <Logo />
            </LogoLink>
            <Menu>
              <MenuItem to="/dashboard" className="active">
                Dashboard
              </MenuItem>
              <MenuItem to="/send">Send</MenuItem>
              <MenuItem to="/receive">Receive</MenuItem>
              <MenuItem to="/exchange" disabled>
                Exchange
              </MenuItem>
            </Menu>
          </div>
          <UserMenu>
            <Settings className="notice">
              <SettingsToggle>
                <IconGear className="gear" />
              </SettingsToggle>
              <SettingsDropdown className="settingsdropdown">
                <SettingsDropdownItem to="/">
                  Review private key
                </SettingsDropdownItem>
                <SettingsDropdownItem to="/">
                  Account details
                </SettingsDropdownItem>
                <SettingsDropdownItem to="/" className="active">
                  Download passphrase file
                </SettingsDropdownItem>
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