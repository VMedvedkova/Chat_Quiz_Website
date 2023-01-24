import { connect } from 'react-redux';
import Component from './ReadyForQuiz';
import * as quizActions from '../../redux/actions/quiz';
import * as selectors from '../../redux/selectors';

const mapStateToProps = state => ({
    user: selectors.getUser(state),
    isUserReadyToStartQuiz: selectors.isUserReadyToStartQuiz(state)
});

const mapDispatchToProps = dispatch => ({
    setIsUserReadyToStartQuiz: () => dispatch(quizActions.setIsUserReadyToStartQuiz()),
    unSetIsUserReadyToStartQuiz: () => dispatch(quizActions.unSetIsUserReadyToStartQuiz())
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
