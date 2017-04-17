import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { getData } from './AppReducer';
import { connect } from 'react-redux';

//Theming
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as theming from './theming';

// components
import ChartCard from '../Chart/component/ChartCard';
import ControlCard from '../Control/component/ControlCard';

// actions
import { showCumulativeChart, showCustomerChart, showCustomerStats } from '../Chart/ChartActions';
import { getControlsCustomer } from '../Control/ControlReducer';

import './App.css';

class App extends Component {

  componentWillReceiveProps(props){
    const { customer, dispatch, data: { usage, range, globals } } = props;
    if(!customer || customer === null) showCumulativeChart(usage, range)(dispatch);
    else {
      showCustomerChart(customer, usage, range)(dispatch);
      showCustomerStats(customer, globals)(dispatch);
    }
  }

  componentDidMount(){
    const { dispatch, data: { usage, range } } = this.props;
    showCumulativeChart(usage, range)(dispatch);
  }

  render() {
    const muiTheme = getMuiTheme({
      fontFamily: theming.fontFamily,
      palette: {
        primary1Color: theming.primaryColor,
        primary2Color: theming.primaryColorDark,
        primary3Color: theming.primaryColorLight,
        accent1Color: theming.accentColor,
        accent2Color: theming.accentColorDark,
        accent3Color: theming.secondaryColor,
        textColor: theming.textColor,
        alternateTextColor: theming.whiteColor,
        canvasColor: theming.whiteColor,
        userAgent: navigator.userAgent
      }
    });
    return (<MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
          <div className="App-header">
            <img src="/assets/logo.svg" className="App-logo" alt="logo" />
            <div className="App-menu">
            </div>
          </div>
          <div className="App-content">
            <ControlCard customers={this.props.data.customers} periods={Object.keys(this.props.data.globals)} />
            <ChartCard width={800} />
          </div>
        </div>
    </MuiThemeProvider>);
  }
}

App.propTypes = {
  data: PropTypes.object.isRequired,
  customer: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  data: getData(state),
  customer: getControlsCustomer(state)
});

export default connect(mapStateToProps)(App);
