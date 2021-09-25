import React, { Component } from "react";
import { connect } from "react-redux";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { handleFetchQuestions } from "../../actions/shared";
import ListPoll from "./ListPoll";
import Poll from "./Poll";

class AnsweredList extends Component {
    render() {
        const { questions, authedUser } = this.props;
        // const answered = Object.keys(authedUser.answers).sort((a,b) => questions[b].timestamp - questions[b].timestamp);
        const answered = Object.keys(questions).length >= 1
            ? Object.keys(questions).filter((qid) => (
                // Object.keys(authedUser.answers).includes(qid)
                questions[qid].optionOne.votes.includes(authedUser.id)
                || questions[qid].optionTwo.votes.includes(authedUser.id)
            ))
            .sort((a,b) => questions[b].timestamp - questions[b].timestamp)
            : []
        return (
            <div>
                {answered.length <= 0
                    ? <h4>No questions have been answered yet</h4>
                    : <ul>
                        {answered.map((qid) => (
                                <li key={qid}><ListPoll qid={qid}/></li>
                            ))}
                    </ul>}
            </div>
        )
    }
}

function mapStateToProps({questions, authedUser}) {
    return {
        questions,
        authedUser: authedUser
    }
}

export default connect(mapStateToProps)(AnsweredList);