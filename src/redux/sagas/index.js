import React, { useState, useEffect } from 'react';
import { put, select, takeEvery, call, fork, spawn } from 'redux-saga/effects'
import * as type from '../types'
import * as selectors from '../selectors'
import { getQestions, getUsers } from '../../api'
import { setQuestions } from '../actions/questions'
import { setUsers, setNewUser } from '../actions/users'
import { setIsUserReadyToStartQuiz, setQuiz } from '../actions/quiz'
import { setCurrentQuestion, setResults } from '../actions/currentUser'
import { 
    sendAddQuestionsRequest, 
    findCurrentUser, 
    sendAddUsersRequest, 
    sendAddNewUserToBase,
    sendQuizReadiness,
    sendUnsetQuizReadiness
} from '../../firebase/quizMethods'


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
        yield put(setUsers(results))  
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
        console.log('getUsersReady', getUsersReady)
        console.log('getAllUsers', getAllUsers.length)
        if (getUsersReady === getAllUsers.length) {
            yield put(setQuiz(true))  
        }
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
        console.log(getQuestions)
        
        if (counter.length < getQuestions.length) {
            yield put(setCurrentQuestion(getQuestions[counter.length]))
        } else {
            yield put(setResults("1"))
        }
    }
    catch {
        yield put({ type: type.SET_QUESTIONS_FAILED, payload: 'handleSingleQuestions error'})
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
    yield takeEvery(type.SET_IS_USER_READY_TO_QUIZ, handleQuizReadiness)
    yield takeEvery(type.UNSET_IS_USER_READY_TO_QUIZ, handleUnsetQuizReadiness)
    yield takeEvery(type.SET_QUESTIONS, handleSingleQuestions)
    yield takeEvery(type.SET_ANSWER, handleSingleQuestions)
}

export default function* rootSaga() {
   yield spawn(watchQuestions)
   yield spawn(watchUsers)  
   yield spawn(watchQuiz)  
}

