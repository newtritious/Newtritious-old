import React from 'react';
import './App.css';
import NavBar from './components/NavBar.js';
import HomePage from './components/pages/HomePage.js';
import PageA from './components/pages/PageA.js';
import PageB from './components/pages/PageB.js';
import PageC from './components/pages/PageC.js';
import SignUpPage from './components/pages/SignUpPage.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import API from './utils/API';
import './index.css';

class App extends React.Component {
  state = {
    testResult: 'fail',
    user: 'guest',
    spoonacularApi: [],
  };
  componentDidMount() {
    // API.testApi().then(result => console.log(result));
    API.testApi().then((result) =>
      this.setState({ testResult: result.data.test })
    );
    API.spoonacularApi().then((results) =>
      this.setState({ spoonacularApi: results.data })
    );
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path='/page-a'>
            <PageA />
          </Route>
          <Route path='/page-b'>
            <PageB />
          </Route>
          <Route path='/page-c'>
            <PageC />
          </Route>
          <Route path='/sign-up'>
            <SignUpPage />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
        <span>Test api: {this.state.testResult}!</span>
        {/* API Testing */}
        {/* <div>
          <h2>Spoonacular Data:</h2> */}
        <pre>
          {this.state.spoonacularApi.map((data, index) => {
            return (

              // <ul key={index} style={{ marginTop: '10px' }}>
              //   <li>id: {JSON.stringify(data.id, null, 2)}</li>
              //   <li>title: {data.title}</li>
              //   <img>imgUrl: {data.image}</img>
              //   <li>ingredients: {data.ingredients}</li>
              //   <li>imgType: {data.imageType}</li>
              // </ul>
              <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img className="h-48 w-full object-cover md:w-48" src={data.image} alt="recipe" />
                  </div>
                  <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{data.title}</div>
                    <a href={data.url} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
                    <p className="mt-2 text-gray-500">{data.usedIngredients}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </pre>
        {/* // </div> */}
        {/* API Testing */}
      </Router>
    );
  }
}

export default App;
