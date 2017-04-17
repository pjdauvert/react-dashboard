import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { getData } from './AppReducer';
import { connect } from 'react-redux';

//Theming
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as theming from './theming';

// chart interactions
import ChartCard from '../Chart/component/ChartCard';
import { buildCumulativeCustomerUsage } from '../../util/chartDataBuilder';
import { updateChartAction } from '../../modules/Chart/ChartActions';

import './App.css';

class App extends Component {

  componentDidMount(){
    const { data: { usage, range } } = this.props;
    this.props.dispatch(updateChartAction(buildCumulativeCustomerUsage(usage, range)))
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
            <ChartCard width={800} />
          </div>
        </div>
    </MuiThemeProvider>);
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
