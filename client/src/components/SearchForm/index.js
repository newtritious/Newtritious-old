import React from "react";
// import "./style.css";

function SearchForm(props) {
    return (
        <form className="search">
            <div className="form-group">
                <label htmlFor="recipe">Search:</label>
                <input
                    value={props.search}
                    onChange={props.handleInputChange}
                    name="recipe"
                    type="text"
                    className="form-control"
                    placeholder="Type in a recipe to begin"
                    id="recipe"
                />
                <button type="submit" onClick={props.handleSearch} className="btn btn-success">
                    Search
        </button>
            </div>
        </form>
    );
}

export default SearchForm;