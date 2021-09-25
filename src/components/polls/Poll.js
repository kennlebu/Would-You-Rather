import React, { Component } from "react";
import { connect } from "react-redux";
import { GiCheckMark } from "react-icons/gi";
import { handleAnswerQuestion } from "../../actions/questions";
import { Redirect } from "react-router";

class Poll extends Component {

    answerQuestion = (e, answer) => {
        e.preventDefault();
        const { authedUser, question, dispatch } = this.props;
        dispatch(handleAnswerQuestion({authedUser: authedUser.id, qid: question.id, answer}))
    }

    render() {
        const { author, question, authedUser } = this.props;
        if(question === null) {
            return <Redirect to='/404'/>
        }

        const hasAnswered = question.optionOne.votes.includes(authedUser.id) || question.optionTwo.votes.includes(authedUser.id);
        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
        const answer = hasAnswered 
            ? question.optionOne.votes.includes(authedUser.id)
                ? 'optionOne'
                : 'optionTwo'
            : null;

        return (
            <div className='poll'>
                {author && <div className='poll-author'>
                    <img src={author.avatarURL} alt={question.author} width='200px' height='200px' /> <br/>
                    <strong>{author.name}</strong>
                </div>}

                <div className='poll-content'>
                    <span className='would-you-rather'>Would you rather...</span>
                    <p className='text-muted date'>{new Date(question.timestamp).toLocaleString()}</p>
                    <br/>
                    {!hasAnswered ? <div className='select-answer-block'>
                        <button 
                            className='question-option-button'
                            onClick={(e) => this.answerQuestion(e, 'optionOne')} >
                        {question.optionOne.text}
                        </button>
                        <div><span className='or'>OR</span></div>
                        <button 
                            className='question-option-button'
                            onClick={(e) => this.answerQuestion(e, 'optionTwo')} >
                        {question.optionTwo.text}</button>
                    </div>

                    : <div className='selected-answer-block'>
                        <button className={`question-answer-button ${answer === 'optionOne' ? 'my-answer' : ''}`} disabled>
                            {answer === 'optionOne' ? <GiCheckMark /> : ''} &nbsp;
                            {question.optionOne.text}
                        </button>
                        <br/>
                        <span className='stats'>{question.optionOne.votes.length} out of {totalVotes} votes ({(question.optionOne.votes.length/totalVotes) * 100}%)
                        </span>
                        <div><span className='or'>OR</span></div>
                        <button className={`question-answer-button ${answer === 'optionTwo' ? 'my-answer' : ''}`} disabled>
                            {answer === 'optionTwo' ? <GiCheckMark /> : ''} &nbsp;
                            {question.optionTwo.text}
                        </button>
                        <br/>
                        <span className='stats'>{question.optionTwo.votes.length} out of {totalVotes} votes ({(question.optionTwo.votes.length/totalVotes) * 100}%)</span>
                    </div>}
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, props) {
    const { id } = props.match.params
    const question = questions[id] || {}
    const author = users[question.author]
    return {
        authedUser: authedUser,
        author,
        question: Object.keys(question).length > 0
            ? question
            : null
    }
}

export default connect(mapStateToProps)(Poll);