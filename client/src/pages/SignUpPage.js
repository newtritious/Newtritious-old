import React from 'react';
import SignUpForm from '../components/SignUpForm';

class SignUpPage extends React.Component {
  render() {
    return (
      <div>
        <SignUpForm {...this.props} />
      </div>
    );
  }
}

export default SignUpPage;
