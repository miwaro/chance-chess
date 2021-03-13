import React from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import JoinRoom from './components/onboard/joinroom';
import { ColorContext } from './context/colorcontext';
import Onboard from './components/onboard/onboard';
import JoinGame from './components/onboard/joingame';
import Home from './components/Home';


function App() {

  const [didRedirect, setDidRedirect] = React.useState(false)

  const playerDidRedirect = React.useCallback(() => {
    setDidRedirect(true)
  }, [])

  const playerDidNotRedirect = React.useCallback(() => {
    setDidRedirect(false)
  }, [])

  const [userName, setUserName] = React.useState('')

  return (
    <ColorContext.Provider value={{ didRedirect: didRedirect, playerDidRedirect: playerDidRedirect, playerDidNotRedirect: playerDidNotRedirect }}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Onboard setUserName={setUserName} />
          </Route>
          <Route path="/game/:gameid" exact>
            {didRedirect ?
              <React.Fragment>
                <JoinGame userName={userName} isCreator={true} />
                <Home myUserName={userName} />
              </React.Fragment>
              :
              <JoinRoom />}
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </ColorContext.Provider>);
}

export default App;
