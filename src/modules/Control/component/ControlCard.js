import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import { getControlsCustomer } from '../ControlReducer';
import { updateCustomerAction } from '../ControlActions';
import * as stringTools from '../../../util/stringTools';
import './Control.css';

class ControlCard extends Component {

  state = {
    searchText: '',
    customersList: this.props.customers,
    variationPeriod: this.props.periods[0],
    variationTolerance: null,
    variationGroup: 0,
  };

  componentWillReceiveProps(props) {
    if (this.state.searchText === '' && props.customer) this.setState({searchText: props.customer.name.toLowerCase()});
  };

  handleUpdateInput = (searchText) => {
    this.setState({searchText});
  };

  handleVariationGroupChange = (event, variationGroup) => {
    this.setState({variationGroup});
  };

  handleToleranceInputChange = (event, tolerance) => {
    const variationTolerance = Number(tolerance) || null;
    if(variationTolerance < 0) this.setState({variationTolerance: null});
    else this.setState({variationTolerance});
  };

  handleVariationPeriodChange = (event, index, variationPeriod) => {
    this.setState({variationPeriod});
  };

  handleNewRequest = () => {
    const selectedCustomer = this.props.customers.find(customer => customer.name.toLowerCase() === this.state.searchText.toLowerCase());
    if (!selectedCustomer) this.handleReset();
    else this.props.dispatch(updateCustomerAction(selectedCustomer));
  };

  handleReset = () => {
    this.setState({searchText: ''});
    this.props.dispatch(updateCustomerAction(null));
  };

  render() {
    return (
      <Card className="Control-card">
        <CardTitle title="View Options" subtitle="Use controls below to filter customers"/>
        <CardText>
          <div className="searchField">
            <AutoComplete
              floatingLabelText="Customer name"
              searchText={this.state.searchText}
              onUpdateInput={this.handleUpdateInput}
              onNewRequest={this.handleNewRequest}
              dataSource={this.state.customersList.map(customer => stringTools.capitalizeFirstLetter(customer.name)).sort()}
              filter={AutoComplete.caseInsensitiveFilter}
              openOnFocus
              //maxSearchResults={5}
              menuProps={{maxHeight: 250, width: 256}}
            />
            <IconButton style={{marginLeft: '-16px'}} touch onTouchTap={this.handleReset}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="variationControl">
            <h2>Select period and variation rate below to list customers accordingly</h2>
            <SelectField
              floatingLabelText="Period"
              value={this.state.variationPeriod}
              onChange={this.handleVariationPeriodChange}
            >
              {this.props.periods.map(p => <MenuItem key={p} value={p} primaryText={p} />)}
            </SelectField>
            <TextField
              type="number"
              floatingLabelText="Variation tolerance (%)"
              onChange={this.handleToleranceInputChange}
            />
            <SelectField
              floatingLabelText="Variation Group"
              value={this.state.variationGroup}
              onChange={this.handleVariationGroupChange}
              disabled={this.state.variationTolerance === null}
            >
              <MenuItem value={0} primaryText="Within" />
              <MenuItem value={1} primaryText="Above" />
              <MenuItem value={2} primaryText="Below" />
            </SelectField>
          </div>
        </CardText>
      </Card>
    );
  }
}

ControlCard.propTypes = {
  periods: PropTypes.arrayOf(PropTypes.string).isRequired,
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