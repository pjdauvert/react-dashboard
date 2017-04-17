import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import ChartView from './ChartView';
import { chartShape } from './ChartShape';
import { getChart } from '../ChartReducer';
import './Chart.css';

const ChartCard = (props) => (
  <Card className="Chart-card" style={{ maxWidth: props.width }} >
    <CardMedia className="Chart">
      {props.chart ? <ChartView height={props.width * 9 / 16} width={props.width} chart={props.chart} /> : <div className="loading">Loading...</div>}
    </CardMedia>
    <CardTitle title={props.chart ? props.chart.title : null} subtitle={props.chart ? props.chart.subtitle : null} />
    <CardText>
      {props.chart ? props.chart.description : null}
    </CardText>
  </Card>
);

ChartCard.propTypes = {
  chart: chartShape,
  width: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  chart: getChart(state)
});

export default connect(mapStateToProps)(ChartCard);