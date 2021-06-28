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
    font-size: 1.1rem;
    
    &:focus {
        border-color: #00d;
        outline: none;
    }`

const StyledInputMessage = styled.p`
    font-size: .8rem;
    color: #d00;
    position: absolute;
    left: 0;
    top: 34px;
`

const StyledSubmit = styled.input.attrs({
    type: "submit"
})`
    border-radius: 20px;
    padding: 15px 30px 15px 30px;
    color: #fff;
    background: #3c2;
    font-size: 1.5rem;
    transition: background 300ms;

    &.small {
        padding: 8px 20px 8px 20px;
        font-size: 1.25rem;
        border-radius: 10px;
    }

    &.blue {
        background: #28c;
    }
    
    &:hover {
        background: #092;
        cursor: pointer;
    }
    &.blue:hover {
        background: #05b;
        cursor: pointer;
    }`

export {
    StyledTextInput,
    StyledSubmit,
    StyledInputMessage,
    StyledForm
}