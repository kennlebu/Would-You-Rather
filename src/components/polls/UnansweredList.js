import React, { Component } from "react";
import { connect } from "react-redux";
import ListPoll from "./ListPoll";

class UnansweredList extends Component {

    render() {
        const { questions, authedUser } = this.props;
        const question_ids = Object.keys(questions);
        const unanswered = question_ids.filter((qid) => (
            !questions[qid].optionOne.votes.includes(authedUser.id)
            && !questions[qid].optionTwo.votes.includes(authedUser.id)
            ))
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)

        return (
            <div>
                {unanswered.length <= 0
                    ? <h4>There are no questions you haven't answered</h4>
                    : <ul>
                        {unanswered.map((qid) => (
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

export default connect(mapStateToProps)(UnansweredList);