import * as type from '../types'

const initialState = {
    questions: []
}

const questionsList = (state = initialState, action) => {
    switch (action.type) {
        case type.SET_QUESTIONS: 
            return {
                ...state,
                questions: action.payload
            }
        default: return state
    }
}

export default questionsList
