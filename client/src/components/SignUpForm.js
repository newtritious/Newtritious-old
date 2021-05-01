import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
    width: 50%;
    margin: auto;
    margin-top: 50px;
    padding: 40px;
    background: #ddd;
    border-radius: 20px;
`
const StyledTextInput = styled.input`
    width:100%;
    border-radius: 5px;
    border-color: #000;
    border-width: 1px;
    padding: 3px;
    margin: auto;
    margin-bottom: 30px;
    display: block;
    font-size: 18px;
    
    &:focus {
        border-color: #00d;
        outline: none;
    }`

const StyledSubmit = styled.input.attrs({
    type: "submit"
})`
    border-radius: 20px;
    padding: 15px 30px 15px 30px;
    color: #fff;
    background: #3c2;
    font-size: 24px;
    transition: background 300ms;
    
    &:hover {
        background: #092;
        cursor: pointer;
    }`

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
        console.log(this.state)
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
                    <StyledTextInput type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange}></StyledTextInput>
                <label>Email</label>
                    <StyledTextInput type="email" name="email" value={this.state.email} onChange={this.handleInputChange}></StyledTextInput>
                <label>Password</label>
                    <StyledTextInput type="password" name="password" value={this.state.password} onChange={this.handleInputChange}></StyledTextInput>
                <label>Confirm Password</label>
                    <StyledTextInput type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange}></StyledTextInput>
                <div className="flex flex-row-reverse">
                    <StyledSubmit value="Submit" />
                </div>
            </StyledForm>
        )
    }
}

export default SignUpForm