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
        // this.game = new Chess("rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e3 0 2");
    }


    componentDidUpdate(prevProps) {

        if (this.props.newBoard !== prevProps.newBoard) {

            this.game = new Chess();

            this.setState((state, props) => ({
                history: [],
                fen: props.newBoard2

            }))
        }
    }

    onDrop = ({ sourceSquare, targetSquare }) => {
        // see if the move is legal
        let move = this.game.move({

            from: sourceSquare,
            to: targetSquare,
            promotion: "q"
        });

        // illegal move
        if (move === null) return;

        this.setState(({ history, pieceSquare }) => ({
            fen: this.game.fen(),
            history: this.game.history({ verbose: true })

        }));
        console.log(this.game.fen)
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
        cardInfo: state.chanceChessReducer.cardInfo,
        newBoard: state.chanceChessReducer.newBoard,
        newBoard2: state.chanceChessReducer.newBoard2
    }
}

export default connect(mapStateToProps)(HumanVsHuman);
// export default HumanVsHuman;
