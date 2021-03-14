import React, { useEffect, useCallback, useState } from "react";
import { connect } from 'react-redux';
import "../App.css";
import '../style/components/player1.scss';
import '../style/components/playerCard.scss';
import Header from '../components/Header';
import Button from '@material-ui/core/Button';
import Player2CardContainer from '../components/Players/Player2CardContainer';
import Player1CardContainer from '../components/Players/Player1CardContainer';
import Board from '../components/Game';
import Card from '../components/Card';
import Key from '../components/keySidebar'
import Rules from '../components/RulesSidebar'
import { config } from '../config/config';
import {
  getCard,
  getPlayer2Card,
  discardAllP1Cards,
  discardAllP2Cards,
  shuffle,
  selectAll,
  updateGame,
} from "../redux/actions/cardActions";
import { updateUsers, setPlayerOne } from '../redux/actions/userActions';
import { useQueryParam, StringParam } from 'use-query-params';
import { socket } from "../connection/socket";
import { debounce } from "@material-ui/core";


const Home = (props) => {

  let [ whiteToMove, setWhiteToMove ] = useState();

  let playerNumber;
  const isCreator = localStorage.getItem(props.gameId);
  if (isCreator) playerNumber = 1;
  else playerNumber = 2;

  const [creator, setCreator] = useQueryParam('creator', StringParam);
  if (props.playerOne !== creator) props.setPlayerOne(creator);

  const updateState = useCallback((move) => {
    props.updateGame(move.gameState);
    props.updateUsers(move.userState);
  });

  const postNewState = useCallback((newState) => {
    socket.emit('new move', { ...newState });
  });

  useEffect(() => {
    socket.on('opponent move', move => {

      if (move.gameState.whiteToMove !== whiteToMove) {
        setWhiteToMove(move.gameState.whiteToMove)
        console.log('opponent move', move);
        const whiteToMove = props.whiteToMove;
        const fen = props.fen;
        const nextWhiteToMove = move.gameState.whiteToMove;
        const nextFen = move.gameState.fen;
  
        if (fen !== nextFen || whiteToMove !== nextWhiteToMove) {
          const currentState = props.chanceChessState;
          if (!deepEquals(move.gameState, currentState)) {
    
              updateState(move);
      
          }
        }
      }
    })
  })

  useEffect(() => {

    if (whiteToMove !== props.whiteToMove) {
      setWhiteToMove(props.whiteToMove)
      const newState = {
        gameState: props.chanceChessState,
        userState: props.usersState
      }
        postNewState(newState);
    }
  }, [props.whiteToMove])

  const deepEquals = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
  }

  const onSelectAll = () => {
    let whiteToMove = props.whiteToMove;

    if (playerNumber === 1 && !whiteToMove) {
      return;
    }
    if (playerNumber === 2 && whiteToMove) {
      return;
    }

    props.onSelectAll();
  }

  const getOwnUsername = () => {
    if (playerNumber === 1) {
      return props.playerOne;
    } else {
      return props.playerTwo;
    }
  }

  const getOpponentUsername = () => {
    if (playerNumber === 1) {
      return props.playerTwo;
    } else {
      return props.playerOne;
    }
  }

  const myTurn = () => {
    if (playerNumber === 1) {
      return props.whiteToMove;
    } else {
      return !props.whiteToMove;
    }
  }

  const opponentTurn = () => {
    if (playerNumber === 1) {
      return !props.whiteToMove;
    } else {
      return props.whiteToMove;
    }
  }

  const discardAllP1 = () => {
    let whiteToMove = props.whiteToMove;

    if (playerNumber === 1 && !whiteToMove) {
      return;
    }
    if (playerNumber === 2 && whiteToMove) {
      return;
    }
    if (!whiteToMove || props.player1Cards.length === 0) return;
    props.onDiscardAllCardsP1();
  }

  const discardAllP2 = () => {
    let whiteToMove = props.whiteToMove;

    if (playerNumber === 1 && !whiteToMove) {
      return;
    }
    if (playerNumber === 2 && whiteToMove) {
      return;
    }
    if (whiteToMove || props.player2Cards.length === 0) return;
    props.onDiscardAllCardsP2();
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

  const getUrl = () => {

    return config.url + '/game/' + props.gameId + '?creator=' + creator;
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
      <div className="body-container">
        <div style={{ position: 'absolute', top: '30px', left: '400px' }}>
          {(
            <div>{getUrl()}</div>
          )}
        </div>
        <div className="Board">
          <Board />
          <div className='card-containers'>
            {myTurn() &&
              <div style={{ marginLeft: '10px', color: 'white' }}>
                {getOpponentUsername()}
              </div>
            }
            {opponentTurn() &&
              <>
                <div style={{ backgroundColor: 'orange', color: 'black', width: 'fit-content', padding: '0 10px', marginLeft: '10px' }}>
                  {getOpponentUsername()}
                </div>
              </>
            }
            {playerNumber === 1 &&
              <Player2CardContainer disableControls={playerNumber === 1} cards={props.player2Cards} allCardsSelected={props.allSelected} />
            }
            {playerNumber === 2 &&
              <Player1CardContainer disableControls={playerNumber === 2} cards={props.player1Cards} allCardsSelected={props.allSelected} />
            }

            {props.cardsArray.length > 0 &&
              <>
                <div style={{ display: "flex", justifyContent: "center", height: '160px', marginBottom: '10px' }}>
                  {props.cardsArray && props.cardsArray.map((card, index) => {
                    return (
                      <div key={index}>
                        <Card suits={card.suits} card={card.card} color={card.color} front={false} />
                      </div>
                    );
                  })}
                </div>
                <div>

                </div>
                {myTurn() &&
                  <div style={{ backgroundColor: 'orange', color: 'black', width: 'fit-content', padding: '0 10px', marginLeft: '10px' }}>
                    {getOwnUsername()}
                  </div>
                }
                {opponentTurn() &&
                  <div style={{ marginLeft: '10px', color: 'white' }}>{getOwnUsername()}</div>
                }
              </>
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

            {playerNumber === 1 &&
              <>
                <Player1CardContainer disableControls={!props.whiteToMove} cards={props.player1Cards} allCardsSelected={props.allSelected} />
                <div style={{ display: 'flex', margin: '0 auto', width: '450px', justifyContent: 'center' }}>
                  <Button
                    onClick={discardAllP1}
                    style={{
                      backgroundColor: ' rgb(129 36 36)',
                      color: 'white',
                      width: '50%',
                      border: '1px solid black',
                    }}>
                    Discard All
                </Button>
                  <Button
                    style={{
                      backgroundColor: 'rgb(82 140 78)',
                      color: 'white',
                      border: '1px solid black',
                      width: '50%',
                    }}
                    onClick={() => onSelectAll()}
                  >
                    Select All
                </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div
                    onClick={resign}
                    style={{
                      cursor: 'pointer',
                      fontSize: '30px',
                      marginLeft: '10px'
                    }}>
                    🏳
                  </div>
                  <Rules />
                  <Key />
                </div>

              </>
            }

            {playerNumber === 2 &&
              <>
                <Player2CardContainer disableControls={props.whiteToMove} cards={props.player2Cards} allCardsSelected={props.allSelected} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    onClick={discardAllP2}
                    style={{
                      backgroundColor: ' rgb(129 36 36)',
                      color: 'white',
                      width: '50%',
                      border: '1px solid black',
                    }}>
                    Discard All
                </Button>
                  <Button
                    style={{
                      backgroundColor: 'rgb(82 140 78)',
                      color: 'white',
                      border: '1px solid black',
                      width: '50%',
                    }}
                    onClick={() => onSelectAll()}
                  >
                    Select All
                </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <div
                    onClick={resign}
                    style={{
                      cursor: 'pointer',
                      fontSize: '30px',
                      marginLeft: '10px'
                    }}>
                    🏳
                  </div>
                  <Rules />
                  <Key />
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </div >
  );
};

const mapStateToProps = (state) => {
  return {
    chanceChessState: state.chanceChessReducer,
    usersState: state.usersReducer,
    player1Cards: state.chanceChessReducer.player1Cards,
    player2Cards: state.chanceChessReducer.player2Cards,
    newBoard: state.chanceChessReducer.newBoard,
    whiteToMove: state.chanceChessReducer.whiteToMove,
    cardsArray: state.chanceChessReducer.cardsArray,
    selectedCard: state.chanceChessReducer.selectedCard,
    allSelected: state.chanceChessReducer.allSelected,
    fullDeck: state.chanceChessReducer.fullDeck,
    gameId: state.usersReducer.gameId,
    numPlayers: state.usersReducer.numPlayers,
    playerOne: state.usersReducer.playerOne,
    playerTwo: state.usersReducer.playerTwo,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetCard: () => dispatch(getCard()),
    onGetCardForPlayer2: () => dispatch(getPlayer2Card()),
    onDiscardAllCardsP1: () => dispatch(discardAllP1Cards()),
    onDiscardAllCardsP2: () => dispatch(discardAllP2Cards()),
    onShuffle: (p1Cards, p2Cards) => dispatch(shuffle(p1Cards, p2Cards)),
    onSelectAll: () => dispatch(selectAll()),
    updateGame: state => dispatch(updateGame(state)),
    updateUsers: state => dispatch(updateUsers(state)),
    setPlayerOne: playerOne => dispatch(setPlayerOne(playerOne))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
