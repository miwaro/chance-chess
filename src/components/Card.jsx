import React from "react";
import { connect } from 'react-redux';
import { selectCard } from '../redux/actions/cardActions'

import PropTypes from "prop-types";

import backCardImg from "../style/images/backCardImg.png";
// import chessLogo from "../images/luckyRookFAV2.png";
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
import blackQueen from "../style/images/chessPieces/black/blackQueen.png";
import blackKing from "../style/images/chessPieces/black/blackKing.png";

import "../style/components/card.scss";
import "../style/components/playerCard.scss";

const Card = (props) => {

  const { suits, card, front, color, cardIndex, cardPiece, allCardsSelected } = props;
  console.log(typeof suits)

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

  // const getJoker = (cardIndex) => {
  //   if (cardIndex === 53 || cardIndex === 54) {
  //     return joker;
  //   }
  // }

  const getSelectedCard = (card, cardIndex) => {
    let allSelected = props.allSelected;

    if (props.disabled || allSelected) {
      return;
    }
    props.onSelectCard(card, cardIndex);
  }

  const selectedCardIndex = props.selectedCard ? props.selectedCard[1] : -1;
  let btn_class = (selectedCardIndex === cardIndex) || (allCardsSelected && !props.disabled) ? "clicked-card" : "card";

  let player1Suits = props.player1Cards.map(card => card.suits);
  let player2Suits = props.player2Cards.map(card => card.suits);


  let symbol_Style =
    (!props.disabled && props.player1Cards.length === 3 && player1Suits.every((val, i, arr) => val === arr[0])) ||
      (props.disabled && props.player2Cards.length === 3 && player2Suits.every((val, i, arr) => val === arr[0])) ? "rotate" : "";



  // let straight_Style = props.player1Cards.length === 3 && player1Suits.every((val, i, arr) => val === arr[0]) ? "rotate" : "";


  if (front && cardIndex < 53) {
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
          <div style={{ maxWidth: 25 }}>{card}</div>
          <div className={symbol_Style}>
            <img src={cardSymbol} alt="suit-symbol" style={{ maxWidth: 25 }} />
          </div>
        </div>
      </div>
    );
  } else if
    (cardIndex > 52) {
    return (
      <div
        className={btn_class}
        onClick={() => getSelectedCard(card, cardIndex)}
      >
        <img src={joker} alt="suit-symbol" style={{
          height: '172px',
          width: '140px',
          transform: 'translate(-8px, -6px)'
        }}
        />
      </div>
    )
  }

  else {
    return (
      <>
        <div
          className="deck-container"
          style={{
            backgroundImage: `url(${backCardImg})`,
            backgroundColor: 'lightgray'
          }}>
          <div style={{ position: 'absolute', bottom: '5px', right: '-18px', padding: '5px', color: 'orange', fontWeight: 'bold', backgroundColor: '#2b2b2b', borderRadius: '50%' }}>
            {props.cardsArray.length}
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
