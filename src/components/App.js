import React from 'react';
import { connect } from 'react-redux';
import LoadingBar, { hideLoading, showLoading } from 'react-redux-loading';
import { Route } from 'react-router';
import { handleFetchUsers } from '../actions/shared';
import './App.css';
import Signin from './authentication/Signin';
import Home from './Home';
import Leaderboard from './Leaderboard';
import Nav from './Nav';
import NotFound from './NotFound';
import NewQuestion from './polls/NewQuestion';
import Poll from './polls/Poll';

class App extends React.Component {
  componentDidMount() {
    // Data that is needed on initial loading
    this.props.dispatch(showLoading())
    this.props.dispatch(handleFetchUsers())
    this.props.dispatch(hideLoading())
  }
  render() {
    const { authedUser } = this.props;

    return (
        <div className="App">
          {Object.keys(authedUser).length <= 0 
          ? <Signin />
          :
          <div>
            <Nav />
            <LoadingBar />
            <div className='content'>
              <Route path='/' exact component={Home} />        
              <Route path='/signin' component={NewQuestion} />
              <Route path='/add' component={NewQuestion} />
              <Route path='/leaderboard' component={Leaderboard} />
              <Route path='/questions/:id' component={Poll} />
              <Route path='/404' component={NotFound} />
            </div>
          </div>}
        </div>  
    );
  }
}

function mapStateToProps({authedUser, users}) {
  return {
    authedUser: authedUser,
    users
  }
}

export default connect(mapStateToProps)(App);
