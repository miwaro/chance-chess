import Chessboard from "chessboardjsx";
import HumanVsHuman from './HumanVsHuman';


function Board() {

    return (
        < div >
            <HumanVsHuman>
                {({
                    position,
                    onDragStart,
                    onDrop,
                    orientation
                }) => (
                    < Chessboard
                        id="humanVsHuman"
                        width={720}
                        position={position}
                        allowDrag={onDragStart}
                        draggable={true}
                        onDrop={onDrop}
                        orientation={orientation}
                        boardStyle={{
                            borderRight: '5px ridge orange',
                            marginRight: '15px',
                            // boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
                        }}
                    />
                )}
            </HumanVsHuman>
        </div >
    );
}

export default Board;