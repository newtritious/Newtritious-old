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
    handleSubmit(event){
        console.log(this.state)

        //feel free to change this request as needed.
        axios.post('/search-req', this.state).then(function(response){
            console.log("a response!")
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })

        event.preventDefault();
    }
    render(){
        return(
            <div>
                <StyledForm onSubmit={this.handleSubmit}>
                    <label>Search:</label>
                    <StyledTextInput type="text" name="searchInput" value={this.state.searchInput} onChange={this.handleInputChange} required maxLengh="48"></StyledTextInput>
                    <div className="flex flex-row-reverse">
                        <StyledSubmit value="Go" />
                    </div>
                </StyledForm>
            </div>
        )
    }
}

export default SearchForm;