import { PropTypes } from 'prop-types';

export default PropTypes.shape({
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  manager: PropTypes.string.isRequired,
  usage: PropTypes.object
});