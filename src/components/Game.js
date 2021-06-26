import Chessboard from './Chessboard';
import HumanVsHuman from './HumanVsHuman';
import CaptureSidebar from './CaptureSidebar';
import { connect } from 'react-redux';

function Board(props) {
    return (
        < div >
            <HumanVsHuman>
                {({
                    position,
                    onDragStart,
                    onDrop,
                    squareStyles,
                    orientation,
                    onMouseOverSquare,
                    hoveredSquare
                }) => (
                    <>
                        <Chessboard
                            id="humanVsHuman"
                            width={720}
                            hoveredSquare={hoveredSquare}
                            orientation={orientation}
                            onMouseOverSquare={onMouseOverSquare}
                            position={position}
                            allowDrag={onDragStart}
                            draggable={true}
                            onDrop={onDrop}
                            squareStyles={squareStyles}
                            boardStyle={{
                                border: '3px solid orange',
                                margin: '15px 0 24px 24px',
                                fontSize: '30px',
                                boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                            }}
                        />
                        {props.piecesCaptured &&
                            <CaptureSidebar
                                piecesCaptured={props.piecesCaptured}
                            />
                        }
                    </>
                )}
            </HumanVsHuman>
        </div >
    );
}

const mapStateToProps = (state) => {

    return {
        piecesCaptured: state.chanceChessReducer.capturedPieces
    }
}

export default connect(mapStateToProps, null)(Board);