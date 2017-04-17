import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import { getControlsCustomer } from '../ControlReducer';
import { updateCustomerAction } from '../ControlActions';
import './Control.css';

class ControlCard extends Component {

  state = {
    searchText: '',
  };

  componentWillReceiveProps(props) {
    if(this.state.searchText === '' && props.customer) this.setState({ searchText: props.customer.name });
  };

  handleUpdateInput = (searchText) => {
    this.setState({ searchText });
  };

  handleNewRequest = () => {
    const selectedCustomer = this.props.customers.find(customer => customer.name === this.state.searchText);
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
      <CardTitle title="Filter Data"/>
      <CardText>
        <div className="searchField">
          <AutoComplete
            floatingLabelText="Customer name"
            searchText={this.state.searchText}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
            dataSource={customers.map(customer => customer.name)}
            filter={AutoComplete.caseInsensitiveFilter}
            openOnFocus
            maxSearchResults={10}
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