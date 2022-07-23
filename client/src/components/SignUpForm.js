import React from 'react';
import { connect } from 'react-redux';
import { userSignup } from '../store/reducers/userReducer';
import {
  StyledTextInput,
  StyledButton,
  StyledInputMessage,
  StyledForm
} from './styles/StyledInputs';
import API from '../utils/API';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoginResponse = this.handleLoginResponse.bind(this);
    this.state = {
      displayname: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }
  handleSubmit(event) {
    const userSubmission = {
      displayname: this.state.displayname,
      email: this.state.email,
      password: this.state.password
    };

    if (
      validateDisplayname(this.state.displayname) &&
      validatePassword(this.state.password) &&
      this.state.password === this.state.confirmPassword
    ) {
      API.signup(userSubmission)
        .then((response) => this.handleLoginResponse(response))

        .catch((error) => {
          console.log(error);
        });

      this.setState({
        displayname: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } else console.log('submission rejected!');

    event.preventDefault();
  }

  handleLoginResponse(response) {
    console.log('a response!');
    console.log(response);
    this.props.userSignup(response.data.user.displayname);
  }

  handleInputChange(event) {
    let value = event.target.value;
    value = value.replace(/ /g, '');
    this.setState({
      [event.target.name]: value
    });
  }
  render() {
    return (
      <StyledForm onSubmit={this.handleSubmit} className="signup">
        <label>Display Name</label>
        <div className="relative">
          <StyledTextInput
            type="text"
            name="displayname"
            value={this.state.displayname}
            onChange={this.handleInputChange}
            required
            maxLength="24"
          ></StyledTextInput>
          {!validateDisplayname(this.state.displayname) && (
            <StyledInputMessage>
              Display Name should be 3 or more characters with only letters,
              numbers, or underscores ( _ )
            </StyledInputMessage>
          )}
        </div>
        <label>Email</label>
        <StyledTextInput
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleInputChange}
          required
        ></StyledTextInput>
        <label>Password</label>
        <div className="relative">
          <StyledTextInput
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
            maxLength="32"
          ></StyledTextInput>
          {!validatePassword(this.state.password) && (
            <StyledInputMessage>
              Pasword should be 8 or more characters
            </StyledInputMessage>
          )}
        </div>
        <label>Confirm Password</label>
        <div className="relative">
          <StyledTextInput
            type="password"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleInputChange}
            required
            maxLength="32"
          ></StyledTextInput>
          {this.state.password !== this.state.confirmPassword && (
            <StyledInputMessage>Does not match</StyledInputMessage>
          )}
        </div>
        <div className="flex flex-row-reverse">
          <StyledButton type="submit" text="Sign Up" className="centered" />
        </div>
      </StyledForm>
    );
  }
}

function validateDisplayname(displayname) {
  if (/[^\w_]/.test(displayname)) return false;
  else return !(displayname.length < 3 && displayname.length > 0);
}

function validatePassword(password) {
  return !(password.length < 8 && password.length > 0);
}

const mapDispatchToProps = (dispatch) => {
  return {
    userSignup: (displayname) => dispatch(userSignup(displayname))
  };
};

export default connect(null, mapDispatchToProps)(SignUpForm);
