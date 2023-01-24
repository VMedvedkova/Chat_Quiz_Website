import * as type from '../types'

export function setUsers(payload) {
    return {
        type: type.SET_USERS,
        payload
    }
}

export function setNewUser(payload) {
    return {
        type: type.SET_NEW_USER,
        payload
    }
}
