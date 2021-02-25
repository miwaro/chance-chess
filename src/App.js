import React, { useState } from "react";
import { connect } from 'react-redux';

import "./App.css";
import './style/components/player1.scss';

import Header from './components/Header';
import Button from '@material-ui/core/Button';
// import Player2 from './components/Players/Player2';
import Player2CardContainer from './components/Players/Player2CardContainer';
import Player1CardContainer from './components/Players/Player1CardContainer';
import Board from './components/Game';
import Key from './components/keySidebar'
// import Player1 from './components/Players/Player1';
import ActionButtons from './components/ActionButtons';

import { startNewGame } from "./redux/actions/cardActions";



const App = (props) => {
  const [front, setFront] = useState(true)

  const flip = () => {
    setFront(!front)
  }

  return (
    <div className="App">
      <Header />
      <div className="body-container">

        {props.player1Cards.length > 0 &&
          <div className="start-button">
            <Button style={{ backgroundColor: 'orange' }} onClick={props.onStartNewGame}>
              Start New Game
                </Button>

          </div>
        }

        <Player2CardContainer cards={props.player2Cards} front={front} />

        {/* <Player2 cards={props.player2Cards} front={front} /> */}
        <ActionButtons flip={flip} />

        <div className="Board">
          <Board />
        </div>

        <div className="key">
          <Key />
        </div>
        <Player1CardContainer cards={props.player1Cards} front={front} />

        {/* <Player1 cards={props.player1Cards} front={front} /> */}
        <ActionButtons flip={flip} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    player1Cards: state.chanceChessReducer.player1Cards,
    player2Cards: state.chanceChessReducer.player2Cards,
    newBoard: state.chanceChessReducer.newBoard
  }
}

const mapDispatchToProps = dispatch => {
  // console.log(dispatch)
  return {
    onStartNewGame: () => dispatch(startNewGame()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
