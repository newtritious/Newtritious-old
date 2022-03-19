import React from 'react';
import { useState, useEffect} from "react";
import {StyledButton} from './styles/StyledInputs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { connect } from 'react-redux';
import { updateSavedRecipes } from '../store/reducers/userReducer';
import API from './../utils/API.js'


function FavoriteButton(props) {
    const [saved, setSaved] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function checkIfSaved(){
        let check = false

        props.savedRecipes.forEach(function(index){
            if(index.id === props.recipe.id){
                check = true
            }
        })

        setSaved(check)
    }

    useEffect(() => {
        checkIfSaved()
    },[props.savedRecipes,props.recipe])

    function handleOnClick(e) {
        e.preventDefault()
        
        if(!isLoading){
            setIsLoading(true)
            if(saved){
                API.deleteRecipe(props.recipe.id)
                    .then((response) => {
                        props.updateSavedRecipes(response.data)
                        setIsLoading(false)
                    })
                    .catch((error) =>{
                        console.log(error)
                        setIsLoading(false)
                    })
            }
            else{
                API.saveRecipe(props.recipe)
                    .then((response) => {
                        props.updateSavedRecipes(response.data)
                        setIsLoading(false)
                    })
                    .catch((error) =>{
                        console.log(error)
                        setIsLoading(false)
                    })
            }
        }
    }

    return(
        props.username !== '' && (
            <StyledButton onClick={handleOnClick} className="clear" text={saved ? (<FontAwesomeIcon icon={faHeartSolid}/>) : (<FontAwesomeIcon icon={faHeart}/>)}/>
        )
        
    )
}


const mapStateToProps = (state) => {
    return {
      savedRecipes: state.user.savedRecipes,
      username: state.user.username
    };
  };

const mapDispatchToProps = (dispatch) => {
return{
    updateSavedRecipes: (savedRecipes) => dispatch(updateSavedRecipes(savedRecipes))
}
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavoriteButton);
  