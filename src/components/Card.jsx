import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { selectCard, removeSelectedCard, changeTurn, getCard, getPlayer2Card, setAnimateCards } from '../redux/actions/cardActions'

import PropTypes from "prop-types";
import Tooltip from '@material-ui/core/Tooltip';

import backCardImg from "../images/chessLogo5.png";
import addIcon from "../style/images/AddIcon.png";
import joker from "../style/images/joker.png";
import heart from "../style/images/heart.png";
import diamond from "../style/images/diamond.png";
import club from "../style/images/club.png";
import spade from "../style/images/spade.png";

import redPawn from "../style/images/chessPieces/red/redPawn.png";
import redRook from "../style/images/chessPieces/red/redRook.png";
import redKnight from "../style/images/chessPieces/red/redKnight.png";
import redBishop from "../style/images/chessPieces/red/redBishop.png";
import redQueen from "../style/images/chessPieces/red/redQueen.png";
import redKing from "../style/images/chessPieces/red/redKing.png";

import blackPawn from "../style/images/chessPieces/black/blackPawn.png";
import blackRook from "../style/images/chessPieces/black/blackRook.png";
import blackKnight from "../style/images/chessPieces/black/blackKnight.png";
import blackBishop from "../style/images/chessPieces/black/blackBishop.png";
import blackQueenImg from "../style/images/chessPieces/black/blackQueen.png";
import blackKingImg from "../style/images/chessPieces/black/blackKing.png";


import "../style/components/card.scss";
import "../style/components/playerCard.scss";
var classNames = require('classnames');

const Card = (props) => {

  const { suits, card, front, color, cardIndex, cardPiece, allCardsSelected, animationCount, isFromDeck = false } = props;

  let [className, setClassName] = useState('animatedCards');

  let [selectedClassName, setSelectedClassName] = useState('card-container');

  const getCardSymbol = (suits) => {
    let symbol;

    switch (suits) {
      case "Diamond":
        return symbol = diamond;
      case "Heart":
        return symbol = heart;
      case "Club":
        return symbol = club;
      case "Spade":
        return symbol = spade;
      default:
        return symbol;
    };
  };

  const getRedChessPiece = (cardPiece) => {
    let piece;
    switch (cardPiece) {
      case "p":
        return piece = redPawn;
      case "r":
        return piece = redRook;
      case "n":
        return piece = redKnight;
      case "b":
        return piece = redBishop;
      case "q":
        return piece = redQueen;
      case "k":
        return piece = redKing;
      default:
        return piece;
    };
  };

  const getBlackChessPiece = (cardPiece) => {
    let piece;
    switch (cardPiece) {
      case "p":
        return piece = blackPawn;
      case "r":
        return piece = blackRook;
      case "n":
        return piece = blackKnight;
      case "b":
        return piece = blackBishop;
      case "q":
        return piece = blackQueenImg;
      case "k":
        return piece = blackKingImg;
      default:
        return piece;
    };
  };

  // const drawCards = () => {
  //   if (props.whiteToMove && props.player1Cards.length === 3) {
  //     return
  //   } else {
  //     props.setAnimateCards(true);
  //     props.onDrawCards();
  //   }
  // }

  useEffect(() => {
    if (props.animateCards) {
      if (className !== 'card-block_animations' && isMyTurn(props.playerNumber)) {
        animate();
      }
    } else {
      setClassName('card')
    }
  }, [props.animateCards, props.playerNumber])

  useEffect(() => {
    if (props.blockAnimation) {
      setClassName('card-block_animations')
    }
  }, [props.blockAnimation])

  const selectedCardIndex = props.selectedCard ? props.selectedCard[1] : -1;
  const updatedClassName = (selectedCardIndex === cardIndex) || (allCardsSelected && !props.disabled) ? "clicked-card" : "card-container";
  if (updatedClassName !== selectedClassName) {
    setSelectedClassName(updatedClassName)
  }

  const isMyTurn = (playerNumber) => {

    if (playerNumber === 1 && props.whiteToMove) {
      return true;
    }
    if (playerNumber === 2 && !props.whiteToMove) {
      return true;
    }
    return false;
  }

  const animate = () => {
    if (isFromDeck) {
      setClassName('animatedCards');
    } else {
      setClassName('card');
    }
  }

  const getSelectedCard = (card, cardIndex) => {
    let allSelected = props.allSelected;
    if (props.disabled || allSelected) {
      return;
    }
    props.onSelectCard(card, cardIndex);
  }

  const discardOne = (selectedCardIndex) => {
    if (props.selectedCard.length === 0 || cardIndex !== props.selectedCard[1]) return;
    props.setAnimateCards(false);
    props.onRemoveSelected(selectedCardIndex)
    props.onChangeTurn();
  }


  let player1Suits = props.player1Cards.map(card => card.suits);
  let player2Suits = props.player2Cards.map(card => card.suits);


  let symbol_Style =
    (!props.disabled && props.player1Cards.length === 3 && player1Suits.every((val, i, arr) => val === arr[0])) ||
      (!props.disabled && props.player2Cards.length === 3 && player2Suits.every((val, i, arr) => val === arr[0])) ? "rotate" : "";

  // Create Straight Styles********************************************************************************************
  let isAStraight = false;
  let p1 = props.player1Cards;
  let p2 = props.player2Cards;
  let p1Card = p1.map(card => card.card);
  let p2Card = p2.map(card => card.card);


  let ace = p1Card.indexOf('A');
  let jack = p1Card.indexOf('J')
  let queen = p1Card.indexOf('Q');
  let king = p1Card.indexOf('K');

  let blackAce = p2Card.indexOf('A');
  let blackJack = p2Card.indexOf('J')
  let blackQueen = p2Card.indexOf('Q');
  let blackKing = p2Card.indexOf('K');

  if (ace !== -1) {
    p1Card[ace] = '1';
  }

  if (jack !== -1) {
    p1Card[jack] = '11';
  }

  if (queen !== -1) {
    p1Card[queen] = '12';
  }

  if (king !== -1) {
    p1Card[king] = '13';
  }

  if (blackAce !== -1) {
    p2Card[blackAce] = '1';
  }

  if (blackJack !== -1) {
    p2Card[blackJack] = '11';
  }

  if (blackQueen !== -1) {
    p2Card[blackQueen] = '12';
  }

  if (blackKing !== -1) {
    p2Card[blackKing] = '13';
  }

  let sorted = p1Card.sort((a, b) => a - b);
  let straight = sorted.map(i => Number(i))
  for (var i = 0; i < straight.length; i++) {
    var diff = straight[i + 1] - straight[i];
    let total = straight.reduce((a, b) => a + b, 0)
    if ((Math.abs(diff) === 1 && straight[i + 1] + diff === straight[i + 2]) || (straight.includes(1) && total === 26)) {
      isAStraight = true;
    }
  }

  let sorted2 = p2Card.sort((a, b) => a - b);
  let straight2 = sorted2.map(i => Number(i))
  for (var i = 0; i < straight2.length; i++) {
    var diff2 = straight2[i + 1] - straight2[i];
    let total = straight2.reduce((a, b) => a + b, 0)
    if ((Math.abs(diff2) === 1 && straight2[i + 1] + diff2 === straight2[i + 2]) || (straight2.includes(1) && total === 26)) {
      isAStraight = true;
    }
  }

  if (front && cardIndex < 53) {
    const cardSymbol = getCardSymbol(suits);
    const redChessPiece = getRedChessPiece(cardPiece);
    const blackChessPiece = getBlackChessPiece(cardPiece);

    let straight_Style = !props.disabled && isAStraight ? "rotate" : "";
    let straight_Style2 = !props.disabled && isAStraight ? "rotate" : "";


    return (
      <div className={selectedClassName}>
        <div
          className={className}
          style={{ color: `${color}` }}
          onClick={() => getSelectedCard(card, cardIndex)}
        >
          {props.selectedCard.length > 0 && cardIndex === props.selectedCard[1] &&
            <button
              onClick={() => discardOne(props.selectedCard[1])}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                padding: '5px',
                border: 'none',
                color: 'red',
                cursor: 'pointer',
                borderRadius: '4px'
              }}>
              Discard
            </button>
          }
          <button
            onClick={() => getSelectedCard(card, cardIndex)}
            style={{
              position: 'absolute',
              bottom: '5px',
              left: '5px',
              border: 'none',
              padding: '5px',
              cursor: 'pointer',
              borderRadius: '4px'
            }}>
            Select
          </button>

          <div style={{ position: "absolute", top: 5, left: 5 }}>
            <div className={straight_Style} style={{ maxWidth: 25 }}>{card}</div>
            <div className={symbol_Style}>
              <img src={cardSymbol} alt="suit-symbol" style={{ maxWidth: 25 }} />
            </div>
          </div>

          {color === 'red' ?
            <div><img src={redChessPiece} alt="red-chess-piece" style={{ height: 42, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} /></div>
            :
            <div><img src={blackChessPiece} alt="red-chess-piece" style={{ height: 42, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} /></div>
          }

          <div style={{ position: "absolute", bottom: 5, right: 5, transform: "rotate(-180deg)" }}>
            <div className={straight_Style2} style={{ maxWidth: 25 }}>{card}</div>
            <div className={symbol_Style}>
              <img src={cardSymbol} alt="suit-symbol" style={{ maxWidth: 25 }} />
            </div>
          </div>
        </div>
      </div>
    );
  } else if
    (cardIndex > 52) {
    return (
      <>
        <div className={selectedClassName}>

          <div
            onClick={() => getSelectedCard(card, cardIndex)}
            className={className}>
            <img src={joker} alt="suit-symbol" style={{
              height: '172px',
              width: '140px',
              transform: 'translate(-8px, -6px)'
            }}
            />
            {props.selectedCard.length > 0 && cardIndex === props.selectedCard[1] &&
              <button
                onClick={() => discardOne(props.selectedCard[1])}
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '0',
                  padding: '5px',
                  border: 'none',
                  color: 'red',
                  opacity: '.7',
                  cursor: 'pointer',
                  borderRadius: '4px'
                }}>
                Discard
              </button>
            }

            <button
              onClick={() => getSelectedCard(card, cardIndex)}
              style={{
                position: 'absolute',
                bottom: '5px',
                left: '5px',
                border: 'none',
                padding: '5px',
                cursor: 'pointer',
                borderRadius: '4px'
              }}>
              Select
            </button>
          </div>
        </div>
      </>
    )
  }

  else {
    return (
      <>
        {/* <Tooltip title="DRAW">
          <div
            className="addIcon"
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: '46px',
              left: '-220px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
            <img
              src={addIcon} alt="add-icon"
              onClick={() => drawCards()}
            />
          </div>
        </Tooltip> */}
        <div
          className="deck-container"
          style={{
            backgroundImage: `url(${backCardImg})`,
            backgroundColor: 'rgb(50, 155, 42)',
            borderRadius: '10%',
            // boxShadow: '5px 10px 10px black'
          }}>
          <Tooltip title="Cards Remaining" placement="right">
            <div
              style={{
                position: 'absolute',
                top: '5px',
                right: '-18px',
                padding: '5px',
                color: 'orange',
                fontWeight: 'bold',
                border: '1px solid',
                cursor: 'default',
                backgroundColor: 'rgb(62 50 50)',
                borderRadius: '50%'
              }}
            >
              {props.cardsArray.length}
            </div>
          </Tooltip>
        </div>

      </>
    );
  };
};

const mapStateToProps = (state) => {

  return {
    player1Cards: state.chanceChessReducer.player1Cards,
    player2Cards: state.chanceChessReducer.player2Cards,
    playerOne: state.usersReducer.playerOne,
    playerTwo: state.usersReducer.playerTwo,
    whiteToMove: state.chanceChessReducer.whiteToMove,
    selectedCard: state.chanceChessReducer.selectedCard,
    cardsArray: state.chanceChessReducer.cardsArray,
    allSelected: state.chanceChessReducer.allSelected,
    gameId: state.usersReducer.gameId,
    animateCards: state.chanceChessReducer.animateCards
  }
}

const mapDispatchToProps = dispatch => {

  return {
    onSelectCard: (card, cardIndex) => dispatch(selectCard(card, cardIndex)),
    onRemoveSelected: (selectedCardIndex) => dispatch(removeSelectedCard(selectedCardIndex)),
    onChangeTurn: () => dispatch(changeTurn()),
    onGetCard: () => dispatch(getCard()),
    onGetCardForPlayer2: () => dispatch(getPlayer2Card()),
    setAnimateCards: bool => dispatch(setAnimateCards(bool))

  }
}

Card.propTypes = {
  suits: PropTypes.string,
  card: PropTypes.string,
  front: PropTypes.bool,
  color: PropTypes.string
};


export default connect(mapStateToProps, mapDispatchToProps)(Card);
