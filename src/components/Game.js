import Chessboard from "chessboardjsx";
import HumanVsHuman from './HumanVsHuman';
import CaptureSidebar from './CaptureSidebar';


function Board() {
    return (
        < div >
            <HumanVsHuman>
                {({
                    position,
                    piecesCaptured,
                    onDragStart,
                    onDrop,
                    orientation
                }) => (
                    <>
                        < Chessboard
                            id="humanVsHuman"
                            width={720}
                            position={position}
                            allowDrag={onDragStart}
                            draggable={true}
                            onDrop={onDrop}
                            orientation={orientation}
                            boardStyle={{
                                // border: '5px ridge orange',
                                margin: '15px'
                                // marginRight: '15px',
                                // boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
                            }}
                        />
                        <CaptureSidebar
                            piecesCaptured={piecesCaptured}
                        />
                    </>
                )}
            </HumanVsHuman>
        </div >
    );
}

export default Board;