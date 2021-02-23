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
                    onSquareClick,
                    cardInfo
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
                        cardInfo={props.cardInfo}
                    />
                )}
            </HumanVsHuman>
        </div >
    );
}


const mapStateToProps = (state) => {
    return {
        cardInfo: state.chanceChessReducer.cardInfo,
    }
}

export default connect(mapStateToProps)(Board);