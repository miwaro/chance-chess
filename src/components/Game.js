import Chessboard from "chessboardjsx";
import HumanVsHuman from './HumanVsHuman';

function Board() {
    return (
        <div>
            <HumanVsHuman>
                {({
                    position,
                    onDrop,
                    squareStyles,
                    onSquareClick,
                }) => (
                    <Chessboard
                        id="humanVsHuman"
                        width={400}
                        position={position}
                        onDrop={onDrop}
                        boardStyle={{
                            borderRadius: "5px",
                            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                        }}
                        squareStyles={squareStyles}
                        onSquareClick={onSquareClick}
                    />
                )}
            </HumanVsHuman>
        </div>
    );
}

export default Board;


