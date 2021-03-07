import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { selectCard } from '../redux/actions/cardActions'
import { deselectCard } from '../redux/actions/cardActions'

import PropTypes from "prop-types";

import backCardImg from "../style/images/backCardImg.png";
import chessLogo from "../images/luckyRookFAV2.png";
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
import blackQueen from "../style/images/chessPieces/black/blackQueen.png";
import blackKing from "../style/images/chessPieces/black/blackKing.png";

import "../style/components/card.scss";
import "../style/components/playerCard.scss";

const Card = (props) => {

  const { suits, card, front, color, cardIndex, cardPiece, allCardsSelected } = props;

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
        return piece = blackQueen;
      case "k":
        return piece = blackKing;
      default:
        return piece;
    };
  };

  const getSelectedCard = (card, cardIndex) => {
    let allSelected = props.allSelected;

    if (props.disabled || allSelected) {
      return;
    }
    props.onSelectCard(card, cardIndex);
  }

  const selectedCardIndex = props.selectedCard ? props.selectedCard[1] : -1;
  let btn_class = (selectedCardIndex === cardIndex) || (allCardsSelected && !props.disabled) ? "clicked-card" : "card";

  if (front) {
    const cardSymbol = getCardSymbol(suits);
    const redChessPiece = getRedChessPiece(cardPiece);
    const blackChessPiece = getBlackChessPiece(cardPiece);

    return (
      <div
        className={btn_class}
        style={{ color: `${color}` }}
        onClick={() => getSelectedCard(card, cardIndex)}
      >
        <div style={{ position: "absolute", top: 5, left: 5 }}>
          <div style={{ maxWidth: 25 }}>{card}</div>
          <img src={cardSymbol} alt="suit-symbol" style={{ maxWidth: 25 }} />
        </div>

        { color === 'red' ?
          <div><img src={redChessPiece} alt="red-chess-piece" style={{ height: 42, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} /></div>
          :
          <div><img src={blackChessPiece} alt="red-chess-piece" style={{ height: 42, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} /></div>
        }

        <div style={{ position: "absolute", bottom: 5, right: 5, transform: "rotate(-180deg)" }}>
          <div style={{ maxWidth: 25 }}>{card}</div>
          <img src={cardSymbol} alt="suit-symbol" style={{ maxWidth: 25 }} />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div
          className="deck-container"
          style={{
            backgroundImage: `url(${backCardImg})`,
            backgroundColor: 'lightgray'
          }}>
          <div style={{ backgroundImage: `url(${chessLogo})` }}>

          </div>
          <div style={{ position: 'absolute', bottom: '5px', right: '-18px', padding: '5px', color: 'orange', fontWeight: 'bold', backgroundColor: '#2b2b2b', borderRadius: '50%' }}>
            {props.cardsArray.length - 1}
          </div>
        </div>

      </>
    );
  };
};

const mapStateToProps = (state) => {

  return {
    player1Cards: state.chanceChessReducer.player1Cards,
    player2Cards: state.chanceChessReducer.player2Cards,
    whiteToMove: state.chanceChessReducer.whiteToMove,
    selectedCard: state.chanceChessReducer.selectedCard,
    cardsArray: state.chanceChessReducer.cardsArray,
    allSelected: state.chanceChessReducer.allSelected
  }
}

const mapDispatchToProps = dispatch => {

  return {
    onSelectCard: (card, cardIndex) => dispatch(selectCard(card, cardIndex))
  }
}

Card.propTypes = {
  suits: PropTypes.string,
  card: PropTypes.string,
  front: PropTypes.bool,
  color: PropTypes.string
};


export default connect(mapStateToProps, mapDispatchToProps)(Card);
