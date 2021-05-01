import React from 'react';
import './App.css';
import NavBar from './components/NavBar.js'
import HomePage from './components/pages/HomePage.js'
import PageA from './components/pages/PageA.js'
import PageB from './components/pages/PageB.js'
import PageC from './components/pages/PageC.js'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import API from './utils/API';

class App extends React.Component {
  state = {
    testResult: 'fail',
    user: "guest"
  };

  componentDidMount() {
    // API.testApi().then(result => console.log(result));
    API.testApi().then(result => this.setState({testResult: result.data.test}));      
  }

  render(){
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/page-a">
            <PageA />
          </Route>
          <Route path="/page-b">
            <PageB />
          </Route>
          <Route path="/page-c">
            <PageC />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <span>Test api: {this.state.testResult}!</span>
      </Router>
    );
  }
}

export default App;
