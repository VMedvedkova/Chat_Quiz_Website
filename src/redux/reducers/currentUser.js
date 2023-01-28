import * as type from '../types'

const initialState = {
    currentUser: null,
    clientId: '783870545625-lcemni7jas0q4t4cd7v831ur1k4g2p9h.apps.googleusercontent.com'
}

export default function currentUser(state = initialState, action) {
    switch (action.type) {
        case type.SIGN_IN:
            return {
                ...state,
                currentUser: action.payload
            }
        case type.SIGN_OUT:
            return {
                ...state,
                currentUser: null
            }
        default:
            return {
                ...state
            }
    }
}