import React from "react";
// import "./style.css";

function SearchResults({ results, image, title, sourceUrl, summary }) {
    return (
        <>
            {/* having trouble grabbing the results array from search page to map over the results , doesnt like the name of the array? */}
            {results.map((data) => {
                return (
                    <div key={data.id} className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-auto md:max-w-2xl">
                        <div className="md:flex">
                            <div className="md:flex-shrink-0">
                                <img className="h-48 w-full object-cover md:w-48" src={image} alt="recipe" />
                            </div>
                            <div className="p-8">
                                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{title}</div>
                                <a href={sourceUrl} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{sourceUrl}</a>
                                <p className="mt-1 text-gray-500 overflow-visible">{summary}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>

        //     <ul className="list-group search-results">
        // ####said props where undefined here
        //         {props.map(result => (
        //             <li key={result} className="list-group-item">
        //                 <img alt="recipe" src={result} className="img-fluid" />
        //             </li>
        //         ))}
        //     </ul>
    );
}

export default SearchResults;