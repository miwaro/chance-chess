import React, { useState, useCallback } from "react";
// import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Route, Redirect, Switch, useParams } from 'react-router-dom';
import JoinRoom from './components/onboard/joinroom';
import { ColorContext } from './context/colorcontext';
import Onboard from './components/onboard/onboard';
import JoinGame from './components/onboard/joingame';
import Home from './components/Home';
import { QueryParamProvider } from 'use-query-params';
import { connect } from 'react-redux';
import {
  updateGame
} from "./redux/actions/cardActions";
import {
  updateUsers
} from "./redux/actions/userActions";

function App(props) {

  const [didRedirect, setDidRedirect] = useState(false)
  const [didRefresh, setDidRefresh] = useState(false)
  const playerDidRedirect = useCallback(() => {
    setDidRedirect(true)
  }, [])

  const playerDidNotRedirect = useCallback(() => {
    setDidRedirect(false)
  }, [])
  const [userName, setUserName] = useState('')


  return (
    <ColorContext.Provider value={{ didRedirect: didRedirect, playerDidRedirect: playerDidRedirect, playerDidNotRedirect: playerDidNotRedirect }}>
      <Router>
        <QueryParamProvider ReactRouterRoute={Route}>
          <Switch>
            <Route path="/" exact>
              <Onboard setUserName={setUserName} />
            </Route>
            <Route path="/game/:gameId" exact>
              {didRedirect ?
                <React.Fragment>
                  <JoinGame userName={userName} isCreator={true} />
                  <Home myUserName={userName} />
                </React.Fragment>
                :
                <JoinRoom />
               }
            </Route>
            <Redirect to="/" />
          </Switch>
        </QueryParamProvider>
      </Router>
    </ColorContext.Provider>);
}

const mapStateToProps = (state) => {
  return {
      gameId: state.usersReducer.gameId,
      numPlayers: state.usersReducer.numPlayers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateGame: (state, gameId) => dispatch(updateGame(state, gameId)),
    updateUsers: state => dispatch(updateUsers(state)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
