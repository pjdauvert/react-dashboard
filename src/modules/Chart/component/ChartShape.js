import { PropTypes } from 'prop-types';

export default PropTypes.shape({
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  chartData: PropTypes.arrayOf(PropTypes.object).isRequired,
  chartSeries: PropTypes.arrayOf(PropTypes.object).isRequired,
  x: PropTypes.func.isRequired,
  xScale: PropTypes.string.isRequired
});