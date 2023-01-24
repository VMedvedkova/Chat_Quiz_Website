import { combineReducers } from 'redux';
import users from './users';
import questionsList from './questions';
import errors from './errors';
import currentUser from './currentUser';
import quizReducer from './quizReducer';

const rootReducer = combineReducers({ 
    users,
    questionsList,
    currentUser,
    errors,
    quizReducer   
})

export default rootReducer