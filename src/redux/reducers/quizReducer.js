import * as type from '../types'

const initialState = {
    isUserReadyToStartQuiz: false,
    setQuiz: false,
    setQuizWaiting: false,
    currentQuestion: {},
    answers: [],
    correctAnswerCount: 0,
    quizResult: false,
    resultsList: {}
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
                setQuiz: action.payload
            }        
        case type.SET_QUIZ_WAITING:
            return {
                ...state,
                setQuizWaiting: action.payload
            }
    case type.SET_ANSWER:
            return {
                ...state,
                answers: [...state.answers, action.payload]
            }
        case type.UNSET_ANSWER:
            return {
                ...state,
                answers: initialState.answers
            }        
        case type.SET_CURRENT_QUESTION:
            return {
                ...state,
                currentQuestion: action.payload
            }
        case type.SET_QUIZ_RESULTS:
            return {
                ...state,
                quizResult: action.payload
            }
        case type.SET_CORRECT_ANSWER_COUNT:
            return {
                ...state,
                correctAnswerCount: state.correctAnswerCount + 1
        }
        case type.SET_USERS_RESULTS_LIST:
            return {
                ...state,
                resultsList: action.payload
        }
        case type.RESET_INITIAL_STATE:
            return {
                ...initialState
            }
        default:
            return {
                ...state
            }
    }
}