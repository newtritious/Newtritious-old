import React from 'react';
import {StyledTextInput, StyledSubmit, StyledInputMessage, StyledForm} from './styles/StyledInputs';
import axios from 'axios';

class SearchForm extends React.Component{
    state = {
        searchInput: ""
    }
    constructor(props) {
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event){
        let value = event.target.value
        this.setState({
            [event.target.name]: value
        })
    }
    render(){
        return(
            <div>
                <StyledForm onSubmit={this.handleSubmit}>
                    
                </StyledForm>
            </div>
        )
    }
}

export default SearchForm;