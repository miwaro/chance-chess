import React, { Component } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js";
import { connect } from 'react-redux';
import { changeTurn, removeSelectedCard } from "../redux/actions/cardActions";


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
    };

    squareStyling = ({ pieceSquare, history }) => {
        const sourceSquare = history.length && history[history.length - 1].from;
        const targetSquare = history.length && history[history.length - 1].to;

        return {
            [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
            ...(history.length && {
                [sourceSquare]: {
                    backgroundColor: "rgba(255, 255, 0, 0.4)"
                }
            }),
            ...(history.length && {
                [targetSquare]: {
                    backgroundColor: "rgba(255, 255, 0, 0.4)"
                }
            })
        };
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

        //  if newBoard prop changes, reset the board position to "start"
        if (this.props.newBoard !== prevProps.newBoard) {
            this.game = new Chess();
            this.setState((state, props) => ({
                history: [],
                fen: 'start'
            }))
        }

        // if the "forceMove" prop changes, force the turn to change
        // if (whiteToMove && (this.props.forceMove !== prevProps.forceMove)) {
        //     this.set_turn(this.game, 'b')
        // } else if (!whiteToMove && (this.props.forceMove !== prevProps.forceMove)) {
        //     this.set_turn(this.game, 'w')
        // }
        if ((whiteToMove === true) && (this.props.forceMove !== prevProps.forceMove)) {
            this.set_turn(this.game, 'w')
        } else if ((whiteToMove === false) && (this.props.forceMove !== prevProps.forceMove)) {
            this.set_turn(this.game, 'b')
        }
    }



    onDragStart = ({ piece, sourceSquare }) => {
        let draggable = true;
        let chessPiece = piece[1].toLowerCase();
        let column = sourceSquare[0];
        let selected = this.props.selectedCard

        if (selected === null) return;


        if (selected) {
            // conditions for pawns
            if ((selected.cardValue === 'A' && chessPiece !== 'p') || (selected.cardValue === 'A' && column !== 'a')) {
                draggable = false;
            }
            if ((selected.cardValue === '2' && chessPiece !== 'p') || (selected.cardValue === '2' && column !== 'b')) {
                draggable = false;
            }
            if ((selected.cardValue === '3' && chessPiece !== 'p') || (selected.cardValue === '3' && column !== 'c')) {
                draggable = false;
            }
            if ((selected.cardValue === '4' && chessPiece !== 'p') || (selected.cardValue === '4' && column !== 'd')) {
                draggable = false;
            }
            if ((selected.cardValue === '5' && chessPiece !== 'p') || (selected.cardValue === '5' && column !== 'e')) {
                draggable = false;
            }
            if ((selected.cardValue === '6' && chessPiece !== 'p') || (selected.cardValue === '6' && column !== 'f')) {
                draggable = false;
            }
            if ((selected.cardValue === '7' && chessPiece !== 'p') || (selected.cardValue === '7' && column !== 'g')) {
                draggable = false;
            }
            if ((selected.cardValue === '8' && chessPiece !== 'p') || (selected.cardValue === '8' && column !== 'h')) {
                draggable = false;
            }
            // if conditions for non pawns
            if (selected.cardValue === '9' && chessPiece !== 'r') {
                draggable = false;
            }
            if (selected.cardValue === '10' && chessPiece !== 'n') {
                draggable = false;
            }
            if (selected.cardValue === 'J' && chessPiece !== 'b') {
                draggable = false;
            }
            if (selected.cardValue === 'Q' && chessPiece !== 'q') {
                draggable = false;
            }
            if (selected.cardValue === 'K' && chessPiece !== 'k') {
                draggable = false;
            }
        }

        return draggable;
    };





    onDrop = ({ sourceSquare, targetSquare }) => {
        let selected = this.props.selectedCard
        if (selected === null) return;

        // see if the move is legal
        let move = this.game.move({

            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });

        if (move === null) return;

        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            squareStyles: this.squareStyling({ pieceSquare, history })
        }));

        this.props.onRemoveSelected(this.props.selectedCard.cardIndex)
        this.props.onChangeTurn();

    };

























    squareStyling = ({ pieceSquare, history }) => {
        const sourceSquare = history.length && history[history.length - 1].from;
        const targetSquare = history.length && history[history.length - 1].to;

        return {
            [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
            ...(history.length && {
                [sourceSquare]: {
                    backgroundColor: "rgba(255, 255, 0, 0.4)"
                }
            }),
            ...(history.length && {
                [targetSquare]: {
                    backgroundColor: "rgba(255, 255, 0, 0.4)"
                }
            })
        };
    };

    // keep clicked square style and remove hint squares
    removeHighlightSquare = () => {
        this.setState(({ pieceSquare, history }) => ({
            squareStyles: this.squareStyling({ pieceSquare, history })
        }));
    };

    // show possible moves
    highlightSquare = (sourceSquare, squaresToHighlight) => {
        const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
            (a, c) => {
                return {
                    ...a,
                    ...{
                        [c]: {
                            background:
                                "radial-gradient(circle, #fffc00 36%, transparent 40%)",
                            borderRadius: "50%"
                        }
                    },
                    ...this.squareStyling({
                        history: this.state.history,
                        pieceSquare: this.state.pieceSquare
                    })
                };
            },
            {}
        );

        this.setState(({ squareStyles }) => ({
            squareStyles: { ...squareStyles, ...highlightStyles }
        }));
    };


    onMouseOverSquare = square => {
        // get list of possible moves for this square
        let moves = this.game.moves({
            square: square,
            verbose: true
        });

        // exit if there are no moves available for this square
        if (moves.length === 0) return;

        let squaresToHighlight = [];
        for (var i = 0; i < moves.length; i++) {
            squaresToHighlight.push(moves[i].to);
        }

        this.highlightSquare(square, squaresToHighlight);
    };

    onMouseOutSquare = square => this.removeHighlightSquare(square);

    // central squares get diff dropSquareStyles
    onDragOverSquare = square => {
        this.setState({
            dropSquareStyle:
                square === "e4" || square === "d4" || square === "e5" || square === "d5"
                    ? { backgroundColor: "cornFlowerBlue" }
                    : { boxShadow: "inset 0 0 1px 4px rgb(255, 255, 0)" }
        });
    };

    onSquareClick = square => {
        this.setState(({ history }) => ({
            squareStyles: this.squareStyling({ pieceSquare: square, history }),
            pieceSquare: square
        }));

        let move = this.game.move({
            from: this.state.pieceSquare,
            to: square,
            promotion: "q" // always promote to a queen for example simplicity
        });
        if (move === null) return;

        this.setState({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true }),
            pieceSquare: ""
        });
    };

    render() {

        const { fen, squareStyles, dropSquareStyle } = this.state;

        return this.props.children({
            squareStyles,
            position: fen,
            onDrop: this.onDrop,
            onDragStart: this.onDragStart,
            draggable: true,
            dropSquareStyle,
            onDragOverSquare: this.onDragOverSquare,
            onSquareClick: this.onSquareClick,
            onSquareRightClick: this.onSquareRightClick
        });
    }
}

const mapStateToProps = (state) => {
    console.log(state)
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
        onRemoveSelected: (selectedCardIndex) => dispatch(removeSelectedCard(selectedCardIndex))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HumanVsHuman);