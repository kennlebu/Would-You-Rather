import { FETCH_USERS } from '../actions/shared'

export default function users(state = {}, action) {
    switch(action.type) {
        case FETCH_USERS:
            return {
                ...state,
                ...action.users
            }
        default:
            return state
    }
}