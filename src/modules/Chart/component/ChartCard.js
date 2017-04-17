import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { getChart, getCustomer } from '../ChartReducer';
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import ChartView from './ChartView';
import chartShape from './ChartShape';
import CustomerView from '../../Customer/component/CustomerView';
import customerShape from '../../Customer/component/CustomerShape';

import './Chart.css';

const ChartCard = (props) => {
  const { chart, customer, width} = props;
  const dimensions = {
    height: (props.width * 9 / 16),
    width
  };
  return (
    <Card className="Chart-card" style={{maxWidth: width}}>
      <CardMedia className="Chart">
        {chart ?
          <ChartView height={dimensions.height} width={width} chart={chart}/> :
          <div className="loading" style={dimensions}>Loading...</div>}
      </CardMedia>
      <CardTitle title={chart ? chart.title : null} subtitle={chart ? chart.subtitle : null}/>
      <CardText>
        {chart ? chart.description : null}
        {customer ? <CustomerView details={customer} /> : null}
      </CardText>
    </Card>);
};

ChartCard.propTypes = {
  chart: chartShape,
  customer: customerShape,
  width: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  chart: getChart(state),
  customer: getCustomer(state),
});

export default connect(mapStateToProps)(ChartCard);