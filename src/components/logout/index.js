import { connect } from 'react-redux';
import Component from './Logout';
import * as usersActions from '../../redux/actions/currentUser';
import * as quizActions from '../../redux/actions/quiz';
import * as selectors from '../../redux/selectors';

const mapStateToProps = state => ({
    user: selectors.getUser(state),
    clientId: selectors.clientId(state),
});

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(usersActions.signOut()),
    resetInitialState: () => dispatch(quizActions.resetInitialState())
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
