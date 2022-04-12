import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { recipesLoaded } from '../../store/reducers/searchReducer';
import API from '../../utils/API';
import SearchForm from './../SearchForm.js';
import {StyledButton} from './../styles/StyledInputs';
import FavoriteButton from "./../FavoriteButton.js"

class SearchPage extends React.Component {
  state = {
    searchInput: '',
    isLoading: false
  };
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchForm = this.handleSearchForm.bind(this);
  }

  handleInputChange(event) {
    let value = event.target.value;
    this.setState({
      [event.target.name]: value
    });
  }

  handleSearchForm(e) {
    e.preventDefault();

    // set loading to true before the request is complete
    this.setState({ isLoading: true });

    API.searchRecipes(this.state.searchInput)
      .then((results) => {
        // set loading to false and set the recipes to the data we get back, loading back to false
        if (results) {
          this.setState({
            searchInput: '',
            recipes: results.data,
            isLoading: false
          });
          this.props.recipesLoaded(this.state.recipes);
        }
        console.log(this.state);
      })
      .catch(() => {
        this.setState({
          searchInput: '',
          recipes: [],
          isLoading: false
        });
      });
  }

  render() {
    return (
      <div>
        <SearchForm
          searchInput={this.state.searchInput}
          onSubmitForm={this.handleSearchForm}
          onInputChange={this.handleInputChange}
        />
        {!!this.props.recipes?.length &&
          this.props.recipes.map((data) => {
            return (
              <div
                className="mt-3 mb-1.5 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
                key={data.id}
              >
                <div className="md:flex items-center p-2 relative">
                  
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-60 w-full object-cover md:w-60 rouded-xl"
                      src={data.image}
                      alt="recipe"
                    />
                  </div>
                  <div className="p-4 relative w-full">
                    <div className="absolute top-4 right-2">
                      <FavoriteButton recipe={data} saved={this.props.savedRecipes.has(data.id)}/>
                    </div>
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      {data.title}
                    </div>
                    <div className="block mt-1 text-base leading-tight font-normal text-black">
                      Cuisines: {data.cuisines.join(', ')}
                    </div>
                    <div className="block mt-1 text-base leading-tight font-normal text-black">
                      Diets: {data.diets.join(', ')}
                    </div>
                    <div className="block mt-1 text-base leading-tight font-normal text-black">
                      Dish Type: {data.dishTypes.join(', ')}
                    </div>

                    <div className="block mt-1 text-base leading-tight font-normal text-black">
                      Ready Time: {data.readyInMinutes}
                    </div>
                    <div className="block mt-1 text-base leading-tight font-normal text-black">
                      Servings: {data.servings}
                    </div>
                    <div className="block mt-1 text-base leading-tight font-normal text-black">
                      HealthScore: {data.healthScore}
                    </div>
                      <Link to={`/recipe/${data.id}`}>
                        <StyledButton className="x-small mt-2" text="View Recipe"/>
                      </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.search.recipes,
  savedRecipes: state.user.savedRecipes
});

const mapDispatchToProps = (dispatch) => ({
  recipesLoaded: (recipes) => dispatch(recipesLoaded(recipes))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
