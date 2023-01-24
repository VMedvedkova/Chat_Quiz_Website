import * as type from '../types'

const initialState = {
    isUserReadyToStartQuiz: false,
    setQuiz: false
}

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case type.SET_IS_USER_READY_TO_QUIZ:
            return {
                ...state,
                isUserReadyToStartQuiz: true
            }
            case type.UNSET_IS_USER_READY_TO_QUIZ:
                return {
                    ...state,
                    isUserReadyToStartQuiz: false
                }
            case type.SET_QUIZ:
                return {
                    ...state,
                    setQuiz: true
                }
        default:
            return {
                ...state
            }
    }
}