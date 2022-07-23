import React from 'react';
import { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { userLogout, updateSavedRecipes } from '../store/reducers/userReducer';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import LogInForm from './LoginForm';
import API from '../utils/API';
import theme from '../theme.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import useWindowSize from '../hooks/useWindowSize.js';
import useTouchOutside from '../hooks/useTouchOutside.js';

const StyledLink = styled(NavLink)`
  width: 11%;
  min-width: 90px;
  font-size: 1.2rem;
  padding: 10px;
  padding-top: 5px;
  @media only screen and (min-width: 1280px) {
    min-width: 170px;
    font-size: 2.5rem;
    padding-top: 10px;
  }
  text-align: center;

  position: relative;
  color: ${theme.colors.primary.default};
  transition: color 0.3s ease-in-out;
  margin-left: 5px;

  &:hover {
    color: ${theme.colors.whiteSpace};

    .child {
      top: 0;
    }
  }

  &.active {
    color: ${theme.colors.whiteSpace};
    .child {
      background: ${theme.colors.primary.default};
      top: 0;
    }
  }
`;

const StyledLinkDropdown = styled(NavLink)`
  width: 100%;
  padding: 15px;
  display: block;

  color: ${theme.colors.primary.default};
  background: ${theme.colors.whiteSpace};
  &:hover {
    color: ${theme.colors.whiteSpace};
    background: ${theme.colors.primary.faded};
  }
  &.active {
    color: ${theme.colors.whiteSpace};
    background: ${theme.colors.primary.default};
  }
`;

const LinkTabAnim = styled.div`
  position: absolute;
  background: ${theme.colors.primary.faded};
  border-radius: 5px 5px 0px 0px;
  z-index: -1;
  top: 100%;
  right: 0;
  left: 0;
  bottom: 0;
  transition: top 0.3s ease-in-out;
`;

const StyledDropdownTab = styled(DropdownTab)`
  min-width: 60px;
  @media only screen and (min-width: 570px) {
    width: 11%;
    min-width: 90px;
  }
  font-size: 1.2rem;
  padding: 10px;
  padding-top: 5px;
  @media only screen and (min-width: 1280px) {
    min-width: 170px;
    font-size: 2.5rem;
    padding-top: 10px;
  }
  text-align: center;

  position: relative;
  color: ${theme.colors.primary.default};
  transition: color 0.3s ease-in-out;
  margin-left: 5px;
  user-select: none;
  cursor: pointer;

  &.mobile-active {
    color: #fff;

    .child {
      top: 0;
    }
  }

  &:hover {
    color: #fff;

    .child {
      top: 0;
    }
  }

  &.log-in:focus-within {
    color: #fff;

    .child {
      top: 0;
    }
  }

  position: relative;
`;

const StyledTab = styled.div`
  min-width: 60px;
  @media only screen and (min-width: 570px) {
    width: 11%;
    min-width: 90px;
  }
  font-size: 1.2rem;
  padding: 10px;
  padding-top: 5px;
  @media only screen and (min-width: 1280px) {
    min-width: 170px;
    font-size: 2.5rem;
    padding-top: 10px;
  }
  text-align: center;

  position: relative;
  color: ${theme.colors.primary.default};
  transition: color 0.3s ease-in-out;
  margin-left: 5px;
  user-select: none;
  cursor: pointer;

  &:hover {
    color: #fff;

    .child {
      top: 0;
    }
  }
`;

const StyledText = styled.div`
  width: 11%;
  min-width: 90px;
  font-size: 1.2rem;
  padding: 5px;
  @media only screen and (min-width: 1280px) {
    min-width: 170px;
    font-size: 2.5rem;
    padding: 10px;
  }
  text-align: center;
  margin-left: 5px;
  user-select: none;
`;

const StyledDropDownForm = styled.div`
  position: absolute;
  right: 0px;
  width: 300%;
  @media only screen and (min-width: 1280px) {
    left: 0px;
    width: 190%;
  }
  top: 100%;
  background: ${theme.colors.whiteSpace};
  color: #000;
  z-index: 1;
  display: none;
  padding: 15px;
  border-color: ${theme.colors.primary.default};
  border-width: 2px;
  border-radius: 0px 0px 5px 5px;

  box-shadow: 3px 5px 10px 5px #0003, 1px 2px 10px 3px #0001 inset;
  text-align: left;
  font-size: 1.125rem;
  cursor: auto;

  .mobile-active & {
    display: block;
  }

  .log-in:hover & {
    display: block;
  }

  &:focus-within {
    display: block;
  }
`;

const StyledDropDown = styled.div`
  position: absolute;
  left: 0px;
  width: 300%;
  top: 100%;
  margin: 0px;
  padding: 0px;
  z-index: 1;
  display: none;
  overflow: hidden;
  box-shadow: 3px 5px 10px 5px #0003, 1px 2px 10px 3px #0001 inset;

  text-align: left;
  cursor: auto;
  border-color: ${theme.colors.primary.default};
  border-width: 2px;
  border-radius: 0px 0px 6px 6px;
  .mobile-active & {
    display: block;
  }

  .menu:hover & {
    display: block;
  }
`;

function DropdownTab({ className, children, classes }) {
  const wrapperRef = useRef(null);
  const [mobileActive, setMobileActive] = useState('');
  useTouchOutside(wrapperRef, function () {
    setMobileActive('');
  });

  function handleTouch(e) {
    e.preventDefault();
    if (mobileActive === '') {
      setMobileActive('mobile-active');
    } else {
      setMobileActive('');
    }
  }

  return (
    <div
      ref={wrapperRef}
      className={className + ' ' + classes + ' ' + mobileActive}
    >
      <div
        onTouchStart={handleTouch}
        className="absolute w-full h-full bottom-0 left-0"
      />
      <LinkTabAnim className="child" />
      {classes === 'menu' ? (
        <>
          <FontAwesomeIcon icon={faBars} className="text-2xl" />
          <StyledDropDown onClick={handleTouch}>{children}</StyledDropDown>
        </>
      ) : (
        children
      )}
    </div>
  );
}
function NavButton(props) {
  return (
    <StyledLink exact={props.name === 'Home'} to={props.link}>
      {props.name} <LinkTabAnim className="child" />
    </StyledLink>
  );
}

function NavBar(props) {
  const size = useWindowSize();

  return (
    <div className="flex flex-row h-10 xl:h-20 border-b-2 mt-3 pl-1 border-primary pr-1 xl:pr-10">
      {size.width > 570 ? (
        <React.Fragment>
          {props.pages.map((data) => {
            return (
              <NavButton key={data.name} name={data.name} link={data.path} />
            );
          })}
        </React.Fragment>
      ) : (
        <StyledDropdownTab classes="menu">
          {props.pages.map((data) => {
            return (
              <div className="w-full" key={data.name}>
                <StyledLinkDropdown exact={data.name === 'Home'} to={data.path}>
                  {data.name}
                </StyledLinkDropdown>
              </div>
            );
          })}
        </StyledDropdownTab>
      )}

      <div className="flex flex-row-reverse w-full">
        {props.loggedIn ? (
          <>
            <StyledText>{props.user}</StyledText>
            <StyledTab
              onClick={() => {
                API.logout().then(props.updateSavedRecipes([]));
                console.log(document.cookie);
                props.userLogout();
              }}
            >
              <LinkTabAnim className="child" />
              Log Out
            </StyledTab>
          </>
        ) : (
          <>
            <NavButton className="text-xl" name="Sign Up" link="/sign-up" />
            <StyledDropdownTab classes="log-in">
              <LinkTabAnim className="child" />
              Log In
              <StyledDropDownForm>
                <LogInForm />
              </StyledDropDownForm>
            </StyledDropdownTab>
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.displayname,
    loggedIn: state.user.username !== ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogout: () => dispatch(userLogout()),
    updateSavedRecipes: (savedRecipes) =>
      dispatch(updateSavedRecipes(savedRecipes))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
