import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { getData } from './AppReducer';
import { connect } from 'react-redux';

// chart interactions
import { buildCumulativeCustomerUsage } from '../../util/chartDataBuilder';
import { updateChartAction } from '../../modules/Chart/ChartActions';

import ChartView from '../Chart/ChartView';
import './App.css';

class App extends Component {

  componentDidMount(){
    const { data: { usage, range } } = this.props;
    this.props.dispatch(updateChartAction(buildCumulativeCustomerUsage(usage, range)))
  }

  render() {
    const { data: { title } } = this.props;
    return (
      <div className="App">
        <div className="App-header">
          <img src="/assets/logo.jpg" className="App-logo" alt="logo" />
          <h2>{title}</h2>
        </div>
        <div className="App-Content">
          <ChartView height={600} width={800} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  data: getData(state)
});

export default connect(mapStateToProps)(App);
