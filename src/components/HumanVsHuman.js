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
        history: []
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
        // console.log(piece, sourceSquare)
        const p1 = this.props.player1Cards
        const p1Cards = this.props.player1Cards.map(card => card.card);
        let chessPiece = piece[1].toLowerCase();
        // console.log(p1Cards)
        let column = sourceSquare[0];

        p1Cards.forEach(card => {
            if (p1.length > 0) {
                if ((card === 'A' && chessPiece !== 'p') || (card === 'A' && column !== 'a')) {
                    draggable = false
                }
                if ((card === '2' && chessPiece !== 'p') || (card === '2' && column !== 'b')) {
                    draggable = false
                } if ((card === '3' && chessPiece !== 'p') || (card === '3' && column !== 'c')) {
                    draggable = false
                } if ((card === '4' && chessPiece !== 'p') || (card === '4' && column !== 'd')) {
                    draggable = false
                } if ((card === '5' && chessPiece !== 'p') || (card === '3' && column !== 'e')) {
                    draggable = false
                } if ((card === '6' && chessPiece !== 'p') || (card === '3' && column !== 'f')) {
                    draggable = false
                } if ((card === '7' && chessPiece !== 'p') || (card === '3' && column !== 'g')) {
                    draggable = false
                } if ((card === '8' && chessPiece !== 'p') || (card === '3' && column !== 'h')) {
                    draggable = false
                }
            }
        });



        return draggable;
    };



    //     // if statement for Ace for player 1 (card 1)
    //     if ((p1.length > 0 && p1[0].card === 'A' && chessPiece !== 'p') || (p1.length > 0 && p1[0].card === 'A' && column !== 'a')) {
    //         // console.log(`playerCard: ${p1[0].card}`)
    //         // console.log(`chessPiece: ${chessPiece}`)
    //         // console.log(`column: ${column}`)

    //         draggable = false
    //     }
    //     return draggable;
    // }


    //     if (p1[0].card === 'A' && chessPiece !== 'p' && p1.length > 0 && p1[0].correspondingPiece !== chessPiece && column !== 'a') {

    //         draggable = false
    //     }
    // }

    // } else if (p1.length > 1 && (p1[1].correspondingFile !== sourceSquare[0] || p1[1].correspondingPiece !== piece[1].toLowerCase())) {
    //     draggable = false
    // }
    // if statement for pawns for player 1 (card 2)



    // // if statement for pawns for player 1 (card 3)
    // if (piece[1].toLowerCase() === 'p') {
    //     if (p1.length > 0 && (p1[2].correspondingFile !== sourceSquare[0] || p1[2].correspondingPiece !== piece[1].toLowerCase())) {
    //         draggable = false
    //     }
    // }
    // **********************************************************************************************************


    // if statement for non pawns (player 1 card 1)
    //     if(piece[1].toLowerCase() !== 'p') {
    //     if (p1.length > 0 && p1[0].correspondingPiece !== piece[1].toLowerCase()) {
    //         draggable = false
    //     }
    // }
    // if statement for non pawns (player 1 card 2)
    // else if (piece[1].toLowerCase() !== 'p') {
    //     if (p1.length > 1 && p1[1].correspondingPiece !== piece[1].toLowerCase()) {
    //         draggable = false
    //     }
    // }
    // // if statement for non pawns (player 1 card 3)
    // if (piece[1].toLowerCase() !== 'p') {
    //     if (p1.length > 0 && p1[2].correspondingPiece !== piece[1].toLowerCase()) {
    //         draggable = false
    //     }
    // }


    // ***********************************************************************************************







    onDrop = ({ sourceSquare, targetSquare }) => {

        // see if the move is legal
        let move = this.game.move({

            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });
        console.log(move)

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