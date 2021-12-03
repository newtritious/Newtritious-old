import React from 'react';
import { connect } from 'react-redux';
import SignUpForm from './SignUpForm';
import styled from 'styled-components';

const StyledHero = styled.div`
  background-image: linear-gradient(#0002, #0002), url('./images/pizza1.jpg');
  background-size: cover;
  padding: 50px;
  padding-bottom: 120px;

  .signup {
    width: 30%;
    margin-left: 60%;
  }
`;

class Hero extends React.Component {
  render() {
    return (
      <StyledHero>
        {!this.props.loggedIn ? (
          <SignUpForm/>
        ) : (
          //this element is just here to take up space
          <div className="h-96"></div>
        )}
      </StyledHero>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.username !== ''
  };
};

export default connect(
  mapStateToProps
)(Hero);
