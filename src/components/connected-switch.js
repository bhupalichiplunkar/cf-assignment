import { connect } from 'react-redux';
import { Switch } from 'react-router';

const mapStateToProps = ({ location }) => 
  ({ location });

export default connect(mapStateToProps)(Switch);