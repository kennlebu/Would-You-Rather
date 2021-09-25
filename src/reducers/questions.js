import {
  ANSWER_QUESTION,
  SAVE_QUESTION,
  UNANSWER_QUESTION,
} from "../actions/questions";
import { FETCH_QUESTIONS } from "../actions/shared";

export default function questions(state = {}, action) {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ANSWER_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.concat([
              action.authedUser,
            ]),
          },
        },
      };
    case UNANSWER_QUESTION:
      return {
        ...state,
        [action.qid]: {
          ...state[action.qid],
          [action.answer]: {
            ...state[action.qid][action.answer],
            votes: state[action.qid][action.answer].votes.filter(
              (user_id) => user_id !== action.authedUser
            ),
          },
        },
      };
    case SAVE_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    default:
      return state;
  }
}
