import { connect } from 'react-redux';
import Component from './QuizResults';
import * as userActions from '../../redux/actions/currentUser';
import * as selectors from '../../redux/selectors';

const mapStateToProps = state => ({
    quizResult: selectors.quizResult(state)
});

const mapDispatchToProps = dispatch => ({
    setAnswer: (payload) => dispatch(userActions.setAnswer(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
