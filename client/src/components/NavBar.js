import React from 'react';
import { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { userLogout } from '../store/reducers/userReducer';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import LogInForm from './LoginForm';
import API from '../utils/API';
import theme from '../theme.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const StyledLink = styled(NavLink)`
  width: 11%;
  min-width: 90px;
  font-size: 1.2rem;
  padding: 10px;
  padding-top: 5px;
  @media only screen and (min-width: 1280px){
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
  &:hover{
    color: ${theme.colors.whiteSpace};
    background: ${theme.colors.primary.faded};
  }
  &.active{
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

const StyledTab = styled.div`
  min-width: 60px;
  @media only screen and (min-width: 570px){
    width: 11%;
    min-width: 90px;
  }
  font-size: 1.2rem;
  padding: 10px;
  padding-top: 5px;
  @media only screen and (min-width: 1280px){
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

  &:hover, &:active{
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

const StyledText = styled.div`
  width: 11%;
  min-width: 90px;
  font-size: 1.2rem;
  padding: 5px;
  @media only screen and (min-width: 1280px){
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
    @media only screen and (min-width: 1280px){
    left: 0px;
    width: 190%;
  }
  top: 100%;
  background: #dcd;
  color: #000;
  z-index: 1;
  display: none;
  padding: 15px;
  border-radius: 0px 0px 5px 5px;
  text-align: left;
  font-size: 1.125rem;
  cursor: auto;

  .log-in:hover &,.log-in:active & {
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
  .menu:hover &,.menu:active & {
    display: block;
  }

`;
class NavButton extends React.Component {
  render() {
    return (
      <StyledLink exact={this.props.name==="Home"} to={this.props.link}>
        {this.props.name} <LinkTabAnim className="child" />
      </StyledLink>
    );
  }
}

function NavBar(props) {
  const size = useWindowSize();

  return (
    <div className="flex flex-row h-10 xl:h-20 border-b-2 mt-3 pl-1 border-primary pr-1 xl:pr-10">
      {(size.width > 570) ? (
        <React.Fragment>
          {props.pages.map((data) => {
              return (
                <NavButton key={data.name} name={data.name} link={data.path} />
              )
          })}
        </React.Fragment>
      ) : (
        <StyledTab className="menu">
          <StyledDropDown>
            {props.pages.map((data) => {
                return (
                  <div className="w-full" key={data.name}>
                    <StyledLinkDropdown exact={data.name==="Home"}  to={data.path}>
                      {data.name}
                    </StyledLinkDropdown>
                  </div>
                )
            })}
          </StyledDropDown>
          <LinkTabAnim className="child" />
          <FontAwesomeIcon icon={faBars} className="text-2xl"/>
        </StyledTab>
      )

      }

      <div className="flex flex-row-reverse w-full">
        {props.loggedIn ? (
          <React.Fragment>
            <StyledText>{props.user}</StyledText>
            <StyledTab
              onClick={() => {
                API.logout();
                console.log(document.cookie);
                props.userLogout();
              }}
            >
              <LinkTabAnim className="child" />
              Log Out
            </StyledTab>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavButton className="text-xl" name="Sign Up" link="/sign-up" />
            <StyledTab className="log-in">
              <LinkTabAnim className="child" />
              Log In
              <StyledDropDownForm>
                <LogInForm />
              </StyledDropDownForm>
            </StyledTab>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

const mapStateToProps = (state) => {
  return {
    user: state.user.username,
    loggedIn: state.user.username !== ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return{
    userLogout: () => dispatch(userLogout())
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
