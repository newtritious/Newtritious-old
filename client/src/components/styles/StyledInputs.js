import styled from 'styled-components';
import theme from '../../theme';
import React from 'react';

const StyledForm = styled.form`
  width: 80%;
  @media only screen and (min-width: 570px){
    width: 50%;
  }
  margin: auto;
  margin-top: 50px;
  padding: 30px;
  @media only screen and (min-height: 700px){
    padding: 40px;
  }
  background: ${theme.colors.whiteSpace};
  border-radius: 10px;
  border-width: 4px;
  border-color: ${theme.colors.primary.default};
  box-shadow: 3px 5px 10px 5px #0003, 1px 2px 10px 3px #0001 inset;
`;

const StyledTextInput = styled.input`
  width: 100%;
  border-radius: 5px;
  border-color: #000;
  border-width: 2px;
  padding: 3px;
  margin: auto;
  margin-bottom: 30px;
  font-size: .7rem;
  @media only screen and (min-width: 570px){
    margin-bottom: 30px;
    font-size: 1.1rem;
  }
  display: block;
  box-shadow: 3px 5px 10px #0001;

  &:focus {
    border-color: #00d;
    outline: none;
  }
`;

const StyledInputMessage = styled.p`
  
  color: #d00;
  position: absolute;
  left: 0;
  font-size: 0.7rem;
  top: 26px;
  @media only screen and (min-width: 570px){
    font-size: 0.8rem;
    top: 34px;
  }
`;

class ResponsiveButton extends React.Component {
  render(){
      return(
          <button onClick={this.props.onClick} className ={this.props.className}>
              <div className="dynamicChild">{this.props.text}</div>
              <div className="staticChild">{this.props.text}</div>
          </button>
      )
  }
}

//The static child is an invisible block element with the button text that just takes up space.
//The dynamic child is a visible absolute element with the button text that grows and shrinks.

const StyledButton = styled(ResponsiveButton)`
  border-radius: 5px;
  padding: 15px 30px 15px 30px;
  color: ${theme.colors.whiteSpace};
  background: ${theme.colors.primary.default};
  font-size: 1.5rem;
  transition: background 400ms, color 400ms;
  border-width: 3px;
  border-color: ${theme.colors.primary.default};
  box-shadow: 3px 5px 10px #0003;
  position: relative;

  .dynamicChild{
      transition: font-size 400ms;
      position: absolute;
      margin: auto;
      left:0;
      right:0;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
  }

  .staticChild{
      opacity: 0;
  }

  &.centered{
      margin-left: auto;
      margin-right: auto;
  }

  &.small {
      padding: 8px 20px 8px 20px;
      font-size: 1.25rem;
      border-radius: 10px;
  }

  &.x-small {
      padding: 6px 15px 6px 15px;
      font-size: 1rem;
      border-radius: 5px;
      font-weight: bold;
  }

  &.blue {
      background: #28c;
  }
  
  &:hover {
      background: ${theme.colors.whiteSpace};
      color: ${theme.colors.primary.default};
      cursor: pointer;
      .dynamicChild{
          font-size: 1.05em;
      }
  }
  &.blue:hover {
      background: #05b;
      cursor: pointer;
  }`

export { StyledTextInput, StyledButton, StyledInputMessage, StyledForm };
