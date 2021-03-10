import React, { Component } from "react";
import PropTypes from "prop-types";
import Chess from "./Chess.js";
import { connect } from 'react-redux';
import {
    changeTurn,
    removeSelectedCard,
    discardAllP1Cards,
    discardAllP2Cards,
    shuffleOnMount,
    selectAll,
    removeNines,
    removeTens,
    removeJacks,
} from "../redux/actions/cardActions";

class HumanVsHuman extends Component {
    static propTypes = { children: PropTypes.func };

    state = {
        fen: 'start',
        square: "",
        orientation: 'white',
        initial: {
            W: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
            B: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 }
        }
    };

    componentDidMount() {
        this.game = new Chess();
        this.props.onShuffle();
    }

    set_turn = (chess, color) => {
        var tokens = chess.fen().split(' ');
        tokens[1] = color;
        chess.load(tokens.join(' '));
    }


    // Resets the board to starting position
    componentDidUpdate(prevProps) {
        let whiteToMove = this.props.whiteToMove;


        if (whiteToMove) {
            this.set_turn(this.game, 'w')
        }
        else if (!whiteToMove) {
            this.set_turn(this.game, 'b')
        }

        if (this.props.player1Cards !== prevProps.player1Cards && !whiteToMove) {
            this.setState({ orientation: 'black' })
        }

        if (this.props.player2Cards !== prevProps.player2Cards && whiteToMove) {
            this.setState({ orientation: 'white' })
        }
    }

    onDragStart = ({ piece, sourceSquare }) => {
        let draggable = false;
        let chessPiece = piece[1].toLowerCase();
        let column = sourceSquare[0];
        let whiteToMove = this.props.whiteToMove;
        let selectedCard = this.props.selectedCard;
        let isAllSelected = this.props.allSelected;
        let p1 = this.props.player1Cards;
        let p2 = this.props.player2Cards;

        let player1Suits = p1.map(card => card.suits);
        // console.log('player1Suits', player1Suits)
        let player2Suits = p2.map(card => card.suits);
        // console.log('player2Suits', player2Suits)

        if (selectedCard.length === 0 && this.props.allSelected === false) return;

        // Check for player1 Combos

        let clubs = p1 && player1Suits.every(suit => suit === 'Club')
        // console.log('clubs', clubs)

        let diamonds = p1 && player1Suits.every(suit => suit === 'Diamond')
        // console.log('diamonds', diamonds)

        let spades = p1 && player1Suits.every(suit => suit === 'Spade')
        // console.log('spades', spades)

        let hearts = p1 && player1Suits.every(suit => suit === 'Heart')
        // console.log('hearts', hearts)

        // Check for player2 Combos

        let clubs2 = p2 && player2Suits.every(suit => suit === 'Club')
        // console.log('clubs2', clubs2)

        let diamonds2 = p2 && player2Suits.every(suit => suit === 'Diamond')
        // console.log('diamonds2', diamonds2)

        let spades2 = p2 && player2Suits.every(suit => suit === 'Spade')
        // console.log('spades2', spades2)

        let hearts2 = p2 && player2Suits.every(suit => suit === 'Heart')
        // console.log('hearts2', hearts2)

        // console.log('draggable', draggable)


        if (isAllSelected) {
            // console.log('enter if statement')
            // console.log(`isAllSelected: ${isAllSelected}`)
            // console.log('selectedCard[0]', selectedCard[0])
            // console.log('chessPiece', chessPiece)
            // console.log(`selectedCardLength ${selectedCard.length}`)
            // combo conditions for player1
            if (whiteToMove) {
                if (clubs && (chessPiece === 'n')) {
                    draggable = true;
                }
                if (diamonds && (chessPiece === 'b')) {
                    draggable = true;
                }
                if (spades && (chessPiece === 'r')) {
                    draggable = true;
                }
                if (hearts && (chessPiece === 'q')) {
                    draggable = true;
                }
            }
            if (!whiteToMove) {
                // combo conditions for player 2
                if (clubs2 && (chessPiece === 'n')) {
                    draggable = true;
                }
                if (diamonds2 && (chessPiece === 'b')) {
                    draggable = true;
                }
                if (spades2 && (chessPiece === 'r')) {
                    draggable = true;
                }
                if (hearts2 && (chessPiece === 'q')) {
                    draggable = true;
                }
            }

        } else { draggable = false };

        // conditions for pawns
        if (selectedCard.cardLength !== 0) {
            if ((selectedCard[0] === 'A' && chessPiece === 'p') && (selectedCard[0] === 'A' && column === 'a')) {
                draggable = true;
            }
            if ((selectedCard[0] === '2' && chessPiece === 'p') && (selectedCard[0] === '2' && column === 'b')) {
                draggable = true;
            }
            if ((selectedCard[0] === '3' && chessPiece === 'p') && (selectedCard[0] === '3' && column === 'c')) {
                draggable = true;
            }
            if ((selectedCard[0] === '4' && chessPiece === 'p') && (selectedCard[0] === '4' && column === 'd')) {
                draggable = true;
            }
            if ((selectedCard[0] === '5' && chessPiece === 'p') && (selectedCard[0] === '5' && column === 'e')) {
                draggable = true;
            }
            if ((selectedCard[0] === '6' && chessPiece === 'p') && (selectedCard[0] === '6' && column === 'f')) {
                draggable = true;
            }
            if ((selectedCard[0] === '7' && chessPiece === 'p') && (selectedCard[0] === '7' && column === 'g')) {
                draggable = true;
            }
            if ((selectedCard[0] === '8' && chessPiece === 'p') && (selectedCard[0] === '8' && column === 'h')) {
                draggable = true;
            }
            // if conditions for non pawns
            if (selectedCard[0] === '9' && chessPiece === 'r') {
                draggable = true;
            }
            if (selectedCard[0] === '10' && chessPiece === 'n') {
                draggable = true;
            }
            if (selectedCard[0] === 'J' && chessPiece === 'b') {
                draggable = true;
            }
            if (selectedCard[0] === 'Q' && chessPiece === 'q') {
                draggable = true;
            }
            if (selectedCard[0] === 'K' && chessPiece === 'k') {
                draggable = true;
            }
        } else { draggable = false };



        // console.log('draggable', draggable)

        return draggable;
    };






    onDrop = ({ sourceSquare, targetSquare }) => {
        let whiteToMove = this.props.whiteToMove;
        let selected = this.props.selectedCard
        // see if the move is legal
        let move = this.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });

        if (move === null) return;

        // Change orientation
        if (whiteToMove) {
            this.setState({ orientation: 'black' })
        } else if (!whiteToMove) {
            this.setState({ orientation: 'white' })
        }

        // Do this after playing a combo
        if (whiteToMove && selected.length === 0) {
            this.props.onDiscardAllCardsP1()
            this.props.onChangeTurn();
            this.props.onSelectAll();
        }
        if (!whiteToMove && selected.length === 0) {
            this.props.onDiscardAllCardsP2()
            this.props.onChangeTurn();
            this.props.onSelectAll();
        }

        // Set the position of the board after the piece drops
        this.setState({
            fen: this.game.fen(),
        });


        // Winners Message
        if (move.captured === 'k' && whiteToMove) {
            alert('White Wins')
        }
        if (move.captured === 'k' && !whiteToMove) {
            alert('Black Wins!')
        }


        // Capture Piece Sidebar
        let moveArray = Object.entries(move)

        let captured = moveArray.reduce(function (acc, move) {

            if (move[0] === 'captured') {

                var piece = move[1]
                var color = whiteToMove ? 'B' : 'W';
                acc[color][piece] += 1;
                return acc;
            } else {
                return acc;
            }
        }, this.state.initial);

        this.setState({ initial: captured })


        // Add logic to run the 3 cardRemovalActions

        let p1 = this.props.player1Cards;
        let p2 = this.props.player2Cards;

        let player1Cards = p1.map(card => card.card);
        let player2Cards = p2.map(card => card.card);

        let nines = () => '9'
        let tens = () => '10'
        let jacks = () => 'J';

        if (this.state.fen.indexOf('r') === -1 && this.state.fen.indexOf('R') === -1) {
            if (player1Cards.some(nines) || player2Cards.some(nines)) {
                return;
            }
            this.props.onRemoveNines(this.props.cardsArray);
        }
        if (this.state.fen.indexOf('n') === -1 && this.state.fen.indexOf('N') === -1) {
            if (player1Cards.some(tens) || player2Cards.some(tens)) {
                return;
            }
            this.props.onRemoveTens(this.props.cardsArray);

        }
        if (this.state.fen.indexOf('b') === -1 && this.state.fen.indexOf('B') === -1) {
            if (player1Cards.some(jacks) || player2Cards.some(jacks)) {
                return;
            }
            this.props.onRemoveJacks(this.props.cardsArray);
        }



        this.props.onRemoveSelected(this.props.selectedCard[1])
        this.props.onChangeTurn();


    };




    render() {

        const { fen, orientation, initial } = this.state;

        return this.props.children({
            position: fen,
            orientation: orientation,
            onDrop: this.onDrop,
            onDragStart: this.onDragStart,
            piecesCaptured: initial
        });
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        player1Cards: state.chanceChessReducer.player1Cards,
        player2Cards: state.chanceChessReducer.player2Cards,
        newBoard: state.chanceChessReducer.newBoard,
        newBoard2: state.chanceChessReducer.newBoard2,
        selectedCard: state.chanceChessReducer.selectedCard,
        whiteToMove: state.chanceChessReducer.whiteToMove,
        allSelected: state.chanceChessReducer.allSelected,
        cardsArray: state.chanceChessReducer.cardsArray
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeTurn: () => dispatch(changeTurn()),
        onRemoveSelected: (selectedCardIndex) => dispatch(removeSelectedCard(selectedCardIndex)),
        onDiscardAllCardsP1: () => dispatch(discardAllP1Cards()),
        onDiscardAllCardsP2: () => dispatch(discardAllP2Cards()),
        onShuffle: () => dispatch(shuffleOnMount()),
        onSelectAll: () => dispatch(selectAll()),
        onRemoveNines: (deck) => dispatch(removeNines(deck)),
        onRemoveTens: (deck) => dispatch(removeTens(deck)),
        onRemoveJacks: (deck) => dispatch(removeJacks(deck))



    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HumanVsHuman);