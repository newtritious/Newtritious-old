import React from 'react';
import SearchForm from './../SearchForm.js';
import API from '../../utils/API';

class SearchPage extends React.Component {
  state = {
    searchInput: '',
    searchResults: [],
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

  // function to handle search form submit
  handleSearchForm(e) {
    e.preventDefault();

    API.spoonacularApiSearch(this.state.searchInput)
      .then((results) => {
        // set loading to true before the request is complete
        this.setState({ isLoading: true });
        // set loading to false and set the searchResults to the data we get back, loading back to false
        if (results) {
          this.setState({
            searchInput: '',
            searchResults: results.data,
            isLoading: false
          });
        }
        console.log(this.state);
      })
      .catch(() => {
        this.setState({
          searchInput: '',
          searchResults: 'No search results found, try a different query',
          isLoading: false
        });
      });
  }

  render() {
    return (
      <div>
        <SearchForm
          onSubmitForm={this.handleSearchForm}
          onInputChange={this.handleInputChange}
        />
        {this.state.searchResults &&
          this.state.searchResults.map((data) => {
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
                    <a
                      href={data.sourceUrl}
                      className="block mt-1 text-xs leading-tight font-normal text-indigo-500 hover:underline"
                    >
                      Source: {data.sourceUrl}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default SearchPage;
