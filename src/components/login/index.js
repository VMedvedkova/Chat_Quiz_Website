import { connect } from 'react-redux';
import Component from './Login';
import * as usersActions from '../../redux/actions/currentUser';
import * as selectors from '../../redux/selectors';

const mapStateToProps = state => ({
    clientId: selectors.clientId(state)
});

const mapDispatchToProps = dispatch => ({
    signIn: (payload) => dispatch(usersActions.signIn(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
