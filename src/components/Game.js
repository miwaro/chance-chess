import Chessboard from "chessboardjsx";
import HumanVsHuman from './HumanVsHuman';
import { connect } from 'react-redux';


function Board(props) {




    return (
        < div >
            <HumanVsHuman>
                {({
                    position,
                    onDrop,
                    squareStyles,
                    onSquareClick
                }) => (
                    < Chessboard
                        id="humanVsHuman"
                        width={550}
                        position={position}
                        onDrop={onDrop}
                        startPosition={props.newBoard2}
                        boardStyle={{
                            borderRadius: "5px",
                            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`
                        }}
                        squareStyles={squareStyles}
                        onSquareClick={onSquareClick}
                        cardInfo={props.cardInfo}

                    />

                )}
            </HumanVsHuman>
            {/* <button onClick={() => restartBoard()}>Reset Board</button> */}

        </div >
    );
}


const mapStateToProps = (state) => {
    return {
        cardInfo: state.chanceChessReducer.cardInfo,
        newBoard: state.chanceChessReducer.newBoard,
        newBoard2: state.chanceChessReducer.newBoard
    }
}

export default connect(mapStateToProps)(Board);