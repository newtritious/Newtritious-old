import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage.js';
import SearchPage from './pages/SearchPage.js';
import PageB from './pages/PageB.js';
import PageC from './pages/PageC.js';
import SignUpPage from './pages/SignUpPage.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './index.css';
import theme from './theme.js';
import Recipe from './components/Recipe';

document.body.style.backgroundColor = theme.colors.whiteSpace;

class App extends React.Component {
  state = {
    pages: [
      {
        name: 'Home',
        path: '/',
        component: <HomePage />
      },
      {
        name: 'Search',
        path: '/search',
        component: <SearchPage />
      }
    ]
  };

  render() {
    return (
      <Router>
        <NavBar pages={this.state.pages} />
        <Switch>
          <Route path="/recipe/:id">
            <Recipe />
          </Route>

          <Route path="/sign-up">
            <SignUpPage />
            {this.props.loggedIn && <Redirect to="/" />}
          </Route>
          <Route path="/page-c">
            <PageC />
          </Route>
          <Route path="/page-b">
            <PageB />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.displayname !== ''
  };
};

export default connect(mapStateToProps)(App);
