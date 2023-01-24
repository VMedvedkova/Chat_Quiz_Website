import * as type from '../types'

const initialState = {
    users: [],
    loading: false
}

export default function users(state = initialState, action) {
    switch (action.type) {
        case type.SET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case type.SET_NEW_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            }
        default:
            return {
                ...state
            }
    }
}