import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LogInForm from './LoginForm';
import { userLogin } from '../store/reducers/userReducer';
import API from '../utils/API';
import theme from '../theme.js';

const StyledLink = styled(NavLink)`
  width: 11%;
  min-width: 170px;
  font-size: 2.5rem;
  text-align: center;
  padding: 10px;
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
  width: 11%;
  min-width: 170px;
  font-size: 2.5rem;
  text-align: center;
  padding: 10px;
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
  min-width: 170px;
  font-size: 2.5rem;
  text-align: center;
  padding: 10px;
  margin-left: 5px;
  user-select: none;
`;

const StyledDropDownForm = styled.div`
  position: absolute;
  left: 0px;
  width: 190%;
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

  .log-in:hover & {
    display: block;
  }

  &:focus-within {
    display: block;
  }
`;
class NavButton extends React.Component {
  render() {
    return (
      <StyledLink exact to={this.props.link}>
        {this.props.name} <LinkTabAnim className="child" />
      </StyledLink>
    );
  }
}

class NavBar extends React.Component {
  render() {
    return (
      <div className="flex flex-row h-20 border-b-2 mt-3 pl-1 border-primary pr-10">
        <NavButton name="Home" link="/" />
        <NavButton name="Search" link="/search" />
        <NavButton name="PageB" link="/page-b" />
        <NavButton name="PageC" link="/page-c" />

        <div className="flex flex-row-reverse w-full">
          {this.props.loggedIn ? (
            <React.Fragment>
              <StyledText>{this.props.user}</StyledText>
              <StyledTab
                onClick={() => {
                  API.logout();
                  console.log(document.cookie);
                  this.props.loginUpdate(false, 'guest');
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
                  <LogInForm userLogin={this.props.userLogin} />
                </StyledDropDownForm>
              </StyledTab>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    email: state.user.email
  };
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (username, email) => dispatch(userLogin(username, email))
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
