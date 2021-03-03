import Chessboard from "chessboardjsx";
import HumanVsHuman from './HumanVsHuman';
// import { roughSquare } from "./Board";


function Board() {

    return (
        < div >
            <HumanVsHuman>
                {({
                    position,
                    onDragStart,
                    draggable,
                    onDrop,
                    onMouseOverSquare,
                    onMouseOutSquare,
                    squareStyles,
                    dropSquareStyle,
                    onDragOverSquare,
                    onSquareClick,
                }) => (
                    < Chessboard
                        id="humanVsHuman"
                        width={700}
                        // roughSquare={roughSquare}
                        position={position}
                        allowDrag={onDragStart}
                        onMouseOverSquare={onMouseOverSquare}
                        onMouseOutSquare={onMouseOutSquare}
                        draggable={draggable}
                        onDrop={onDrop}
                        boardStyle={{
                            cursor: PointerEvent,
                            borderRadius: "5px",
                            border: '15px ridge orange',
                            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
                        }}
                        lightSquareStyle={{ backgroundColor: "AliceBlue" }}
                        darkSquareStyle={{ backgroundColor: "#522ff0d4" }}
                        squareStyles={squareStyles}
                        onDragOverSquare={onDragOverSquare}
                        dropSquareStyle={dropSquareStyle}
                        onSquareClick={onSquareClick}
                    />
                )}
            </HumanVsHuman>
        </div >
    );
}



export default Board;