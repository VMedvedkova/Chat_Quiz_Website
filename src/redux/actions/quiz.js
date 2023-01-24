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
export function setQuiz() {
    return {
        type: type.SET_QUIZ
    }
}
