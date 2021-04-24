import React from 'react';
import logo from './logo.svg';
import './App.css';
import StyleSamples from './components/StyleSamples';
import NavBar from './components/NavBar.js'
import Test from './components/test.js'
import HomePage from './components/pages/HomePage.js'
import PageA from './components/pages/PageA.js'
import PageB from './components/pages/PageB.js'
import PageC from './components/pages/PageC.js'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {
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
      </Router>
    );
  }
}

export default App;
