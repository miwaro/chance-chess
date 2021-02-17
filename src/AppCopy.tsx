import React, { useState } from "react";
import "./App.css";
import Chessboard from "chessboardjsx";
// import logo from './images/chessLogo3.png';
import { ChessInstance, ShortMove } from "chess.js";
// import Game from './components/Game';
import Player1 from './components/Players/Player1';
import Player2 from './components/Players/Player2';

const Chess = require("chess.js");

const App: React.FC = () => {
    const [chess] = useState<ChessInstance>(
        new Chess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    );

    const [fen, setFen] = useState(chess.fen());

    const handleMove = (move: ShortMove) => {
        if (chess.move(move)) {
            setTimeout(() => {
                const moves = chess.moves();

                if (moves.length > 0) {
                    const computerMove = moves[Math.floor(Math.random() * moves.length)];
                    chess.move(computerMove);
                    setFen(chess.fen());
                }
            }, 300);

            setFen(chess.fen());
        }
    };

    return (
        <div className="App">
            <h1>Chance Chess</h1>
            {/* <img src={logo} alt="logo" /> */}
            <div>
                <Player1 />
            </div>
            <div className="Board">
                <Chessboard
                    width={400}
                    position={fen}
                    onDrop={(move) =>
                        handleMove({
                            from: move.sourceSquare,
                            to: move.targetSquare,
                            promotion: "q",
                        })
                    }
                />

            </div>
            <Player2 />
        </div>
    );
};

export default App;
