import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFetchUsers } from "../../actions/shared";
import { signIn } from "../../actions/users";

class Signin extends Component {
  state = {
    selected_user: "",
  };

  componentDidMount() {
    this.props.dispatch(handleFetchUsers());
  }

  selectUser = (e) => {
    const selected_id = e.target.value;
    const selected_user = this.props.users[selected_id];
    this.setState(() => ({
      selected_user,
    }));
  };

  signInUser() {
    this.props.dispatch(signIn(this.state.selected_user));
  }

  render() {
    const { users } = this.props;
    return (
      <div className="signin">
        <h1>Sign In</h1>
        {Object.keys(users).length > 0 && (
          <div>
            <select onChange={this.selectUser}>
              <option value="">Select a user to log in</option>
              {Object.keys(users).map((user_id) => (
                <option key={user_id} value={users[user_id].id}>
                  {users[user_id].name}
                </option>
              ))}
            </select>
            <br />
            <button
              disabled={!this.state.selected_user}
              onClick={() => this.signInUser()}
            >
              Sign In
            </button>
          </div>
        )}
        {/* {users.length <= 0 && <p>No users available. <button>Sign Up</button></p>} */}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Signin);
