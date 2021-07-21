import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { StyledTextInput, StyledSubmit } from './styles/StyledInputs';
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
    transition: color .3s ease-in-out;
    margin-left: 5px;

  &:hover {
    color: ${theme.colors.whiteSpace};
    
    .child{
        top:0;
    }
  }

  &.active {
      color: ${theme.colors.whiteSpace};
      .child{
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
    transition: top .3s ease-in-out;
    `

const StyledTab = styled.div`
    width: 11%;
    min-width: 170px;
    font-size: 2.5rem;
    text-align: center;
    padding: 10px;
    user-select: none;

  &.log-in:focus-within {
    background: #ddd;
  }

  &.log-in:hover {
    background: #ddd;
    cursor: pointer;
  }

  position: relative;
`;

const StyledDropDownForm = styled.div`
    position: absolute;
    left: 0px;
    width: 190%;
    top: 100%;
    background: #dcd;
    display: none;
    padding: 15px;
    border-radius: 0px 0px 5px 5px;
    text-align: left;
    font-size: 1.125rem;

    .log-in:hover &{
        display: block;
    }

    &:focus-within{
        display: block;
    }
`
class NavButton extends React.Component{
    render(){
        return(
            <StyledLink exact to={this.props.link}>{this.props.name} <LinkTabAnim className="child"/></StyledLink>
        )
    }
}

class LogInForm extends React.Component {
  state = {
    email: '',
    password: ''
  };
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    API.login(email, password);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Email</label>
        <StyledTextInput
          className="text-input"
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.handleInputChange}
        ></StyledTextInput>
        <label>Password</label>
        <StyledTextInput
          className="text-input"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange}
        ></StyledTextInput>
        <div className="flex flex-row-reverse">
          <StyledSubmit className="small blue" value="Log In" />
        </div>
      </form>
    );
  }
}

class NavBar extends React.Component {
  render() {
    return (
      <div className="flex flex-row h-20 border-b-2 mt-3 pl-1 border-primary">
        <NavButton name="Home" link="/" />
        <NavButton name="Search" link="/search" />
        <NavButton name="PageB" link="/page-b" />
        <NavButton name="PageC" link="/page-c" />

        <div className="flex flex-row-reverse w-full">
          <StyledTab>Guest</StyledTab>
          <StyledTab className="log-in">
            Log In
            <StyledDropDownForm>
              <LogInForm />
            </StyledDropDownForm>
          </StyledTab>
          <NavButton className="text-xl" name="Sign Up" link="/sign-up" />
        </div>
      </div>
    );
  }
}

export default NavBar;
