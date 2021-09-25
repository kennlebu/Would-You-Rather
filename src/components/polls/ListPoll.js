import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class ListPoll extends Component {
    render() {
        const { author, question } = this.props;

        return (
            <div className='poll'>
                {author && <div className='poll-author'>
                    <img src={author.avatarURL} alt={question.author} width='100px' height='100px'/> <br/>
                    <strong>{author.name}</strong>
                </div>}

                <div className='poll-content'>
                    <span className='would-you-rather'>Would you rather...</span>
                    <p className='text-muted date'>{new Date(question.timestamp).toLocaleString()}</p>
                    <br/>
                    <div className='teaser-block'>
                        <div className='teaser-text'>{question.optionOne.text}</div>
                        <div><span className='or'>OR</span></div>
                        <div className='teaser-text'>{question.optionTwo.text}</div>
                    </div>
                </div>

                <div>
                    <NavLink to={`questions/${question.id}`}>View Poll</NavLink>
                </div>
            </div>
        )
    }
}

function mapStateToProps({questions, users}, {qid}) {
    const question = questions[qid]
    const author = users[question.author]
    return {
        author,
        question
    }
}

export default connect(mapStateToProps)(ListPoll);