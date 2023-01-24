import { connect } from 'react-redux';
import Component from './authentification';
import * as selectors from '../../redux/selectors';

const mapStateToProps = state => ({
    clientId: selectors.clientId(state),
});

export default connect(mapStateToProps, null)(Component);
