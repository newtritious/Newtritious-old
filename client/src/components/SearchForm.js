import React from 'react';
import {
  StyledTextInput,
  StyledSubmit,
  StyledForm,
} from './styles/StyledInputs';

class SearchForm extends React.Component {
  render() {
    return (
      <div>
        <StyledForm onSubmit={this.props.onSubmitForm}>
          <label>Search:</label>
          <StyledTextInput
            type='text'
            name='searchInput'
            value={this.props.searchInput}
            onChange={this.props.onInputChange}
            required
            maxLengh='48'
          ></StyledTextInput>
          <div className='flex flex-row-reverse'>
            <StyledSubmit value='Go' />
          </div>
        </StyledForm>
      </div>
    );
  }
}

export default SearchForm;
