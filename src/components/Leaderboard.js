import React, { Component } from "react";
import { connect } from "react-redux";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { handleFetchUsers } from "../actions/shared";

class Leaderboard extends Component {
  componentDidMount() {
    this.props.dispatch(showLoading());
    this.props.dispatch(handleFetchUsers());
    this.props.dispatch(hideLoading());
  }

  render() {
    const { users } = this.props;
    const users_scored = Object.keys(users).map((uid) =>
      Object.assign({}, users[uid], {
        score:
          Object.keys(users[uid].answers).length + users[uid].questions.length,
      })
    );

    return (
      <div>
        <h3>Leaderboard</h3>
        <ul>
          {users_scored
            .sort((a, b) => b.score - a.score)
            .map((user, index) => (
              <li key={user.id}>
                <div className="leaderboard">
                  <div className="leaderboard-position">
                    <h1>#{index + 1}</h1>
                  </div>
                  <div className="leaderboard-picture">
                    <img
                      src={user.avatarURL}
                      alt={user.name}
                      width="100px"
                      height="100px"
                    />
                    <br />
                    <span>{user.name}</span>
                  </div>
                  <div className="leaderboard-content">
                    Questions answered: {Object.keys(user.answers).length}{" "}
                    <br />
                    Questions asked: {user.questions.length}
                  </div>
                  <div className="leaderboard-score">
                    Score <br />
                    <span className="score">{user.score}</span>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Leaderboard);
