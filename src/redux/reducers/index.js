import { combineReducers } from 'redux';
import users from './users';
import questionsList from './questions';
import errors from './errors';
import currentUser from './currentUser';
import quizReducer from './quizReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({ 
    users,
    questionsList,
    currentUser,
    errors,
    quizReducer,
    chatReducer 
})

export default rootReducer