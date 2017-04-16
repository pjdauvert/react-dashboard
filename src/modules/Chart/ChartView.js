import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { LineChart } from 'react-d3-basic';
import { getChart } from './ChartReducer';
import './Chart.css';

const ChartView = props => {

  const { width, height, chart } = props;
  return (
    <div className="Chart">
      {chart ?
          <LineChart
            title={chart.title}
            width={width}
            height={height}
            showXGrid={false}
            interpolate="monotone"
            data={chart.chartData}
            chartSeries={chart.chartSeries}
            x={chart.x}
            xScale="time"
          /> :
        'Loading...'}
    </div>
    );
};

ChartView.propTypes = {
  chart: PropTypes.shape({
    title: PropTypes.string.isRequired,
    chartData: PropTypes.arrayOf(PropTypes.object).isRequired,
    chartSeries: PropTypes.arrayOf(PropTypes.object).isRequired,
    x: PropTypes.func.isRequired
  }),
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  chart: getChart(state)
});

export default connect(mapStateToProps)(ChartView);
