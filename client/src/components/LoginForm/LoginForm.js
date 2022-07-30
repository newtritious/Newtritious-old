import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  userLogin,
  updateSavedRecipes
} from '../../store/reducers/userReducer';
import { StyledTextInput, StyledButton } from '../styles/StyledInputs';
import API from '../../utils/API';

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
          this.props.userLogin(this.state.username);
          this.props.history.push('/search');

          API.getSavedRecipes().then((response) => {
            console.log(response.data);
            this.props.updateSavedRecipes(
              new Set(response.data.map((index) => index.id))
            );
          });
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
          <StyledButton type="submit" className="small" text="Log In" />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.username
  };
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (username) => dispatch(userLogin(username)),
  updateSavedRecipes: (savedRecipes) =>
    dispatch(updateSavedRecipes(savedRecipes))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LogInForm));
