import React from 'react';
import logo from './logo.svg';
import './App.css';
import Test from './components/test.js'

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Test />
      </div>
    );
  }
}

export default App;
