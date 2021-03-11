import React from "react";
import { connect } from 'react-redux';

import "./App.css";
import './style/components/player1.scss';
import './style/components/playerCard.scss';
// import chessLogo from "./images/chessLogo5.png";
import Header from './components/Header';
import Button from '@material-ui/core/Button';
import Player2CardContainer from './components/Players/Player2CardContainer';
import Player1CardContainer from './components/Players/Player1CardContainer';
import Board from './components/Game';
import Card from './components/Card';
import Key from './components/keySidebar'
import Rules from './components/RulesSidebar'

import { startNewGame } from "./redux/actions/cardActions";
import { discardAllP1Cards, getCard } from "./redux/actions/cardActions";
import { getPlayer2Card, discardAllP2Cards, shuffle, removeSelectedCard, changeTurn } from "./redux/actions/cardActions";
import { selectAll } from "./redux/actions/cardActions";



const App = (props) => {

  const getCardP1 = (deck) => {
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

  const startNewGame = () => {
    let deck = props.cardsArray;
    if (deck.length < 52) {
      window.confirm('You already started the game. Perhaps you would like to resign with the flag icon')
      return;
    }
    props.onStartNewGame()
  }

  const discardOne = (selectedCardIndex) => {
    if (props.selectedCard.length === 0) return;
    props.onRemoveSelected(selectedCardIndex)
    props.onChangeTurn();
  }

  const resign = () => {
    let whiteToMove = props.whiteToMove;

    if (whiteToMove && window.confirm('Are you sure you want to resign?')) {
      alert('Black Wins!')
    }

    if (!whiteToMove && window.confirm('Are you sure you want to resign?')) {
      alert('White Wins!')
    }

  }

  const shuffle = (p1Cards, p2Cards) => {
    let p1 = props.player1Cards;
    let p2 = props.player2Cards;

    p1Cards = p1.map(card => card.index)
    p2Cards = p2.map(card => card.index)

    props.onShuffle(p1Cards, p2Cards);
  }

  return (
    <div className="App">
      <Header />
      {/* <CaptureSidebar /> */}
      <div className="body-container">
        <div className="Board">
          <Board />
          <div className='card-containers'>
            {props.whiteToMove &&
              <Player2CardContainer disableControls={props.whiteToMove} cards={props.player2Cards} allCardsSelected={props.allSelected} />
            }
            {!props.whiteToMove &&
              <Player1CardContainer disableControls={!props.whiteToMove} cards={props.player1Cards} allCardsSelected={props.allSelected} />
            }

            {props.cardsArray.length > 0 &&
              <div style={{ display: "flex", justifyContent: "center", height: '160px', marginBottom: '10px' }}>
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
              <>
                <Header />
                <Button
                  onClick={() => shuffle(props.player1Cards, props.player2Cards)}
                  style={{
                    backgroundColor: 'orange',
                    color: 'black',
                    width: '100%',
                    margin: '10px 10px 0 15px'
                  }}
                >
                  Shuffle
                </Button>
              </>
            }

            {props.whiteToMove &&
              <>
                <Player1CardContainer disableControls={!props.whiteToMove} cards={props.player1Cards} allCardsSelected={props.allSelected} />
                <Button
                  style={{
                    backgroundColor: 'rgb(82 140 78)',
                    color: 'white',
                    border: '1px solid black',
                    width: '90%',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                  onClick={() => props.onSelectAll()}
                >
                  Select All
                </Button>
                <Button
                  onClick={discardAllP1}
                  style={{
                    backgroundColor: 'rgb(99 91 91',
                    color: 'white',
                    width: '90%',
                    border: '1px solid black',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>
                  Discard All
                </Button>
              </>
            }
            {!props.whiteToMove &&
              <>
                <Player2CardContainer disableControls={props.whiteToMove} cards={props.player2Cards} allCardsSelected={props.allSelected} />
                <Button
                  style={{
                    backgroundColor: 'rgb(82 140 78)',
                    color: 'white',
                    border: '1px solid black',
                    width: '90%',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}
                  onClick={() => props.onSelectAll()}
                >
                  Select All
                </Button>
                <Button
                  onClick={discardAllP2}
                  style={{
                    backgroundColor: 'rgb(99 91 91',
                    color: 'white',
                    width: '90%',
                    border: '1px solid black',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>
                  Discard All
                </Button>
              </>
            }
          </div>

          {/* ***************************************--------SIDEBAR----SHOULD PROBABLY BE ITS OWN COMPONENT----- */}

          <div className="actions-container">

            {/* ************************* BUTTONS FOR BOTH PLAYERS *****************************************/}
            <div className="game-buttons">
              <Button style={{
                backgroundColor: '#277714',
                color: 'white',
                border: '1px solid black',
              }}
                onClick={startNewGame}>
                Start Game
              </Button>
              <Rules />
              <Key />
            </div>

            {/* *************************************************************************************************************** */}
            {props.whiteToMove &&
              <div className="p1Actions">
                <h3 style={{ fontStyle: 'italic' }}>Player One</h3>
                <button
                  onClick={resign}
                  style={{
                    backgroundColor: '#565656',
                    color: 'white',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '24px'
                  }}>
                  🏳
                </button>

                <Button
                  style={{
                    backgroundColor: '#277714',
                    color: 'white',
                    margin: '20px 0 0 0',
                    border: '1px solid black'
                  }}
                  onClick={() => getCardP1(props.cardsArray)}
                >
                  Draw Cards
                </Button>
                <Button
                  style={{
                    backgroundColor: 'rgb(43, 43, 43)',
                    color: 'white',
                    margin: '20px 0 0 0',
                    border: '1px solid black'
                  }}
                  onClick={() => discardOne(props.selectedCard[1])}
                >
                  Discard One
                </Button>
              </div>
            }
            {!props.whiteToMove &&
              <div className="p2Actions">
                <h3 style={{ fontStyle: 'italic' }}>Player Two</h3>
                <button
                  onClick={resign}
                  style={{
                    backgroundColor: '#565656',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '50%',
                    margin: '0px 0 100px 0',
                    fontSize: '24px'
                  }}
                >
                  🏳
                </button>

                <Button
                  style={{
                    backgroundColor: '#277714',
                    color: 'white',
                    margin: '20px 0 0 0',
                    border: '1px solid black'
                  }}
                  onClick={getCardP2}
                >
                  Draw Cards
                </Button>
                <Button
                  style={{
                    backgroundColor: 'rgb(43, 43, 43)',
                    color: 'white',
                    margin: '20px 0 0 0',
                    border: '1px solid black'
                  }}
                  onClick={() => discardOne(props.selectedCard[1])}
                >
                  Discard One
                </Button>
              </div>
            }

          </div>
        </div>
      </div>
    </div >
  );
};

const mapStateToProps = (state) => {
  // console.log(`app state: ${state}`)
  console.log(state)
  return {
    player1Cards: state.chanceChessReducer.player1Cards,
    player2Cards: state.chanceChessReducer.player2Cards,
    newBoard: state.chanceChessReducer.newBoard,
    whiteToMove: state.chanceChessReducer.whiteToMove,
    cardsArray: state.chanceChessReducer.cardsArray,
    selectedCard: state.chanceChessReducer.selectedCard,
    allSelected: state.chanceChessReducer.allSelected,
    fullDeck: state.chanceChessReducer.fullDeck
  }
}

const mapDispatchToProps = dispatch => {
  // console.log(`dispatch: ${dispatch}`)
  return {
    onStartNewGame: () => dispatch(startNewGame()),
    onGetCard: () => dispatch(getCard()),
    onDiscardAllCardsP1: () => dispatch(discardAllP1Cards()),
    onGetCardForPlayer2: () => dispatch(getPlayer2Card()),
    onDiscardAllCardsP2: () => dispatch(discardAllP2Cards()),
    onShuffle: (p1Cards, p2Cards) => dispatch(shuffle(p1Cards, p2Cards)),
    onSelectAll: () => dispatch(selectAll()),
    onRemoveSelected: (selectedCardIndex) => dispatch(removeSelectedCard(selectedCardIndex)),
    onChangeTurn: () => dispatch(changeTurn()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
