import React from 'react';
import { PropTypes } from 'prop-types';
import { BarGroupChart } from 'react-d3-basic';
import { chartShape } from './ChartShape';

const ChartView = props => (
  <BarGroupChart
    width={props.width}
    height={props.height}
    legendClassName="Test"
    showXGrid={false}
    data={props.chart.chartData}
    chartSeries={props.chart.chartSeries}
    x={props.chart.x}
    xScale={props.chart.xScale}
  />);

ChartView.propTypes = {
  chart: chartShape.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

export default ChartView;
