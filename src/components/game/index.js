import { connect } from 'react-redux';
import Component from './Game';
import * as quizActions from '../../redux/actions/quiz';
import * as selectors from '../../redux/selectors';

const mapStateToProps = state => ({
    setQuiz: selectors.setQuiz(state),
    setQuizWaiting: selectors.setQuizWaiting(state),
    getQuestions: selectors.getQuestions(state),
    getAnswers: selectors.getAnswers(state),
    currentQuestion: selectors.setCurrentQuestion(state),    
    quizResult: selectors.quizResult(state),
    correctAnswerCount: selectors.getCorrectAnswerCount(state),
    isUserReadyToStartQuiz: selectors.isUserReadyToStartQuiz(state)
});

const mapDispatchToProps = dispatch => ({
    setAnswer: (payload) => dispatch(quizActions.setAnswer(payload)),
    setCorrectAnswerCount: (payload) => dispatch(quizActions.setCorrectAnswerCount(payload)),
    unSetIsUserReadyToStartQuiz: () => dispatch(quizActions.unSetIsUserReadyToStartQuiz())
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
