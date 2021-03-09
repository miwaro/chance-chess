import React, { Component } from "react";
import PropTypes from "prop-types";
import Chess from "./Chess.js";
import { connect } from 'react-redux';
import { changeTurn, removeSelectedCard, discardAllP1Cards, discardAllP2Cards, shuffleOnMount, selectAll } from "../redux/actions/cardActions";

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
        // let allSelected = this.props.allSelected;

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
        // console.log(`selected[1]: ${selected[1]}`)
        // if (selected === null) return;

        // see if the move is legal
        let move = this.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });

        // console.log(move)
        if (move === null) return;

        if (whiteToMove) {
            this.setState({ orientation: 'black' })
        } else if (!whiteToMove) {
            this.setState({ orientation: 'white' })
        }

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

        let moveArray = Object.entries(move)
        console.log('moveArray', moveArray)
        // Capture Piece Sidebar

        var initial = {
            w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
            b: { p: 0, n: 0, b: 0, r: 0, q: 0 }
        };

        let captured = moveArray.reduce(function (acc, move) {
            // console.log('move', move[0])
            // console.log('acc', acc)
            if (move[0] === 'captured') {
                var piece = move.captured;
                // switch colors since the history stores the color of the player doing the
                // capturing, not the color of the captured piece
                var color = move.color === 'w' ? 'b' : 'w';
                acc[color][piece] += 1;
                return acc;
            } else {
                return acc;
            }
        }, initial);
        console.log(captured)


        this.props.onRemoveSelected(this.props.selectedCard[1])
        this.props.onChangeTurn();




    };



    render() {

        const { fen, squareStyles, dropSquareStyle, orientation } = this.state;

        return this.props.children({
            squareStyles,
            position: fen,
            orientation: orientation,
            onDrop: this.onDrop,
            onDragStart: this.onDragStart,
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
        onSelectAll: () => dispatch(selectAll())


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HumanVsHuman);