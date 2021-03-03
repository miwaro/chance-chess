import React from "react";
import { connect } from 'react-redux';

import "./App.css";
import './style/components/player1.scss';
import './style/components/playerCard.scss';
import Header from './components/Header';
import Button from '@material-ui/core/Button';
import Player2CardContainer from './components/Players/Player2CardContainer';
import Player1CardContainer from './components/Players/Player1CardContainer';
import Board from './components/Game';
import Card from './components/Card';
import Key from './components/keySidebar'

import { startNewGame } from "./redux/actions/cardActions";
import { discardAllP1Cards, getCard } from "./redux/actions/cardActions";
import { getPlayer2Card, discardAllP2Cards, shuffle } from "./redux/actions/cardActions";



const App = (props) => {
  console.log(props)

  const getCardP1 = () => {
    let whiteToMove = props.whiteToMove;
    if (!whiteToMove || props.player1Cards.length >= 3 || props.cardsArray.length === 0) return;
    props.onGetCard();
  }

  const discardAllP1 = () => {
    let whiteToMove = props.whiteToMove;
    if (!whiteToMove || props.player1Cards.length === 0) return;
    props.onDiscardAllCardsP1();
  }

  const getCardP2 = () => {
    let whiteToMove = props.whiteToMove;
    if (whiteToMove || props.player2Cards.length >= 3 || props.cardsArray.length === 0) return;
    props.onGetCardForPlayer2();
  }

  const discardAllP2 = () => {
    let whiteToMove = props.whiteToMove;
    if (whiteToMove || props.player2Cards.length === 0) return;
    props.onDiscardAllCardsP2();
  }

  const shuffle = (array) => {
    console.log(`array:${array}`)
    props.onShuffle(array);
  }

  return (
    <div className="App">
      <Header />
      <div className="body-container">

        <div className="Board">

          <Board />
          <div className='card-containers'>
            <Player2CardContainer disableControls={props.whiteToMove} cards={props.player2Cards} />




            {props.cardsArray.length > 0 &&
              <div style={{ display: "flex", justifyContent: "center", margin: "0 auto 0 250px", height: 282 }}>
                {props.cardsArray && props.cardsArray.map((card, index) => {
                  return (
                    <div key={index}>
                      <Card suits={card.suits} card={card.card} color={card.color} front={false} />
                    </div>
                  );
                })}
              </div>
            }
            {props.cardsArray.length === 0 &&
              <Button onClick={() => shuffle(props.cardsArray)} style={{ backgroundColor: 'orange' }}>Shuffle</Button>
            }



            <Player1CardContainer disableControls={!props.whiteToMove} cards={props.player1Cards} />
          </div>
          <div className="actions-container">
            <div className="p2Actions">
              <Button style={{ backgroundColor: 'red', color: 'white', marginBottom: '15px' }} onClick={props.onStartNewGame}>
                Reset Game
            </Button>
              <Key />
              <Button onClick={discardAllP2} style={{ backgroundColor: 'red', color: 'white', marginBottom: '15px' }}>
                Discard All
                        </Button>
              <Button style={{ backgroundColor: 'orange' }} onClick={getCardP2}>
                Draw Cards
            </Button>
            </div>

            <div className="p1Actions">
              <Button style={{ backgroundColor: 'red', color: 'white', marginBottom: '15px' }} onClick={props.onStartNewGame}>
                Reset Game
            </Button>
              <Key />
              <Button onClick={discardAllP1} style={{ backgroundColor: 'red', color: 'white', marginBottom: '15px' }}>
                Discard All
                        </Button>
              <Button style={{ backgroundColor: 'orange' }} onClick={getCardP1}>
                Draw Cards
            </Button>
            </div>
          </div>








        </div>

      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    player1Cards: state.chanceChessReducer.player1Cards,
    player2Cards: state.chanceChessReducer.player2Cards,
    newBoard: state.chanceChessReducer.newBoard,
    whiteToMove: state.chanceChessReducer.whiteToMove,
    cardsArray: state.chanceChessReducer.cardsArray

  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartNewGame: () => dispatch(startNewGame()),
    onGetCard: () => dispatch(getCard()),
    onDiscardAllCardsP1: () => dispatch(discardAllP1Cards()),
    onGetCardForPlayer2: () => dispatch(getPlayer2Card()),
    onDiscardAllCardsP2: () => dispatch(discardAllP2Cards()),
    onShuffle: (array) => dispatch(shuffle(array)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
