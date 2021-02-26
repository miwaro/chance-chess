import Chessboard from "chessboardjsx";
import HumanVsHuman from './HumanVsHuman';
// import { connect } from 'react-redux';

function Board(props) {

    return (
        < div >
            <HumanVsHuman>
                {({
                    position,
                    onDragStart,
                    draggable,
                    onDrop,
                    squareStyles,
                    onSquareClick
                }) => (
                    < Chessboard
                        id="humanVsHuman"
                        width={550}
                        position={position}
                        allowDrag={onDragStart}
                        draggable={draggable}
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
        </div >
    );
}

export default Board;