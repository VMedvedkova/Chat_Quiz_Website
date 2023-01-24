import * as type from '../types'

export function signIn(payload) {
    return {
        type: type.SIGN_IN,
        payload
    }
}

export function signOut() {
    return {
        type: type.SIGN_OUT,
        payload: null
    }
}
export function setAnswer(payload) {
    return {
        type: type.SET_ANSWER,
        payload
    }
}
export function setCurrentQuestion(payload) {
    return {
        type: type.SET_CURRENT_QUESTION,
        payload
    }
}
export function setResults(payload) {
    return {
        type: type.SET_QUIZ_RESULTS,
        payload
    }
}


