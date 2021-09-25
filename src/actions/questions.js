import { hideLoading, showLoading } from "react-redux-loading-bar";
import { saveQuestion, saveQuestionAnswer } from "../data/api";

export const SAVE_QUESTION = 'SAVE_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const UNANSWER_QUESTION = 'UNANSWER_QUESTION';

export function answerQuestion({authedUser, qid, answer}) {
    return {
        type: ANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}

export function unanswerQuestion({authedUser, qid, answer}) {
    return {
        type: UNANSWER_QUESTION,
        authedUser,
        qid,
        answer
    }
}

export function handleAnswerQuestion(info) {
    return (dispatch) => {
        dispatch(answerQuestion(info)) // authedUser, qid, answer

        return saveQuestionAnswer(info) // authedUser, qid, answer
            .then(() => {
                console.log('In then: ', info)
                dispatch(answerQuestion(info))})
            .catch(e => {
                console.warn('There was an error saving your answer: ', e);
                dispatch(unanswerQuestion(info)) // authedUser, qid, answer
                alert('There was an error answering the question. Please try again')
            })
    }
}

export function newQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}

export function handleSaveQuestion(question) {
    return (dispatch) => {
        dispatch(showLoading())

        return saveQuestion(question)
            .then(question => {
                dispatch(newQuestion(question))
            })
            .then(() => dispatch(hideLoading()))
    }
}