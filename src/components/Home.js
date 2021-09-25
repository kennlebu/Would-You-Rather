import React, { Component } from "react";
import { GiCheckMark } from "react-icons/gi";
import { connect } from "react-redux";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { handleFetchQuestions } from "../actions/shared";
import AnsweredList from "./polls/AnsweredList";
import UnansweredList from "./polls/UnansweredList";

class Home extends Component {
  state = {
    selected_page: "unanswered",
  };

  togglePage = (page) => {
    this.setState(() => ({
      selected_page: page,
    }));
  };

  componentDidMount() {
    this.props.dispatch(showLoading());
    this.props.dispatch(handleFetchQuestions());
    this.props.dispatch(hideLoading());
  }

  render() {
    return (
      <div>
        <div>
          <button
            className="page-selector"
            onClick={() => this.togglePage("unanswered")}
          >
            {this.state.selected_page === "unanswered" ? <GiCheckMark /> : ""}{" "}
            &nbsp; Unanswered
          </button>
          <button
            className="page-selector"
            onClick={() => this.togglePage("answered")}
          >
            {this.state.selected_page === "answered" ? <GiCheckMark /> : ""}{" "}
            &nbsp; Answered
          </button>

          {this.state.selected_page === "answered" ? (
            <AnsweredList />
          ) : (
            <UnansweredList />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Home);
