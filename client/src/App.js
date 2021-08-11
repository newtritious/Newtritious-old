import React from 'react';
import './App.css';
import NavBar from './components/NavBar.js';
import HomePage from './components/pages/HomePage.js';
import SearchPage from './components/pages/SearchPage.js';
import PageB from './components/pages/PageB.js';
import PageC from './components/pages/PageC.js';
import SignUpPage from './components/pages/SignUpPage.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import API from './utils/API';
import './index.css';
import Recipe from './components/Recipe';

class App extends React.Component {
  state = {
    testResult: 'fail',
    user: 'guest',
    loggedIn: false
  };
  componentDidMount() {
    // API.testApi().then(result => console.log(result));
    API.testApi().then((result) =>
      this.setState({ testResult: result.data.test })
    );
  }

  render() {
    return (
      <Router>
        <NavBar user={this.state.user} loggedIn={this.state.loggedIn}/>
        <Switch>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/recipe/:id">
            <Recipe />
          </Route>
          <Route path="/page-b">
            <PageB />
          </Route>
          <Route path="/page-c">
            <PageC />
          </Route>
          <Route path="/sign-up">
            <SignUpPage />
          </Route>
          <Route path="/">
            <HomePage user={this.state.user} loggedIn={this.state.loggedIn}/>
          </Route>
        </Switch>
        <span>Test api: {this.state.testResult}!</span>
      </Router>
    );
  }
}

export default App;
