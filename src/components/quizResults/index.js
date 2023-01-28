import { connect } from 'react-redux';
import Component from './QuizResults';
import * as quizActions from '../../redux/actions/quiz';
import * as selectors from '../../redux/selectors';

const mapStateToProps = state => ({
    quizResult: selectors.quizResult(state),
    resultsList: selectors.resultsList(state)
});

const mapDispatchToProps = dispatch => ({
    setQuizResult: (payload) => dispatch(quizActions.setResults(payload)),
    setQuiz: (payload) => dispatch(quizActions.setQuiz(payload)),
    unSetAnswers: () => dispatch(quizActions.unSetAnswers()),
    unSetIsUserReadyToStartQuiz: () => dispatch(quizActions.unSetIsUserReadyToStartQuiz()),
    resetInitialState: () => dispatch(quizActions.resetInitialState())
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
