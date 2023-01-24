import { connect } from 'react-redux';
import Component from './Game';
import * as userActions from '../../redux/actions/currentUser';
import * as selectors from '../../redux/selectors';

const mapStateToProps = state => ({
    setQuiz: selectors.setQuiz(state),
    getQuestions: selectors.getQuestions(state),
    getAnswers: selectors.getAnswers(state),
    currentQuestion: selectors.setCurrentQuestion(state),    
    quizResult: selectors.quizResult(state)
});

const mapDispatchToProps = dispatch => ({
    setAnswer: (payload) => dispatch(userActions.setAnswer(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
