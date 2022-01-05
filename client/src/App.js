import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import NavBar from './components/NavBar.js';
import HomePage from './components/pages/HomePage.js';
import SearchPage from './components/pages/SearchPage.js';
import PageB from './components/pages/PageB.js';
import PageC from './components/pages/PageC.js';
import SignUpPage from './components/pages/SignUpPage.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import API from './utils/API';
import './index.css';
import theme from './theme.js';
import Recipe from './components/Recipe';

document.body.style.backgroundColor = theme.colors.whiteSpace;

class App extends React.Component {
  state = {
    testResult: 'fail',
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
      },
      {
        name: 'Page B',
        path: '/page-b',
        component: <PageB />
      },
      {
        name: 'Page C',
        path: '/page-c',
        component: <PageC />
      },

    ]
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
        <NavBar pages={this.state.pages}/>
        <Switch>
          <Route path="/recipe/:id">
            <Recipe />
          </Route>

          <Route path="/sign-up">
            <SignUpPage/>
            {this.props.loggedIn && <Redirect to="/" />}
          </Route>
          {this.state.pages.map((data) => {
            return (
              <Route key={data.name} exact path={data.path}>
                {data.component}
              </Route>

            )
          })}
        </Switch>
        <span>Test api: {this.state.testResult}!</span>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.username !== ''
  };
};

export default connect(
  mapStateToProps
)(App);
