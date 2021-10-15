import React from 'react';
import Hero from './../Hero';

class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Hero {...this.props} />
      </div>
    );
  }
}

export default HomePage;
