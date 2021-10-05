import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { userLogin } from '../store/reducers/userReducer';
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
        console.log(error);
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
        />
        <label>Password</label>
        <StyledTextInput
          className="text-input"
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange}
        />
        <div className="flex flex-row-reverse">
          <StyledSubmit className="small blue" value="Log In" />
        </div>
      </form>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LogInForm));
