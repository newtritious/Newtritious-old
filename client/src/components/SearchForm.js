import React from 'react';
import {
  StyledTextInput,
  StyledButton,
  StyledForm
} from './styles/StyledInputs';

function SearchForm(props) {
  return (
    <div>
      <StyledForm onSubmit={props.onSubmitForm}>
        <label>Search:</label>
        <StyledTextInput
          type="text"
          name="searchInput"
          value={props.searchInput}
          onChange={props.onInputChange}
          required
          maxLength="48"
        ></StyledTextInput>
        <div className="flex flex-row-reverse">
          <StyledButton type="submit" text="Go" />
        </div>
      </StyledForm>
    </div>
  );
}

export default SearchForm;
