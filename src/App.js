import React from "react";
import { connect } from 'react-redux';

import "./App.css";
import './style/components/player1.scss';
import Header from './components/Header';
import Button from '@material-ui/core/Button';
import Player2CardContainer from './components/Players/Player2CardContainer';
import Player1CardContainer from './components/Players/Player1CardContainer';
import Board from './components/Game';
import Key from './components/keySidebar'
import { startNewGame } from "./redux/actions/cardActions";


const App = (props) => {

  return (
    <div className="App">
      <Header />
      <div className="body-container">
        <div className="start-button">
          <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={props.onStartNewGame}>
            Reset Game
          </Button>
        </div>
        <Player2CardContainer disableControls={props.whiteToMove} cards={props.player2Cards} />
        <div className="Board">
          <Board />
        </div>
        <div className="key">
          <Key />
        </div>
        <Player1CardContainer disableControls={!props.whiteToMove} cards={props.player1Cards} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    player1Cards: state.chanceChessReducer.player1Cards,
    player2Cards: state.chanceChessReducer.player2Cards,
    newBoard: state.chanceChessReducer.newBoard,
    whiteToMove: state.chanceChessReducer.whiteToMove
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartNewGame: () => dispatch(startNewGame()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
