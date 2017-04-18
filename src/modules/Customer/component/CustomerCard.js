import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import CustomerView from '../../Customer/component/CustomerView';
import customerShape from '../../Customer/component/CustomerShape';
import { updateCustomerAction } from '../../Control/ControlActions';
import * as stringTools from '../../../util/stringTools';
import './Customer.css';

const CustomerCard = (props) => {

  const displayCustomerChart = () => {
    props.dispatch(updateCustomerAction(props.customer));
  };

   return (
     <Card className="Chart-card" style={{maxWidth: props.width}} onTouchTap={displayCustomerChart}>
      <CardTitle title={stringTools.capitalizeFirstLetter(props.customer.name)} />
      <CardText>
        <CustomerView details={props.customer} />
      </CardText>
    </Card>
   );
};

CustomerCard.propTypes = {
  customer: customerShape,
  width: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(CustomerCard);