import { put, select, take, takeEvery, call, fork, spawn, delay, all } from 'redux-saga/effects'
import * as type from '../types'
import * as selectors from '../selectors'
import { setQuestions } from '../actions/questions'
import { setUserMessageToStore } from '../actions/messages'
import { setUsers, setNewUser } from '../actions/users'
import { 
    setQuiz, 
    setQuizWaiting, 
    setCurrentQuestion, 
    setResults, 
    setUsersResultsList 
} from '../actions/quiz'
import { 
    sendAddQuestionsRequest, 
    findCurrentUser, 
    sendAddUsersRequest, 
    sendAddNewUserToBase,
    sendQuizReadiness,
    sendUnsetQuizReadiness,
    setResultsList,
    getResultsList,
    sendMessage,
    sendMessageRequest,
    getMessages
} from '../../firebase/quizMethods'
import * as eventChannels from './eventChannels/eventChannels';


export function* handleQuestions() {    
    try {
        const results = yield call(sendAddQuestionsRequest)
        yield put(setQuestions(results))  
    }
    catch {
        yield put({ type: type.SET_QUESTIONS_FAILED, payload: 'handleQuestions error'})
    }
}

export function* handleUsers() {    
    try {
        const getUser = yield select(selectors.getUser)
        const results = yield sendAddUsersRequest(getUser)
        if (results.length === 0) yield put(setUsers([getUser]))
        else yield put(setUsers(results[0].users)) 
    }
    catch {
        yield put({ type: type.SET_USERS_FAILED, payload: 'handleUsers error'})
    }
}



export function* handleNewUser() {    
    try {
        const getUser = yield select(selectors.getUser)
        const getAllUsers = yield select(selectors.getAllUsers)
        const isUserInList = yield findCurrentUser(getUser, getAllUsers)
        if (!isUserInList) yield put(setNewUser(getUser))
        const getUpdatedAllUsers = yield select(selectors.getAllUsers)
        yield sendAddNewUserToBase(getUpdatedAllUsers)
    }
    catch {
        yield put({ type: type.SET_USERS_FAILED, payload: 'handleNewUser error'})
    }
}


export function* handleQuizReadiness() {    
    try {
        const getUser = yield select(selectors.getUser)
        const getAllUsers = yield select(selectors.getAllUsers)
        const getUsersReady = yield sendQuizReadiness(getUser.googleId)
        if (getUsersReady.length === getAllUsers.length) {
            yield put(setQuiz(true))   
        } else yield put(setQuizWaiting(true)) 
    }
    catch {
        yield put({ type: type.SET_IS_USER_READY_TO_QUIZ_FAILED, payload: 'handleQuizReadiness error'})
    }
}

export function* handleUnsetQuizReadiness() {    
    try {
        const getUser = yield select(selectors.getUser)
        yield sendUnsetQuizReadiness(getUser.googleId)
    }
    catch {
        yield put({ type: type.UNSET_IS_USER_READY_TO_QUIZ_FAILED, payload: 'handleUnsetQuizReadiness error'})
    }
}

export function* handleSingleQuestions() {    
    try {
        const counter = yield select(selectors.getAnswers);
        const getQuestions = yield select(selectors.getQuestions)
        if (counter.length < getQuestions.length) {
            yield delay(500)
            yield put(setCurrentQuestion(getQuestions[counter.length]))
        } else {
            yield delay(500)
            yield put(setResults(true))
        }
    }
    catch {
        yield put({ type: type.SET_QUESTIONS_FAILED, payload: 'handleSingleQuestions error'})
    }
}

export function* handlResults() {    
    try {
        const getUser = yield select(selectors.getUser)
        const getScore = yield select(selectors.getScore)
        yield setResultsList(getUser, getScore);
        const getResults = yield call(getResultsList)
        yield put(setUsersResultsList(getResults))
        
    }
    catch {
        yield put({ type: type.SET_QUIZ_RESULTS_FAILED, payload: 'handlResults error'})
    }
}

export function* watchQuestions() {
    yield takeEvery(type.SIGN_IN, handleQuestions)
}

export function* watchUsers() {
    yield takeEvery(type.SIGN_IN, handleUsers)
    yield takeEvery(type.SET_USERS, handleNewUser)
}

export function* watchQuiz() {
    yield all([
        fork(startListener),
        takeEvery(type.SET_IS_USER_READY_TO_QUIZ, handleQuizReadiness),
        takeEvery(type.UNSET_IS_USER_READY_TO_QUIZ, handleUnsetQuizReadiness),
        takeEvery(type.SET_IS_USER_READY_TO_QUIZ, handleSingleQuestions),
        takeEvery(type.SET_ANSWER, handleSingleQuestions),
        takeEvery(type.SET_QUIZ_RESULTS, handlResults),
    ]);
};


export function* handleMessageRequest() {
        const getMessagesFromDb = yield call(getMessages) 
        yield setUserMessages(getMessagesFromDb) 
}

export function* handleSendMessages() {
    try {
        const getUser = yield select(selectors.getUser)
        const getMessage = yield select(selectors.getMessage)
        const getMessagesId = yield sendMessageRequest()
        yield sendMessage(getMessagesId, getUser, getMessage)     
    }
    catch {
        yield put({ type: type.SET_USER_MESSAGE_FAILED, payload: 'handleSendMessages error'})
    }
}


export function* setUserMessages(array) {
    if (array.length) { 
        const filteredMessagesList = array.filter(message => message.createdAt);
        filteredMessagesList.length && (yield put(setUserMessageToStore(filteredMessagesList)));
    }
}

export function* setUserResults(array) {
    if (array.length) { 
        yield put(setUsersResultsList(array))
    }
}



export function* startListener() {
    const chatMessagesChannel = eventChannels.chatMessagesEventChannel();
    while (true) {
        const eventAction = yield take(chatMessagesChannel);
        yield put(eventAction);
    }
}
export function* startListenerResults() {
    const resultsEventChannel = eventChannels.resultsEventChannel();
    while (true) {
        const eventAction = yield take(resultsEventChannel);
        console.log(eventAction)
        yield put(eventAction);
    }
}
export function* watchChat() {
    yield all([
        fork(startListener),
        takeEvery(type.SEND, handleSendMessages),
        takeEvery(type.SEND, setUserMessages)
    ]);
};

export function* watchResults() {
    yield all([
        fork(startListenerResults),
        takeEvery(type.SET_QUIZ_RESULTS, setUserResults)
    ]);
};

export default function* rootSaga() {
   yield spawn(watchQuestions)
   yield spawn(watchUsers)  
   yield spawn(watchQuiz)   
   yield spawn(watchChat)     
   yield spawn(watchResults)  
}

