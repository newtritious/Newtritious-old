import React from 'react';
import { connect } from 'react-redux';
import SignUpForm from '../SignUpForm';
import styled from 'styled-components';

const StyledHero = styled.div`
  background-image: linear-gradient(#0002, #0002), url('./images/pizza1.jpg');
  background-size: cover;
  padding-top: 50px;

  padding-bottom: 120px;

  .signup {
    width: 88%;
    margin-left: 6%;
  }

  @media only screen and (min-width: 620px) {
    .signup {
      width: 70%;
      margin-left: 15%;
    }
  }

  @media only screen and (min-width: 1280px) {
    .signup {
      width: 26%;
      margin-left: 62%;
    }
  }
`;

function Hero(props) {
  return (
    <StyledHero>
      {!props.loggedIn ? (
        <SignUpForm />
      ) : (
        //this element is just here to take up space
        <div className="h-96"></div>
      )}
    </StyledHero>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.displayname !== ''
  };
};

export default connect(mapStateToProps)(Hero);
