import React from "react";
import "./App.css";
import { connect } from 'react-redux';
import Header from './components/Header';
import Board from './components/Game';
import Key from './components/keySidebar'
import Player1 from './components/Players/Player1';
import Player2 from './components/Players/Player2';
import './style/components/player1.scss';
import { startNewGame } from "./redux/actions/cardActions";
import Button from '@material-ui/core/Button';



const App = (props) => {

  return (
    <div className="App">
      <Header />
      <div className="body-container">
        <div className="start-button">
          <Button style={{ backgroundColor: 'orange' }} onClick={props.onStartNewGame}>
            Start New Game
      </Button>
        </div>

        <Player2 cards={props.player2Cards} />

        <div className="Board">
          <Board />
        </div>
        <div className="key">
          <Key />
        </div>

        <Player1 cards={props.player1Cards} />
      </div>

    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    player1Cards: state.chanceChessReducer.player1Cards,
    player2Cards: state.chanceChessReducer.player2Cards,
    newBoard: state.chanceChessReducer.newBoard,
  }
}

const mapDispatchToProps = dispatch => {
  console.log(dispatch)
  return {
    onStartNewGame: () => dispatch(startNewGame())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
