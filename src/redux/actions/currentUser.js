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


