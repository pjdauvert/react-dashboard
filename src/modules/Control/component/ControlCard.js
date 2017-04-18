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
import { getControlsCustomer, getControlsVariation } from '../ControlReducer';
import { updateCustomerAction, updateVariationAction } from '../ControlActions';
import * as stringTools from '../../../util/stringTools';
import './Control.css';

class ControlCard extends Component {

  state = {
    searchText: '',
    customersList: this.props.customers,
    period: this.props.periods[0],
    tolerance: null,
    group: 0,
  };
  
  componentWillReceiveProps(props) {
    if (props.customer && props.customer !== null && props.customer.name !== this.state.searchText){
      this.setState({searchText: stringTools.capitalizeFirstLetter(props.customer.name), tolerance: null});
    }
    else if (props.variation && props.variation !== null && props.variation.tolerance !== this.state.tolerance) {
      const { tolerance, period, group } = props.variation;
      this.setState({tolerance, group, period, searchText: ''});
    }
  };

  updateVariation(){
    const { period, tolerance, group } = this.state;
    const variation = { period, tolerance, group };
    this.props.dispatch(updateVariationAction(variation));
  }
  
  handleUpdateInput = (searchText) => {
    this.setState({searchText});
  };

  handleGroupChange = (event, group) => {
    this.setState({group}, this.updateVariation);
  };

  handleToleranceInputChange = (event, tolerance) => {
    const formattedTolerance = Number(tolerance) || null;
    if(tolerance < 0) this.setState({tolerance: null}, this.updateVariation);
    else this.setState({tolerance: formattedTolerance, searchText: ''}, () => {
      this.updateVariation();
    });
  };

  handlePeriodChange = (event, index, period) => {
    this.setState({period}, this.updateVariation);
  };

  handleNewRequest = () => {
    const selectedCustomer = this.props.customers.find(customer => customer.name.toLowerCase() === this.state.searchText.toLowerCase());
    if (!selectedCustomer) this.handleResetSearch();
    else {
      this.props.dispatch(updateCustomerAction(selectedCustomer));
    }
  };

  handleResetSearch = () => {
    if(this.state.searchText !== '') {
      this.setState({searchText: ''}, () => this.props.dispatch(updateCustomerAction(null)));
    }
  };

  handleResetVariation = () => {
    if(this.state.tolerance !== null) {
      this.setState({tolerance: null}, this.updateVariation);
    }
  };

  render() {
    return (
      <Card className="Control-card">
        <CardTitle title="View Options" subtitle="Use controls below to filter customers"/>
        <CardText>
          <div className="searchField">
            <AutoComplete
              textFieldStyle={{width: 224}}
              floatingLabelText="Customer name"
              searchText={this.state.searchText}
              onUpdateInput={this.handleUpdateInput}
              onNewRequest={this.handleNewRequest}
              dataSource={this.state.customersList.map(customer => stringTools.capitalizeFirstLetter(customer.name)).sort()}
              filter={AutoComplete.caseInsensitiveFilter}
              openOnFocus
              menuProps={{maxHeight: 250, width: 256}}
            />
            <IconButton style={{marginLeft: '-16px'}} touch onTouchTap={this.handleResetSearch}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="variationControl">
            <h2>Select period and variation rate below to list customers accordingly</h2>
            <div className="variationField">
              <TextField
              type="number"
              floatingLabelText="Variation tolerance (%)"
              onChange={this.handleToleranceInputChange}
              value={this.state.tolerance === null ? '' : this.state.tolerance}
              />
              <IconButton style={{marginLeft: '-16px'}} touch onTouchTap={this.handleResetVariation}>
                <CloseIcon />
              </IconButton>
            </div>
            <SelectField
              floatingLabelText="Period"
              value={this.state.period}
              onChange={this.handlePeriodChange}
              disabled={this.state.tolerance === null}
            >
              {this.props.periods.map(p => <MenuItem key={p} value={p} primaryText={p} />)}
            </SelectField>
            <SelectField
              floatingLabelText="Variation Group"
              value={this.state.group}
              onChange={this.handleGroupChange}
              disabled={this.state.tolerance === null}
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
  customer: PropTypes.object,
  variation: PropTypes.shape({
    tolerance: PropTypes.number,
    group: PropTypes.number.isRequired,
    period: PropTypes.string.isRequired
  })
};

const mapStateToProps = state => ({
  customer: getControlsCustomer(state),
  variation: getControlsVariation(state)
});

export default connect(mapStateToProps)(ControlCard);