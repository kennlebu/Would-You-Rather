import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { handleSaveQuestion } from "../../actions/questions";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false,
  };

  handleOptionOneChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({
      optionOne: text,
    }));
  };

  handleOptionTwoChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({
      optionTwo: text,
    }));
  };

  saveQuestion = (e) => {
    const { authedUser } = this.props;
    e.preventDefault();
    this.props.dispatch(
      handleSaveQuestion({
        optionOneText: this.state.optionOne,
        optionTwoText: this.state.optionTwo,
        author: authedUser.id,
      })
    );

    this.setState(() => ({
      optionOne: "",
      optionTwo: "",
      toHome: true,
    }));
  };

  render() {
    const { toHome } = this.state;

    if (toHome) {
      return <Redirect to="/" />;
    }

    return (
      <div className="new-question">
        <h3>New Question</h3>
        <h4>Would you rather...</h4>
        <input
          placeholder="Enter an option"
          type="text"
          onChange={this.handleOptionOneChange}
        />
        <br />
        OR <br />
        <input
          placeholder="Enter an option"
          type="text"
          onChange={this.handleOptionTwoChange}
        />
        <br />
        <button
          onClick={(e) => this.saveQuestion(e)}
          disabled={!this.state.optionOne || !this.state.optionTwo}
        >
          Submit
        </button>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser: authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
