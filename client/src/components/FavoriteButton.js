import React from 'react';
import { useState, useEffect } from 'react';
import { StyledButton } from './styles/StyledInputs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { updateSavedRecipes } from '../store/reducers/userReducer';
import API from './../utils/API.js';

function FavoriteButton(props) {
  const [isLoading, setIsLoading] = useState(false);

  function handleOnClick(e) {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);
      if (props.saved) {
        API.deleteRecipe(props.recipe.id)
          .then((response) => {
            let savedRecipes = new Set(props.savedRecipes);
            savedRecipes.delete(props.recipe.id);
            props.updateSavedRecipes(savedRecipes);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      } else {
        API.saveRecipe(props.recipe)
          .then((response) => {
            let savedRecipes = new Set(props.savedRecipes);
            props.updateSavedRecipes(savedRecipes.add(props.recipe.id));
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(false);
          });
      }
    }
  }

  return (
    props.displayname !== '' && (
      <StyledButton
        onClick={handleOnClick}
        className="clear"
        text={
          props.saved ? (
            <FontAwesomeIcon icon={faHeartSolid} />
          ) : (
            <FontAwesomeIcon icon={faHeart} />
          )
        }
      />
    )
  );
}

const mapStateToProps = (state) => {
  return {
    savedRecipes: state.user.savedRecipes,
    displayname: state.user.displayname
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSavedRecipes: (savedRecipes) =>
      dispatch(updateSavedRecipes(savedRecipes))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
