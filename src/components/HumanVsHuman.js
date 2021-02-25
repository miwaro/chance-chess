import React, { Component } from "react";
import PropTypes from "prop-types";
import Chess from "chess.js";
import { connect } from 'react-redux';


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

    componentDidUpdate(prevProps) {

        if (this.props.newBoard !== prevProps.newBoard) {

            this.game = new Chess();

            this.setState((state, props) => ({
                history: [],
                fen: 'start'
            }))
        }
    }

    onDrop = ({ sourceSquare, targetSquare }) => {
        // console.log(this.props.cardInfo)
        // see if the move is legal
        let move = this.game.move({

            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });

        // illegal move
        if (move === null || this.props.player1Cards.length === 0) return;

        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true })

        }));
        // console.log(this.game.fen)
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

const mapStateToProps = (state) => {
    return {
        player1Cards: state.chanceChessReducer.player1Cards,
        cardInfo: state.chanceChessReducer.cardInfo,
        newBoard: state.chanceChessReducer.newBoard,
        newBoard2: state.chanceChessReducer.newBoard2
    }
}

export default connect(mapStateToProps)(HumanVsHuman);