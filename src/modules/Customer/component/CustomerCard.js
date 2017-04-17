import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import CustomerView from '../../Customer/component/CustomerView';
import customerShape from '../../Customer/component/CustomerShape';
import * as stringTools from '../../../util/stringTools';
import './Customer.css';

const CustomerCard = (props) => (
    <Card className="Chart-card" style={{maxWidth: props.width}}>
      <CardTitle title={stringTools.capitalizeFirstLetter(props.customer.name)} />
      <CardText>
        <CustomerView details={props.customer} />
      </CardText>
    </Card>
);

CustomerCard.propTypes = {
  customer: customerShape,
  width: PropTypes.number.isRequired,
};

export default CustomerCard;