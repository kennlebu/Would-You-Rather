import React from 'react';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading-bar';
import { Route } from 'react-router';
import './App.css';
import Home from './Home';
import Leaderboard from './Leaderboard';
import Nav from './Nav';
import NewQuestion from './polls/NewQuestion';

class App extends React.Component {
  render() {
    const { authedUser } = this.props;

    return (
        <div className="App">
          {Object.keys(authedUser).length > 0 && <Nav />}
          <LoadingBar />
          <div className='content'>
            <Route path='/' exact component={Home} />        
            <Route path='/signin' component={NewQuestion} />
            <Route path='/add' component={NewQuestion} />
            <Route path='/leaderboard' component={Leaderboard} />
          </div>          
        </div>  
    );
  }
}

function mapStateToProps({authedUser}) {
  return {
    authedUser: authedUser
  }
}

export default connect(mapStateToProps)(App);
