import * as type from '../types'

const initialState = {
    messages: [],
    userMessage: ''
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.SEND: 
            return {
                ...state,
                userMessage: action.payload
            }
        case type.SET_USER_MESSAGE: 
            return {
                ...state,
                messages: action.payload
            }
        default: return state
    }
}

export default chatReducer
