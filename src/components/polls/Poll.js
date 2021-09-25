import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFetchQuestions, handleFetchUsers } from "../../actions/shared";
import { GiCheckMark } from "react-icons/gi";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { answerQuestion, handleAnswerQuestion } from "../../actions/questions";

class Poll extends Component {
    state = {
        isViewing: false,
        hasAnswered: false
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(showLoading())
        dispatch(handleFetchQuestions())
        dispatch(handleFetchUsers())
        dispatch(hideLoading())
    }

    answerQuestion = (e, answer) => {
        e.preventDefault();
        const { authedUser, question, dispatch } = this.props;
        dispatch(handleAnswerQuestion({authedUser: authedUser.id, qid: question.id, answer}))
    }

    render() {
        const { author, question, authedUser } = this.props;
        const hasAnswered = question.optionOne.votes.includes(authedUser.id) || question.optionTwo.votes.includes(authedUser.id);
        const answer = hasAnswered ? author.answers[question.id] : null;
        console.log('For ' + question.id + ': ' + answer)

        return (
            <div className='poll'>
                {author && <div className='poll-author'>
                    <img src={author.avatar} alt={question.author} /> <br/>
                    <span>{author.name}</span>
                </div>}

                {!hasAnswered ? <div className='poll-content'>
                    <h5>Would you rather...</h5>
                    <h6>{new Date(question.timestamp).toLocaleString()}</h6>
                    <button 
                        className='question-option-button'
                        onClick={(e) => this.answerQuestion(e, 'optionOne')} >
                    {question.optionOne.text}
                    </button>
                    OR
                    <button 
                        className='question-option-button'
                        onClick={(e) => this.answerQuestion(e, 'optionTwo')} >
                    {question.optionTwo.text}</button>
                </div>

                : <div className='poll-content'>
                    <h5>Would you rather...</h5>
                    <h6>{new Date(question.timestamp).toLocaleString()}</h6>
                    <button className={`question-answer-button ${answer === 'optionOne' ? 'my-answer' : ''}`} disabled>
                        {answer === 'optionOne' ? <GiCheckMark /> : ''} &nbsp;
                        {question.optionOne.text}
                    </button>
                    OR
                    <button className={`question-answer-button ${answer === 'optionTwo' ? 'my-answer' : ''}`} disabled>
                        {answer === 'optionTwo' ? <GiCheckMark /> : ''} &nbsp;
                        {question.optionTwo.text}
                    </button>
                </div>}
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, {qid}) {
    const question = questions[qid]
    const author = users[question.author]
    return {
        authedUser: authedUser,
        author,
        question
    }
}

export default connect(mapStateToProps)(Poll);