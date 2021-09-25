import React, { Component } from "react";
import { connect } from "react-redux";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { handleFetchQuestions } from "../actions/shared";
import Signin from "./authentication/Signin";
import AnsweredList from "./polls/AnsweredList";
import UnansweredList from "./polls/UnansweredList";

class Home extends Component {
    state = {
        selected_page: 'unanswered'
    }

    togglePage = (page) => {
        this.setState(() => ({
            selected_page: page
        }))
    }

    componentDidMount() {
        this.props.dispatch(showLoading())
        this.props.dispatch(handleFetchQuestions())
        this.props.dispatch(hideLoading())
    }

    render() {  
        return (
            <div>
                {Object.keys(this.props.authedUser).length <= 0
                    ? <Signin />
                :
                <div>
                    <button onClick={() => this.togglePage('unanswered')}>
                        Unanswered
                    </button>
                    <button onClick={() => this.togglePage('answered')}>
                        Answered
                    </button>

                    {this.state.selected_page === 'answered'
                        ? <AnsweredList />
                        : <UnansweredList />
                    }
                </div>}
            </div>
            
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Home);