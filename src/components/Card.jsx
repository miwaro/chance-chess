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
  console.log(props)

  const [isNotSelected, setIsSelected] = useState(false)
  // const [change, setChange] = useState(false)

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



  // const getCardInformation = (card, cardIndex, cardPiece) => {
  //   if (props.disabled) {
  //     return;
  //   }
  //   setIsSelected(!isNotSelected)

  //   const turn = props.whiteToMove


  //   props.onSelectCard(card, cardIndex, cardPiece, turn);


  //   if (isNotSelected) {
  //     props.onDeselectCard(cardIndex)
  //   }

  // }

  const getCardInformation = (card, cardIndex, cardPiece) => {
    if (props.disabled) {
      return;
    }


    setIsSelected(!isNotSelected)

    const turn = props.whiteToMove


    props.onSelectCard(card, cardIndex, cardPiece, turn);


    if (isNotSelected) {
      props.onDeselectCard(cardIndex)
    }

  }


  const selectedCardIndex = props.selectedCard ? props.selectedCard.cardIndex : -1;
  // let btn_class = !allCardsSelected ? "clicked-card" : "card";
  let btn_class = selectedCardIndex === cardIndex || (allCardsSelected && !props.disabled) ? "clicked-card" : "card";

  if (front) {
    const cardSymbol = getCardSymbol(suits);
    const redChessPiece = getRedChessPiece(cardPiece);
    const blackChessPiece = getBlackChessPiece(cardPiece);
    return (

      <div
        className={btn_class}
        style={{ color: `${color}`, isNotSelected: isNotSelected }}
        onClick={() => getCardInformation(card, cardIndex, cardPiece, allCardsSelected)}
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
        <div className="deck-container" style={{ backgroundImage: `url(${backCardImg})`, backgroundColor: 'lightgray' }}></div>
        {/* <div className="deck-container" style={{ backgroundImage: `url(${chessLogo})`, backgroundColor: 'lightgray', height: '50%' }}></div> */}
        {/* <div><img className="deck-container" src={chessLogo} alt="lucky rook logo" /></div> */}
      </>
    );
  };
};

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    player1Cards: state.chanceChessReducer.player1Cards,
    player2Cards: state.chanceChessReducer.player2Cards,
    newBoard: state.chanceChessReducer.newBoard,
    whiteToMove: state.chanceChessReducer.whiteToMove,
    selectedCard: state.chanceChessReducer.selectedCard
  }
}

const mapDispatchToProps = dispatch => {
  // console.log(dispatch)
  return {
    onSelectCard: (card, cardIndex, cardPiece, turn) => dispatch(selectCard(card, cardIndex, cardPiece, turn)),
    onDeselectCard: (cardIndex) => dispatch(deselectCard(cardIndex))
  }
}

Card.propTypes = {
  suits: PropTypes.string,
  card: PropTypes.string,
  front: PropTypes.bool,
  color: PropTypes.string
};


export default connect(mapStateToProps, mapDispatchToProps)(Card);
