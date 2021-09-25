import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logOut } from '../actions/users';

class Nav extends Component {
    logout = (e) => {
        e.preventDefault()
        this.props.dispatch(logOut())
    }

    render() {
        const { authedUser } = this.props
        return (
            <nav>
                <div className='links'>
                    <NavLink className="active" to="/">Home</NavLink>
                    <NavLink to="/add">Ask a Question</NavLink>
                    <NavLink to="/leaderboard">Leaderboard</NavLink>
                </div>
                <div className='logout'>
                    <strong>{authedUser.name}</strong> &nbsp;
                    <a href='#logout' onClick={(e) => this.logout(e)}>Logout</a>
                </div>
            </nav> 
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(Nav);