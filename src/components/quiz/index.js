import { connect } from 'react-redux';
import Component from './Quiz';
import * as quizActions from '../../redux/actions/quiz';
import * as selectors from '../../redux/selectors';

const mapStateToProps = state => ({
    setQuiz: selectors.setQuiz(state),
    getQuestions: selectors.getQuestions(state),
    getAnswers: selectors.getAnswers(state),
    currentQuestion: selectors.setCurrentQuestion(state),
    isUserReadyToStartQuiz: selectors.isUserReadyToStartQuiz(state),        
    quizResult: selectors.quizResult(state),
});

const mapDispatchToProps = dispatch => ({
    setAnswer: (payload) => dispatch(quizActions.setAnswer(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
