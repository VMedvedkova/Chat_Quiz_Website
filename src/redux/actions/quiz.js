import * as type from '../types'

export function setIsUserReadyToStartQuiz() {
    return {
        type: type.SET_IS_USER_READY_TO_QUIZ
    }
}
export function unSetIsUserReadyToStartQuiz() {
    return {
        type: type.UNSET_IS_USER_READY_TO_QUIZ
    }
}
export function setQuiz(payload) {
    return {
        type: type.SET_QUIZ,
        payload
    }
}
export function setQuizWaiting(payload) {
    return {
        type: type.SET_QUIZ_WAITING,
        payload
    }
}

export function setAnswer(payload) {
    return {
        type: type.SET_ANSWER,
        payload
    }
}
export function unSetAnswers() {
    return {
        type: type.UNSET_ANSWER
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
export function setCorrectAnswerCount() {
    return {
        type: type.SET_CORRECT_ANSWER_COUNT
    }
}
export function resetInitialState() {
    return {
        type: type.RESET_INITIAL_STATE
    }
}
export function setUsersResultsList(payload) {
    return {
        type: type.SET_USERS_RESULTS_LIST,
        payload
    }
}



