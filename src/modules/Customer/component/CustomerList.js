import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import CustomerCard from './CustomerCard';
import customerShape from './CustomerShape';
import { getCustomers } from '../CustomerReducer';
import './Customer.css';

class CustomerList extends Component {
  render() {
    const { customers, width } = this.props;
    return (
      <div className="CustomerList" style={{width}}>
        {customers && customers.length !== 0 ?
            customers.map(customer => <CustomerCard key={customer.salesforceId} customer={customer} width={width} />) : 'No customers found with these criteria'}
      </div>);
  }
}

CustomerList.propTypes = {
  width: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  customers: PropTypes.arrayOf(customerShape)
};

const mapStateToProps = state => ({
  customers: getCustomers(state)
});

export default connect(mapStateToProps)(CustomerList);
