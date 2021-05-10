import React, { Component } from 'react'
import API from '../../../utils/API';
import SearchForm from '../../SearchForm'
import SearchResults from '../../SearchResults'

class Search extends Component {
    state = {
        search: "",
        recipes: [],
        results: []
    }

    handleInputChange = event => {
        this.setState({ search: event.target.value })
    };

    handleSearch = event => {
        event.preventDefault();
        API.getRecipe(this.state.search)
            .then(res => {
                if (res.data.status === "error") {
                    throw new Error(res.data.message);
                }
                this.setState({ results: res.data.message, error: "" });
            })
            .catch(err => this.setState({ error: err.message }));


    }
    render() {
        return (
            <div>
                <h1>Search Recipes here:</h1>
                <SearchForm
                    handleSearch={this.handleSearch}
                    handleInputChange={this.handleInputChange}
                    recipes={this.state.recipes} />
                <SearchResults
                    results={this.state.results} />
                {/* {this.state.results.map((data) => {
                    return (
                        <div key={data.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-auto md:max-w-2xl">
                            <div className="md:flex">
                                <div className="md:flex-shrink-0">
                                    <img className="h-48 w-full object-cover md:w-48" src={data.image} alt="recipe" />
                                </div>
                                <div className="p-8">
                                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{data.title}</div>
                                    <a href={data.sourceUrl} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{data.sourceUrl}</a>
                                    <p className="mt-1 text-gray-500 overflow-visible">{data.summary}</p>
                                </div>
                            </div>
                        </div>
                    );
                })} */}

            </div>

        )
    }
}

export default Search;
