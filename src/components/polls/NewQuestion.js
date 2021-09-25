import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../../actions/questions";

class NewQuestion extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }

    handleOptionOneChange = (e) => {
        const text = e.target.value
        this.setState(() => ({
            optionOne: text
        }))
    }

    handleOptionTwoChange = (e) => {
        const text = e.target.value
        this.setState(() => ({
            optionTwo: text
        }))
    }

    saveQuestion = (e) => {
        const { authedUser } = this.props
        e.preventDefault();
        this.props.dispatch(handleSaveQuestion({
            optionOneText: this.state.optionOne,
            optionTwoText: this.state.optionTwo,
            author: authedUser.id
        }))
    }

    render() {
        return (
            <div>
                <h3>New Question</h3>
                <h4>Would you rather...</h4>
                <input
                    type='text'
                    onChange={this.handleOptionOneChange}
                    />
                <br/>
                OR <br/>
                <input
                    type='text'
                    onChange={this.handleOptionTwoChange}
                    />
                <br />
                <button 
                    onClick={(e) => this.saveQuestion(e)}
                    disabled={!this.state.optionOne ||  !this.state.optionTwo}>
                        Submit
                    </button>
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser: authedUser
        // {
        //     "id": "sarahedo",
        //     "name": "Sarah Edo",
        //     "avatarURL": "../../images/snow.jpg",
        //     "answers": {
        //         "8xf0y6ziyjabvozdd253nd": "optionOne",
        //         "6ni6ok3ym7mf1p33lnez": "optionOne",
        //         "am8ehyc8byjqgar0jgpub9": "optionTwo",
        //         "loxhs1bqm25b708cmbf3g": "optionTwo"
        //     },
        //     "questions": [
        //         "8xf0y6ziyjabvozdd253nd",
        //         "am8ehyc8byjqgar0jgpub9"
        //     ]
        // }
    }
}

export default connect(mapStateToProps)(NewQuestion)