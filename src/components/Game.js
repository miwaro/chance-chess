import Chessboard from "chessboardjsx";
import HumanVsHuman from './HumanVsHuman';
import CaptureSidebar from './CaptureSidebar';
import { connect } from 'react-redux';

function Board(props) {
    console.log('in Game component, pieces captured:', props.piecesCaptured)
    return (
        < div >
            <HumanVsHuman>
                {({
                    position,
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
                                margin: '15px',
                                fontSize: '30px'
                                // marginRight: '15px',
                                // boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
                            }}
                        />
                        { props.piecesCaptured &&
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