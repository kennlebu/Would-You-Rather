import { LOGOUT, SIGNIN } from '../actions/users'

export default function authedUser(state = {}, action) {
    switch(action.type) {
        case SIGNIN:
            return action.user
        case LOGOUT:
            return {}
        default:
            return state
    }
}