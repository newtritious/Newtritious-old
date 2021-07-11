import React from "react";
import SignUpForm from "./SignUpForm";
import styled from 'styled-components';

const StyledHero = styled.div`
    background-image: url("./images/pizza1.jpg");
    background-size: cover;
    padding: 50px;
    
    .signup {
        width: 30%;
        margin-left: 60%;
    }
`


class Hero extends React.Component{
    render(){
        return(
            <StyledHero>
                <SignUpForm/>
            </StyledHero>
        )
    }
}


export default Hero;