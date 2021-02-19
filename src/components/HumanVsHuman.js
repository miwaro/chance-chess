import React, { Component } from "react";
import PropTypes from "prop-types";
// import Chessboard from "chessboardjsx";
import Chess from "chess.js";
import { deckArray } from "../utils/DeckArray"

class HumanVsHuman extends Component {
    static propTypes = { children: PropTypes.func };

    state = {
        // Start position
        fen: "start",
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

        deckArray: []
    };


    componentDidMount() {
        this.game = new Chess();
    }

    onDrop = ({ sourceSquare, targetSquare }) => {
        // see if the move is legal
        let move = this.game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q" // Todo: Add all promotion options
        });


        // console.log(move.piece === deckArray[0].correspondingPiece)
        // console.log(this.state.deckArray)


        // console.log(move)


        // illegal move
        if (move === null) return;

        // if (move.piece !== deckArray[0]correspondingPiece)



        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true })

        }));
    };

    render() {
        const { fen, squareStyles } = this.state;

        return this.props.children({
            squareStyles,
            position: fen,
            onDrop: this.onDrop,
        });
    }
}

export default HumanVsHuman;