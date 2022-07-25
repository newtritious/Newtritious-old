import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { userLogin, updateSavedRecipes } from '../store/reducers/userReducer';
import { StyledTextInput, StyledButton } from './styles/StyledInputs';
import API from '../utils/API';

class LogInForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      displayname: '',
      userEmail: '',
      email: '',
      password: ''
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    API.login(email, password)
      .then((results) => {
        if (results) {
          this.setState({
            displayname: results.data.displayname,
            userEmail: results.data.email
          });
          this.props.userLogin(this.state.displayname);
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
    displayname: state.user.displayname
  };
};

const mapDispatchToProps = (dispatch) => ({
  userLogin: (displayname) => dispatch(userLogin(displayname)),
  updateSavedRecipes: (savedRecipes) =>
    dispatch(updateSavedRecipes(savedRecipes))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LogInForm));
