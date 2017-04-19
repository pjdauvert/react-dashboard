import React from 'react';
import customerShape from './CustomerShape';
import { formatPercent } from '../../../util/stringTools';
import * as theming from '../../App/theming';
import './Customer.css'

const renderStat = (period, stat) => (
    <tr key={period}>
      <td>{period}</td>
      <td>{stat.predictedUsage}</td>
      <td>{stat.actualUsage}</td>
      <td style={{ color: stat.delta >= 0 ? theming.primaryColor : theming.accentColor}}>
        {formatPercent(stat.delta, 2)}
      </td>
    </tr>
  );


const CustomerView = (props) => (
  <div className="Customer">
    <div className="Info">
      <span>Owner: {props.details.owner}</span>
      <span>Manager: {props.details.manager}</span>
      <span>Country: {props.details.country}</span>
    </div>
    <div className="Stats">
      <table>
        <thead><tr><th>Period</th><th>Predicted Usage</th><th>Actual Usage</th><th>Variation</th></tr></thead>
        <tbody>{Object.keys(props.details.usage).map(key => renderStat(key, props.details.usage[key]))}</tbody>
      </table>
    </div>
  </div>
);

CustomerView.propTypes = {
  details: customerShape
};

export default CustomerView;