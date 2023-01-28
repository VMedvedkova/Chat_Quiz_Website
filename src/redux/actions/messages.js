import * as type from '../types'

export function sendMessage(payload) {
    return {
        type: type.SEND,
        payload
    }
}
export function setUserMessageToStore(payload) {
    return {
        type: type.SEND_MESSAGES_TO_STORE,
        payload
    }
}






