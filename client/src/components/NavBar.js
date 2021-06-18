import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {StyledTextInput, StyledSubmit} from './styles/StyledInputs'

const StyledLink = styled(Link)`
    width: 11%;
    min-width: 170px;
    font-size: 40px;
    text-align: center;
    padding: 10px;

    &:hover {
        background: #ddd;
    }
`

const StyledTab = styled.div`
    width: 11%;
    min-width: 170px;
    font-size: 40px;
    text-align: center;
    padding: 10px;
    user-select: none;

    &.log-in:focus-within{
        background: #ddd;
    }

    &.log-in:hover {
        background: #ddd;
        cursor: pointer;
    }

    position: relative
`

const StyledDropDownForm = styled.div`
    position: absolute;
    left: 0px;
    width: 190%;
    top: 100%;
    background: #dcd;
    display: none;
    padding: 15px;
    border-radius: 0px 0px 5px 5px;
    text-align: left;
    font-size: 18px;

    .log-in:hover &{
        display: block;
    }

    &:focus-within{
        display: block;
    }
`
class NavButton extends React.Component{
    render(){
        return(
            <StyledLink to={this.props.link}>{this.props.name}</StyledLink>
        )
    }
}

class LogInForm extends React.Component{

    state = {
        userName:"",
        password:""
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
            <form onSubmit={this.handleSubmit}>
                <label>Username</label>
                    <StyledTextInput className = "text-input" type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange}></StyledTextInput>
                <label>Password</label>
                    <StyledTextInput className = "text-input" type="password" name="password" value={this.state.password} onChange={this.handleInputChange}></StyledTextInput>
                <div className="flex flex-row-reverse">
                    <StyledSubmit className="small blue" value="Log In" />
                </div>
            </form>
        )
    }
}

class NavBar extends React.Component{
    render(){
        return(
            <div className="flex flex-row h-20 border-b-2 border-gray-400">
                <NavButton name ="Home" link="/" />
                <NavButton name = "Search" link ="/search"/>
                <NavButton name = "PageB" link ="/page-b"/>
                <NavButton name = "PageC" link ="/page-c"/>

                <div className="flex flex-row-reverse w-full">
                    <StyledTab>Guest</StyledTab>
                    <StyledTab className = "log-in">
                        Log In
                        <StyledDropDownForm>
                            <LogInForm />
                        </StyledDropDownForm>
                    </StyledTab>
                    <NavButton className="text-xl" name= "Sign Up" link="/sign-up"/>
                </div>
            </div>
        )
    }
}

export default NavBar;