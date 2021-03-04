import React, { Component } from "react";
import PropTypes from "prop-types";
import Chess from "./Chess.js";
import { connect } from 'react-redux';
import { changeTurn, removeSelectedCard, discardAllP1Cards, discardAllP2Cards } from "../redux/actions/cardActions";

class HumanVsHuman extends Component {
    static propTypes = { children: PropTypes.func };

    state = {
        // Start position
        fen: 'start',
        // square styles for active drop square
        dropSquareStyle: {},
        // custom square styles
        squareStyles: {},
        // square with the currently clicked piece
        pieceSquare: "",
        // currently clicked square
        square: "",
        // array of past game moves
        history: [],

        orientation: 'white',
    };

    componentDidMount() {
        this.game = new Chess();
    }

    set_turn = (chess, color) => {
        var tokens = chess.fen().split(' ');
        tokens[1] = color;
        chess.load(tokens.join(' '));
    }


    // Resets the board to starting position
    componentDidUpdate(prevProps) {
        let whiteToMove = this.props.whiteToMove;

        if (this.props.newBoard !== prevProps.newBoard) {
            this.game = new Chess();
            this.setState((state, props) => ({
                history: [],
                fen: 'start'
            }))
        }

        else if (whiteToMove) {
            this.set_turn(this.game, 'w')
        }
        else if (!whiteToMove) {
            this.set_turn(this.game, 'b')
        }

    }

    onDragStart = ({ piece, sourceSquare, draggable }) => {

        let chessPiece = piece[1].toLowerCase();
        let column = sourceSquare[0];
        let selected = this.props.selectedCard;
        let player1Suits = this.props.player1Cards.map(card => card.suits);
        let player2Suits = this.props.player2Cards.map(card => card.suits);

        if (selected === null) return;

        let clubs = player1Suits.every(suit => suit === 'Club')
        let clubs2 = player2Suits.every(suit => suit === 'Club')
        // console.log(clubs)

        let diamonds = player1Suits.every(suit => suit === 'Diamond')
        let diamonds2 = player1Suits.every(suit => suit === 'Diamond')
        // console.log(diamonds)

        let spades = player1Suits.every(suit => suit === 'Spade')
        let spades2 = player1Suits.every(suit => suit === 'Spade')
        // console.log(spades)

        let hearts = player1Suits.every(suit => suit === 'Heart')
        let hearts2 = player1Suits.every(suit => suit === 'Heart')
        // console.log(hearts)


        if (selected) {
            // combo conditions
            if (clubs && chessPiece === 'n') {
                draggable = true;
            }
            if (diamonds && chessPiece === 'b') {
                draggable = true;
            }
            if (spades && chessPiece === 'r') {
                draggable = true;
            }
            if (hearts && chessPiece === 'q') {
                draggable = true;
            }
            // combo conditions for player 2
            if (clubs2 && chessPiece === 'n') {
                draggable = true;
            }
            if (diamonds2 && chessPiece === 'b') {
                draggable = true;
            }
            if (spades2 && chessPiece === 'r') {
                draggable = true;
            }
            if (hearts2 && chessPiece === 'q') {
                draggable = true;
            }
            // conditions for pawns
            if ((selected.cardValue === 'A' && chessPiece === 'p') && (selected.cardValue === 'A' && column === 'a')) {
                draggable = true;
            }
            if ((selected.cardValue === '2' && chessPiece === 'p') && (selected.cardValue === '2' && column === 'b')) {
                draggable = true;
            }
            if ((selected.cardValue === '3' && chessPiece === 'p') && (selected.cardValue === '3' && column === 'c')) {
                draggable = true;
            }
            if ((selected.cardValue === '4' && chessPiece === 'p') && (selected.cardValue === '4' && column === 'd')) {
                draggable = true;
            }
            if ((selected.cardValue === '5' && chessPiece === 'p') && (selected.cardValue === '5' && column === 'e')) {
                draggable = true;
            }
            if ((selected.cardValue === '6' && chessPiece === 'p') && (selected.cardValue === '6' && column === 'f')) {
                draggable = true;
            }
            if ((selected.cardValue === '7' && chessPiece === 'p') && (selected.cardValue === '7' && column === 'g')) {
                draggable = true;
            }
            if ((selected.cardValue === '8' && chessPiece === 'p') && (selected.cardValue === '8' && column === 'h')) {
                draggable = true;
            }
            // if conditions for non pawns
            if (selected.cardValue === '9' && chessPiece === 'r') {
                draggable = true;
            }
            if (selected.cardValue === '10' && chessPiece === 'n') {
                draggable = true;
            }
            if (selected.cardValue === 'J' && chessPiece === 'b') {
                draggable = true;
            }
            if (selected.cardValue === 'Q' && chessPiece === 'q') {
                draggable = true;
            }
            if (selected.cardValue === 'K' && chessPiece === 'k') {
                draggable = true;
            }

        }

        return draggable;
    };


    onDrop = ({ sourceSquare, targetSquare }) => {
        let whiteToMove = this.props.whiteToMove;

        let selected = this.props.selectedCard
        console.log(`selected: ${selected}`)
        // if (selected === null) return;

        // see if the move is legal
        let move = this.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });

        console.log(move)
        if (move === null) return;

        if (whiteToMove) {
            this.setState({ orientation: 'black' })
        } else if (!whiteToMove) {
            this.setState({ orientation: 'white' })
        }

        this.setState({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
        });

        if (move.captured === 'k' && whiteToMove) {
            alert('White Wins')
        }
        if (move.captured === 'k' && !whiteToMove) {
            alert('Black Wins!')
        }
        console.log(move)

        // If you play a combo, all of your cards will be removed and the next player will go.
        if (whiteToMove && move.piece !== selected.cardPiece) {
            this.props.onDiscardAllCardsP1()
            this.props.onChangeTurn();
        }

        if (!whiteToMove && move.piece !== selected.cardPiece) {
            this.props.onDiscardAllCardsP2()
            this.props.onChangeTurn();
        }

        this.props.onRemoveSelected(this.props.selectedCard.cardIndex)
        this.props.onChangeTurn();

    };

    render() {

        const { fen, squareStyles, dropSquareStyle, orientation, draggable } = this.state;

        return this.props.children({
            squareStyles,
            position: fen,
            orientation: orientation,
            onDrop: this.onDrop,
            onDragStart: this.onDragStart,
            draggable: draggable,
            dropSquareStyle
        });
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        player1Cards: state.chanceChessReducer.player1Cards,
        player2Cards: state.chanceChessReducer.player2Cards,
        newBoard: state.chanceChessReducer.newBoard,
        selectedCard: state.chanceChessReducer.selectedCard,
        forceMove: state.chanceChessReducer.forceMove,
        whiteToMove: state.chanceChessReducer.whiteToMove
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeTurn: () => dispatch(changeTurn()),
        onRemoveSelected: (selectedCardIndex) => dispatch(removeSelectedCard(selectedCardIndex)),
        onDiscardAllCardsP1: () => dispatch(discardAllP1Cards()),
        onDiscardAllCardsP2: () => dispatch(discardAllP2Cards())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HumanVsHuman);