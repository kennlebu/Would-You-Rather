import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { getQuestions, getUsers } from '../data/api'

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';

export function fetchUsers(users) {
    return {
        type: FETCH_USERS,
        users
    }
}

export function fetchQuestions(questions) {
    return {
        type: FETCH_QUESTIONS,
        questions
    }
}

export function handleFetchUsers() {
    return (dispatch) => {
        getUsers().then((users) => {
            dispatch(fetchUsers(users))
        })
    }
}

export function handleFetchQuestions() {
    return (dispatch) => {
        getQuestions().then((questions) => {
            dispatch(fetchQuestions(questions))
        })
    }
}