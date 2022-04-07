import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { recipesLoaded } from '../../store/reducers/searchReducer';
import API from '../../utils/API';
import SearchForm from './../SearchForm.js';
import { StyledButton } from './../styles/StyledInputs';

class SearchPage extends React.Component {
  state = {
    searchInput: '',
    isLoading: false,
    // glutenFree: []
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

  handleFiltered(e) {
    API.getFilteredRecipes(e.target.value)
      .then((results) => {
        if (results) {
          this.setState({
            recipes: results.data
          })
          this.props.recipesLoaded(this.state.recipes);
        }
      })
  }

  render() {
    return (
      <div>
        <SearchForm
          searchInput={this.state.searchInput}
          onSubmitForm={this.handleSearchForm}
          onInputChange={this.handleInputChange}
        />
        <div className="px-6 pt-4 pb-2 flex flex-row justify-center">

          <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" title="keto" value="keto" onClick={(e) => this.handleFiltered(e)}>Keto</button>

          <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" title="Gluten Free" value="gluten free" onClick={(e) => this.handleFiltered(e)}>Gluten Free</button>

          <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" title="Paleo" value="paleo" onClick={(e) => this.handleFiltered(e)}>Paleo</button>

          <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" title="Vegetarian" value="vegetarian" onClick={(e) => this.handleFiltered(e)}>Vegetarian</button>

        </div>

        {
          this.props.recipes?.length &&
          this.props.recipes.map((data) => {
            // console.log(data)
            return (
              <div
                className="mt-3 mb-1.5 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
                key={data.id}
              >
                <div className="md:flex items-center p-2">
                  <div className="md:flex-shrink-0">
                    <img
                      className="h-60 w-full object-cover md:w-60 rouded-xl"
                      src={data.image}
                      alt="recipe"
                    />
                  </div>
                  <div className="p-4">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                      {data.title}
                    </div>
                    <div className="block mt-1 text-base leading-tight font-normal text-black">
                      Cuisines: {data.cuisines?.join(', ')}
                    </div>
                    <div className="block mt-1 text-base leading-tight font-normal text-black">
                      Diets: {data.diets?.join(', ')}
                    </div>
                    <div className="block mt-1 text-base leading-tight font-normal text-black">
                      Dish Type: {data.dishTypes?.join(', ')}
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
                      <StyledButton className="x-small mt-2" text="View Recipe" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  recipes: state.search.recipes
});

const mapDispatchToProps = (dispatch) => ({
  recipesLoaded: (recipes) => dispatch(recipesLoaded(recipes))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
