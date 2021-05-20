import React from 'react';
import styled from 'styled-components';
import {StyledTextInput, StyledSubmit, StyledInputMessage} from './styles/StyledInputs';
import axios from 'axios';

const StyledForm = styled.form`
    width: 50%;
    margin: auto;
    margin-top: 50px;
    padding: 40px;
    background: #ddd;
    border-radius: 20px;
`


class SignUpForm extends React.Component{
    state= {
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    constructor(props){
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){

        axios.post('/signup', this.state).then(function(response){
            console.log("a response!")
            console.log(response)
        })
        event.preventDefault();
    }

    handleInputChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render(){
        return(
            <StyledForm onSubmit={this.handleSubmit}>
                <label>Username</label>
                    <div className="relative">
                    <StyledTextInput type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange}></StyledTextInput>
                    {checkUsername(this.state.userName) && <StyledInputMessage>Username should be 3 or more characters</StyledInputMessage>}
                    </div>
                <label>Email</label>
                    <StyledTextInput type="email" name="email" value={this.state.email} onChange={this.handleInputChange}></StyledTextInput>
                <label>Password</label>
                    <StyledTextInput type="password" name="password" value={this.state.password} onChange={this.handleInputChange}></StyledTextInput>
                <label>Confirm Password</label>
                    <StyledTextInput type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange}></StyledTextInput>
                <div className="flex flex-row-reverse">
                    <StyledSubmit value="Sign Up" />
                </div>
            </StyledForm>
        )
    }
}

function checkUsername(userName){
    let cutName = userName.replace(/ /g,"")
    return (cutName.length < 3 && cutName.length > 0)
}

export default SignUpForm