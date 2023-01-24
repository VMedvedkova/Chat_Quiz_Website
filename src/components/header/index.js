import { connect } from 'react-redux';
import Component from './Header';
import * as usersActions from '../../redux/actions/currentUser';
import * as selectors from '../../redux/selectors';

const mapStateToProps = state => ({
    user: selectors.getUser(state),
});

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(usersActions.signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
