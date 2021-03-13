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
    selectAll
} from "../redux/actions/cardActions";
// import { isReturnStatement } from "typescript";

class HumanVsHuman extends Component {

    static propTypes = { children: PropTypes.func };

    state = {
        fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',
        square: "",
        orientation: 'white',
        initial: {
            W: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
            B: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 }
        }
    };



    componentDidMount() {
        this.setState({
            orientation: this.props.playerNumber === 1 ? 'white' : 'black'
        })
        this.game = new Chess(this.state.fen);

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
    }

    condenseFen = (fen) => {
        return fen.split(' ')[0];
    }

    onDragStart = ({ piece, sourceSquare }) => {
        let whiteToMove = this.props.whiteToMove;

        if (this.props.playerNumber === 1 && !whiteToMove) {
            return;
        }
        if (this.props.playerNumber === 2 && whiteToMove) {
            return;
        }

        let draggable = false;
        let isAStraight = false;
        let chessPiece = piece[1].toLowerCase();
        let column = sourceSquare[0];
        let selectedCard = this.props.selectedCard;
        let isAllSelected = this.props.allSelected;
        let p1 = this.props.player1Cards;
        let p2 = this.props.player2Cards;
        let player1Suits = p1.map(card => card.suits);
        let player2Suits = p2.map(card => card.suits);
        let p1Card = p1.map(card => card.card);
        let p2Card = p2.map(card => card.card);

        if (selectedCard.length === 0 && this.props.allSelected === false) return;

        // Check for player1 Flush
        let clubs = p1 && player1Suits.every(suit => suit === 'Club')
        let diamonds = p1 && player1Suits.every(suit => suit === 'Diamond')
        let spades = p1 && player1Suits.every(suit => suit === 'Spade')
        let hearts = p1 && player1Suits.every(suit => suit === 'Heart')

        // Check for player2 Flush
        let clubs2 = p2 && player2Suits.every(suit => suit === 'Club')
        let diamonds2 = p2 && player2Suits.every(suit => suit === 'Diamond')
        let spades2 = p2 && player2Suits.every(suit => suit === 'Spade')
        let hearts2 = p2 && player2Suits.every(suit => suit === 'Heart')

        // Check for Straight
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

        // Check for 3 of a kind
        let isTheSame = p1Card.every((val, i, arr) => val === arr[0])
        let isTheSame2 = p2Card.every((val, i, arr) => val === arr[0])

        if (isAllSelected && (p1.length === 3 || p2.length === 3)) {
            // console.log('enter if statement')
            // console.log(`isAllSelected: ${isAllSelected}`)
            // console.log('selectedCard[0]', selectedCard[0])
            // console.log('chessPiece', chessPiece)
            // console.log(`selectedCardLength ${selectedCard.length}`)
            // combo conditions for player1
            if (whiteToMove) {
                if (isAStraight && (chessPiece === 'k' || chessPiece === 'p')) {
                    draggable = true;
                }
                if (clubs && (chessPiece === 'n')) {
                    draggable = true;
                }
                if (diamonds && (chessPiece === 'b')) {
                    draggable = true;
                }
                if (spades && (chessPiece === 'r' || chessPiece === 'k')) {
                    draggable = true;
                }
                if (hearts && (chessPiece === 'q')) {
                    draggable = true;
                }
                if (isTheSame && (chessPiece === 'n' || chessPiece === 'b' || chessPiece === 'r')) {
                    draggable = true;
                }
                if ((clubs || diamonds || spades || hearts) && isAStraight) {
                    draggable = true;
                }
            }
            // combo conditions for player 2
            if (!whiteToMove) {
                if (isAStraight && (chessPiece === 'k' || chessPiece === 'p')) {
                    draggable = true;
                }
                if (clubs2 && (chessPiece === 'n')) {
                    draggable = true;
                }
                if (diamonds2 && (chessPiece === 'b')) {
                    draggable = true;
                }
                if (spades2 && (chessPiece === 'r' || chessPiece === 'k')) {
                    draggable = true;
                }
                if (hearts2 && (chessPiece === 'q')) {
                    draggable = true;
                }
                if (isTheSame2 && (chessPiece === 'n' || chessPiece === 'b' || chessPiece === 'r')) {
                    draggable = true;
                }
                if ((clubs2 || diamonds2 || spades2 || hearts2) && isAStraight) {
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
            // Joker conditions
            if (selectedCard[0] === 'Joker') {
                draggable = true;
            }
        } else { draggable = false };



        // console.log('draggable', draggable)

        return draggable;
    };






    onDrop = ({ sourceSquare, targetSquare }) => {
        // console.log(sourceSquare, targetSquare);
        let whiteToMove = this.props.whiteToMove;
        let selected = this.props.selectedCard
        // see if the move is legal
        let move = this.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });

        console.log(move)

        if (move === null) return;


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
        console.log(this.game.fen)
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


        this.props.onRemoveSelected(this.props.selectedCard[1])
        this.props.onChangeTurn();


    };




    render() {

        const { fen, orientation, initial } = this.state;

        return this.props.children({
            position: this.condenseFen(fen),
            orientation: orientation,
            onDrop: this.onDrop,
            onDragStart: this.onDragStart,
            piecesCaptured: initial
        });
    }
}

const mapStateToProps = (state) => {
    return {
        player1Cards: state.chanceChessReducer.player1Cards,
        player2Cards: state.chanceChessReducer.player2Cards,
        newBoard: state.chanceChessReducer.newBoard,
        newBoard2: state.chanceChessReducer.newBoard2,
        selectedCard: state.chanceChessReducer.selectedCard,
        whiteToMove: state.chanceChessReducer.whiteToMove,
        allSelected: state.chanceChessReducer.allSelected,
        cardsArray: state.chanceChessReducer.cardsArray,
        playerNumber: state.usersReducer.playerNumber
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HumanVsHuman);