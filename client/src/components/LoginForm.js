import React from 'react';
import { withRouter } from 'react-router';
import { StyledTextInput, StyledSubmit } from './styles/StyledInputs';
import API from '../utils/API';

class LogInForm extends React.Component {
  state = {
    username: '',
    userEmail: '',
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
    API.login(email, password)
      .then((results) => {
        if (results) {
          this.setState({
            username: results.data.username,
            userEmail: results.data.email
          });
          this.props.userLogin(this.state.username, this.state.userEmail);
          this.props.history.push('/search');
        }
      })
      .catch((error) => {
        if (error.response.status === 401)
          alert('Credentials Failed, please try again');
      });

    this.setState({
      email: '',
      password: ''
    });
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

export default withRouter(LogInForm);
