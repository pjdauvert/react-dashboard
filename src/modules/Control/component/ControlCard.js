import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import { getControlsCustomer } from '../ControlReducer';
import { updateCustomerAction } from '../ControlActions';
import * as stringTools from '../../../util/stringTools';
import './Control.css';

class ControlCard extends Component {

  state = {
    searchText: '',
  };

  componentWillReceiveProps(props) {
    if(this.state.searchText === '' && props.customer) this.setState({ searchText: props.customer.name.toLowerCase() });
  };

  handleUpdateInput = (searchText) => {
    this.setState({ searchText });
  };

  handleNewRequest = () => {
    const selectedCustomer = this.props.customers.find(customer => customer.name.toLowerCase() === this.state.searchText.toLowerCase());
    if(!selectedCustomer) this.handleReset();
    else this.props.dispatch(updateCustomerAction(selectedCustomer));
  };

  handleReset = () => {
    this.setState({ searchText: '' });
    this.props.dispatch(updateCustomerAction(null));
  };

  render() {
    const { customers } = this.props;
    return <Card className="Control-card">
      <CardTitle title="View Options"/>
      <CardText>
        <div className="searchField">
          <AutoComplete
            floatingLabelText="Customer name"
            searchText={this.state.searchText}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
            dataSource={customers.map(customer => stringTools.capitalizeFirstLetter(customer.name)).sort()}
            filter={AutoComplete.caseInsensitiveFilter}
            openOnFocus
            //maxSearchResults={5}
            menuProps={{ maxHeight: 250, width: 256}}
          />
          <IconButton style={{ marginLeft: '-16px' }} touch onTouchTap={this.handleReset}>
            <CloseIcon />
          </IconButton>
        </div>
      </CardText>
    </Card>
  }
}

ControlCard.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
  customer: PropTypes.object
};

const mapStateToProps = state => ({
  customer: getControlsCustomer(state)
});

export default connect(mapStateToProps)(ControlCard);