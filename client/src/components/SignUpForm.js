import React from 'react';
import {StyledTextInput, StyledSubmit, StyledInputMessage, StyledForm} from './styles/StyledInputs';
import axios from 'axios';




class SignUpForm extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    constructor(props) {
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
      const userSubmission = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }

        if(validateUsername(this.state.username) && validatePassword(this.state.password) && (this.state.password === this.state.confirmPassword)){
            axios.post('/signup', userSubmission).then(function(response){
                console.log("a response!")
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

            this.setState({
                userName:"",
                email:"",
                password:"",
                confirmPassword:""
            })
        }else
        console.log("submission rejected!")

        event.preventDefault();
    }

    handleInputChange(event){
        let value = event.target.value
        value = value.replace(/ /g,"");
        this.setState({
            [event.target.name]: value
        })
    }
    render() {
        return (
            <StyledForm onSubmit={this.handleSubmit} className = "signup">
                <label>Username</label>
                    <div className="relative">
                    <StyledTextInput type="text" name="username" value={this.state.username} onChange={this.handleInputChange} required maxLength="24"></StyledTextInput>
                    {!validateUsername(this.state.username) && <StyledInputMessage>Username should be 3 or more characters with only letters, numbers, or underscores ( _ )</StyledInputMessage>}
                    </div>
                <label>Email</label>
                    <StyledTextInput type="email" name="email" value={this.state.email} onChange={this.handleInputChange} required></StyledTextInput>
                <label>Password</label>
                    <div className="relative">
                    <StyledTextInput type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required maxLength="32"></StyledTextInput>
                    {!validatePassword(this.state.password) && <StyledInputMessage>Pasword should be 8 or more characters</StyledInputMessage>}
                    </div>
                <label>Confirm Password</label>
                    <div className="relative">
                    <StyledTextInput type="password" name="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInputChange} required maxLength="32"></StyledTextInput>
                    {(this.state.password !== this.state.confirmPassword) && <StyledInputMessage>Does not match</StyledInputMessage>}
                    </div>
                <div className="flex flex-row-reverse">
                    <StyledSubmit value="Sign Up" />
                </div>
            </StyledForm>
        )
    }
}

function validateUsername(username){
    if(/[^\w_]/.test(username))
        return false
    else
        return !(username.length < 3 && username.length > 0)
}

function validatePassword(password){
    return !(password.length < 8 && password.length > 0)
}



export default SignUpForm