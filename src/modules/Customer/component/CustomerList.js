import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { getControlsVariation } from '../../Control/ControlReducer';

class CustomerList extends Component {
  render() {
    return (<div>Customer List</div>);
  }
}

CustomerList.propTypes = {
  width: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  variation: PropTypes.shape({
    tolerance: PropTypes.number,
    group: PropTypes.number.isRequired,
    period: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => ({
  variation: getControlsVariation(state)
});

export default connect(mapStateToProps)(CustomerList);
