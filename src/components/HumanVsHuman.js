import React, { Component } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js";
import { connect } from 'react-redux';
import { changeTurn } from "../redux/actions/cardActions";


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

        // draggable: false
    };

    componentDidMount() {
        this.game = new Chess();
    }

    // Resets the board to starting position
    componentDidUpdate(prevProps) {

        if (this.props.newBoard !== prevProps.newBoard) {
            this.game = new Chess();
            this.setState((state, props) => ({
                history: [],
                fen: 'start'
            }))
        }
    }

    onDragStart = ({ piece, sourceSquare }) => {
        let draggable = true;
        const p1 = this.props.player1Cards
        let chessPiece = piece[1].toLowerCase();
        let column = sourceSquare[0];
        let selected = this.props.selectedCard

        if (p1.length > 0) {

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

        // see if the move is legal
        let move = this.game.move({

            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });
        // console.log(move)

        if (move === null) return;


        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true })
        }));

        this.props.onChangeTurn();


    };

    // squareStyling = ({ pieceSquare, history }) => {
    //     const sourceSquare = history.length && history[history.length - 1].from;
    //     const targetSquare = history.length && history[history.length - 1].to;

    //     return {
    //         [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
    //         ...(history.length && {
    //             [sourceSquare]: {
    //                 backgroundColor: "rgba(255, 255, 0, 0.4)"
    //             }
    //         }),
    //         ...(history.length && {
    //             [targetSquare]: {
    //                 backgroundColor: "rgba(255, 255, 0, 0.4)"
    //             }
    //         })
    //     };
    // };

    // keep clicked square style and remove hint squares
    // removeHighlightSquare = () => {
    //     this.setState(({ pieceSquare, history }) => ({
    //         squareStyles: squareStyling({ pieceSquare, history })
    //     }));
    // };

    // // show possible moves
    // highlightSquare = (sourceSquare, squaresToHighlight) => {
    //     const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
    //         (a, c) => {
    //             return {
    //                 ...a,
    //                 ...{
    //                     [c]: {
    //                         background:
    //                             "radial-gradient(circle, #fffc00 36%, transparent 40%)",
    //                         borderRadius: "50%"
    //                     }
    //                 },
    //                 ...squareStyling({
    //                     history: this.state.history,
    //                     pieceSquare: this.state.pieceSquare
    //                 })
    //             };
    //         },
    //         {}
    //     );

    //     this.setState(({ squareStyles }) => ({
    //         squareStyles: { ...squareStyles, ...highlightStyles }
    //     }));
    // };

    render() {

        const { fen, squareStyles } = this.state;

        return this.props.children({
            squareStyles,
            position: fen,
            onDrop: this.onDrop,
            onDragStart: this.onDragStart,
            draggable: true
        });
    }
}

const mapStateToProps = (state) => {
    return {
        player1Cards: state.chanceChessReducer.player1Cards,
        player2Cards: state.chanceChessReducer.player2Cards,
        newBoard: state.chanceChessReducer.newBoard,
        selectedCard: state.chanceChessReducer.selectedCard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onChangeTurn: () => dispatch(changeTurn())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HumanVsHuman);