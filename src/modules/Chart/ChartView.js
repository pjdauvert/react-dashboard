import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Chart } from 'react-d3-core';
import { LineChart } from 'react-d3-basic';
import { getChart } from './ChartReducer';

const ChartView = props => {

  const { width, height, chart: { title, chartData, chartSeries, x } } = props;
  return (<Chart>
    title={title}
    width={width}
    height={height}
    <LineChart
      title={title}
      width={width}
      height={height}
      data={chartData}
      chartSeries={chartSeries}
      x={x}
    />
  </Chart>);
};

ChartView.propTypes = {
  chart: PropTypes.shape({
    title: PropTypes.string.isRequired,
    chartData: PropTypes.arrayOf({}).isRequired,
    chartSeries: PropTypes.arrayOf({}).isRequired,
    x: PropTypes.func.isRequired
  }).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  chart: getChart(state)
});

export default connect(mapStateToProps)(ChartView);
