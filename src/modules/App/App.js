import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { getData } from './AppReducer';
import { connect } from 'react-redux';

import ChartView from '../Chart/ChartView';
import './App.css';

class App extends Component {

  render() {
    const { data: { title } } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <img src="/assets/logo.jpg" className="App-logo" alt="logo" />
          <h2>{title}</h2>
        </div>
        <div className="App-Content">
          {/*<ChartView height={300} width={600} />*/}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: getData(state)
});

export default connect(mapStateToProps)(App);
