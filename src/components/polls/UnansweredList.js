import React, { Component } from "react";
import { connect } from "react-redux";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { handleFetchQuestions } from "../../actions/shared";
import ListPoll from "./ListPoll";
import Poll from './Poll';

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
                    ? <h4>No questions have been asked yet</h4>
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
    console.log('mapStateToProps: ', authedUser)
    return {
        questions,
        authedUser: 
        {
            "id": "sarahedo",
            "name": "Sarah Edo",
            "avatarURL": "../../images/snow.jpg",
            "answers": {
                "8xf0y6ziyjabvozdd253nd": "optionOne",
                "6ni6ok3ym7mf1p33lnez": "optionOne",
                "am8ehyc8byjqgar0jgpub9": "optionTwo",
                "loxhs1bqm25b708cmbf3g": "optionTwo"
            },
            "questions": [
                "8xf0y6ziyjabvozdd253nd",
                "am8ehyc8byjqgar0jgpub9"
            ]
        }
    }
}

export default connect(mapStateToProps)(UnansweredList);