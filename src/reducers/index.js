import { loadingBarReducer } from "react-redux-loading-bar";
import { combineReducers } from "redux";
import users from '../reducers/users'
import authedUser from "./authedUser";
import questions from "./questions";

export default combineReducers({
    users,
    questions,
    authedUser,
    loadingBar: loadingBarReducer
})