import * as type from '../types'

export function setQuestions(payload) {
    return {
        type: type.SET_QUESTIONS,
        payload
    }
}