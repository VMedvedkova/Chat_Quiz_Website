import * as type from '../types'

const initialState = {
    usersError: '',
    questionsError: '',
    quizReadinessError: ''
}

const errors = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_USERS_FAILED: 
            return {
                ...state,
                usersError: action.payload
            }
        case type.SET_QUESTIONS_FAILED: 
            return {
                ...state,
                questionsError: action.payload
            }
        case type.SET_IS_USER_READY_TO_QUIZ_FAILED: 
            return {
                ...state,
                quizReadinessError: action.payload
            }
        default: return state
    }
}

export default errors
