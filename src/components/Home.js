import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import "../App.css";
import '../style/components/player1.scss';
import '../style/components/playerCard.scss';
import Header from '../components/Header';
import Tooltip from '@material-ui/core/Tooltip';
import moveSound from '../audio/capture.mp3';
import Button from '@material-ui/core/Button';
import Player2CardContainer from '../components/Players/Player2CardContainer';
import Player1CardContainer from '../components/Players/Player1CardContainer';
import StartDialog from './StartDialog';
import GameOverDialog from './GameOverDialog';
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
  setCard,
  setPlayer2Card,
  updateGameIfStale,
  newGame,
  gameOver
} from "../redux/actions/cardActions";
import { updateUsers, setPlayerOne, setPlayerTwo } from '../redux/actions/userActions';
import { useQueryParam, StringParam } from 'use-query-params';
import { socket } from "../connection/socket";

const Home = (props) => {

  let [whiteToMove, setWhiteToMove] = useState();

  let playerNumber;
  const isCreator = localStorage.getItem(props.gameId);
  if (isCreator) playerNumber = 1;
  else playerNumber = 2;


  useEffect(() => {
    socket.on('chance chess state updated', chanceChessState => {
      socket.removeAllListeners('chance chess state updated');
      // only update if it's not our turn
      if ((playerNumber === 1 && props.whiteToMove) || (playerNumber === 1 && !props.whiteToMove)) return;
      let moveAudio = new Audio(moveSound);
      this.playSound(moveAudio)
      props.updateGameIfStale(chanceChessState, props.gameId)
    })

    socket.on('player two drew', move => {
      if (playerNumber === 1) {
        const { cardsArray, player2Cards } = move;
        props.setPlayer2Card(player2Cards, cardsArray);
      }
    })

    socket.on('player one drew', move => {
      if (playerNumber === 2) {
        const { cardsArray, player1Cards } = move;
        props.setCard(player1Cards, cardsArray);
      }
    })

    socket.on('player two name is', username => {
      if (playerNumber === 1) {
        props.setPlayerTwo(username)
      }
    })

    return () => {
      socket.removeAllListeners('player one drew');
      socket.removeAllListeners('player two drew');
      socket.removeAllListeners('player two name is');
      socket.removeAllListeners('chance chess state updated');
    }
  })

  const [creator, setCreator] = useQueryParam('creator', StringParam);
  if (props.playerOne !== creator) props.setPlayerOne(creator);

  socket.removeAllListeners('opponent move');

  useEffect(() => {
    socket.on('opponent move', move => {

      if (playerNumber === 1 && !move.gameState.whiteToMove) return;
      if (playerNumber === 2 && move.gameState.whiteToMove) return;

      if (move.gameState.whiteToMove !== whiteToMove) {
        setWhiteToMove(move.gameState.whiteToMove)
        const whiteToMove = props.whiteToMove;
        const fen = props.fen;
        const nextWhiteToMove = move.gameState.whiteToMove;
        const nextFen = move.gameState.fen;

        if (fen !== nextFen || whiteToMove !== nextWhiteToMove) {
          const currentState = props.chanceChessState;
          if (!deepEquals(move.gameState, currentState)) {

            props.updateGame(move.gameState, move.userState.gameId);
            props.updateUsers(move.userState);

          }
        }
      }
    })
  })

  useEffect(() => {

    setTimeout(() => {
      socket.emit('chance chess state update', { chanceChessState: props.chanceChessState, gameId: props.gameId });
    }, 20000);

    if (whiteToMove !== props.whiteToMove) {
      setWhiteToMove(props.whiteToMove)
      const newState = {
        gameState: props.chanceChessState,
        userState: props.usersState
      }

      localStorage.setItem(`${props.gameId}-user`, JSON.stringify({ ...props.usersState }));
      localStorage.setItem(`${props.gameId}-game`, JSON.stringify({ ...props.chanceChessState }));

      socket.emit('new move', { ...newState });

      localStorage.setItem(`${props.gameId}-game`, JSON.stringify({ ...props.chanceChessState }));

      setTimeout(() => {
        socket.emit('new move', { ...newState });
      }, 1000)
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
      props.gameOver('Black')
    }

    if (!whiteToMove && window.confirm('Are you sure you want to resign?')) {
      props.gameOver('White')
    }

  }

  const newGame = () => {
    props.newGame();
  }

  const onDrawCards = () => {
    let playerNumber;
    const isCreator = localStorage.getItem(props.gameId);
    if (isCreator) playerNumber = 1;
    else playerNumber = 2;
    if ((playerNumber === 1 && !props.whiteToMove) || (playerNumber === 2 && props.whiteToMove)) return;

    if (playerNumber === 1) props.onGetCard();
    else props.onGetCardForPlayer2();

    const cardsArray = props.cardsArray;
    let player1Cards, player2Cards;
    if (playerNumber === 1) {
      player1Cards = props.player1Cards;
      if (player1Cards.length > 3) {
        const extraCard = player1Cards[3];
        cardsArray.unshift(extraCard);
        player1Cards = player1Cards.slice(0, 3);
      }
      socket.emit('player one draws', { gameId: props.gameId, player1Cards, cardsArray });
      localStorage.setItem(`${props.gameId}-game`, JSON.stringify({ ...props.chanceChessState }));

    } else if (playerNumber === 2) {
      player2Cards = props.player2Cards;
      if (player2Cards.length > 3) {
        const extraCard = player2Cards[3];
        cardsArray.unshift(extraCard);
        player2Cards = player2Cards.slice(0, 3);
      }
      socket.emit('player two draws', { gameId: props.gameId, player2Cards, cardsArray });
      localStorage.setItem(`${props.gameId}-game`, JSON.stringify({ ...props.chanceChessState }));
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
      {(
        props.numPlayers === 1 && (
          <StartDialog url={getUrl()} open={props.numPlayers === 1} />
        )
      )}
      {(
        props.winner && (
          <GameOverDialog message={props.winner + ' Wins.'} newGame={newGame} open={props.winner} />
        )
      )}
      <Header />
      <div className="body-container">
        <div className="Board">
          <Board />
          <div className='card-containers'>

            {playerNumber === 1 &&
              <Player2CardContainer disableControls={playerNumber === 1} cards={props.player2Cards || []} allCardsSelected={props.allSelected} />
            }
            {playerNumber === 2 &&
              <Player1CardContainer disableControls={playerNumber === 2} cards={props.player1Cards || []} allCardsSelected={props.allSelected} />
            }

            {props.cardsArray && props.cardsArray.length > 0 &&
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {props.cardsArray && props.cardsArray.map((card, index) => {
                    return (
                      <div key={index}>
                        <Card suits={card.suits} onDrawCards={onDrawCards} card={card.card} color={card.color} front={false} />
                      </div>
                    );
                  })}
                </div>

                <div style={{ position: 'absolute', top: '380px' }}>
                  {myTurn() &&
                    <div style={{ marginLeft: '10px', color: 'white', fontWeight: 'bold', letterSpacing: '2px', fontSize: '18px' }}>
                      {getOpponentUsername()}
                    </div>

                  }
                  {opponentTurn() &&
                    <>
                      <div style={{ backgroundColor: 'orange', color: 'black', width: '100px', fontWeight: 'bold', borderRadius: '10px', padding: '0 10px', marginLeft: '15px' }}>
                        {getOpponentUsername()}
                      </div>
                      <div style={{ color: 'white', fontSize: '80px', position: 'relative', top: '20px', left: '50px' }} className="arrowUp">⬆</div>
                    </>
                  }
                </div>


                <div>
                  {myTurn() &&
                    <div style={{ backgroundColor: 'orange', color: 'black', width: '100px', fontWeight: 'bold', borderRadius: '10px', padding: '0 10px', marginLeft: '15px' }}>
                      {getOwnUsername()}
                      <div style={{ position: 'absolute', top: '440px', color: 'white', fontSize: '80px' }} className="arrowDown">⬇</div>

                    </div>
                  }
                  {opponentTurn() &&
                    <div style={{ backgroundColor: 'rgb(62 50 50)', padding: '0 10px', width: '100px', borderRadius: '10px', marginLeft: '10px', color: 'white', letterSpacing: '2px' }}>{getOwnUsername()}</div>
                  }
                </div>

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
                      backgroundColor: 'rgb(50 155 42)',
                      color: 'white',
                      border: '1px solid black',
                      width: '50%',
                    }}
                    onClick={() => onSelectAll()}
                  >
                    Select All
                  </Button>
                </div>

                {/* Icons Sections */}

                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <Tooltip title="RESIGN">
                    <div
                      className="title"
                      onClick={resign}
                      style={{
                        cursor: 'pointer',
                        fontSize: '30px',
                        marginLeft: '10px'
                      }}>
                      🏳
                    </div>
                  </Tooltip>

                  <Tooltip title="RULES">
                    <div>
                      <Rules />
                    </div>
                  </Tooltip>

                  <Tooltip title="KEY">
                    <div>
                      <Key />
                    </div>
                  </Tooltip>
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
                      backgroundColor: 'rgb(50 155 42)',
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
      <Button
        style={{
          backgroundColor: '#277714',
          border: '1px solid black',
          position: 'absolute',
          bottom: '10px',
          right: '10px'
        }}
      >
        <a
          style={{ textDecoration: 'none', color: 'white', }}
          href="https://paypal.me/michaelrooze?locale.x=en_US" target="_blank" rel="noopener noreferrer">
          $ Donate
        </a>
      </Button >
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
    winner: state.chanceChessReducer.winner
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
    updateGame: (state, gameId) => dispatch(updateGame(state, gameId)),
    updateGameIfStale: (state, gameId) => dispatch(updateGameIfStale(state, gameId)),
    updateUsers: state => dispatch(updateUsers(state)),
    setPlayerOne: playerOne => dispatch(setPlayerOne(playerOne)),
    setPlayerTwo: playerTwo => dispatch(setPlayerTwo(playerTwo)),
    setCard: (player1Cards, cardsArray) => dispatch(setCard(player1Cards, cardsArray)),
    setPlayer2Card: (player2Cards, cardsArray) => dispatch(setPlayer2Card(player2Cards, cardsArray)),
    newGame: () => dispatch(newGame()),
    gameOver: winner => dispatch(gameOver(winner))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
