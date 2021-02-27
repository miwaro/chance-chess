import React from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import "../../style/components/playerCard.scss";
import '../../style/components/player2.scss';
import '../../style/components/playerCard.scss';
import { getPlayer2Card } from "../../redux/actions/cardActions";
import Card from '../Card';


function Player2CardContainer(props) {

    const getCard = () => {
        if (props.cards.length >= 3) return;
        props.onGetCardForPlayer2();
    }

    return (
        <>
            <div className="player-card-container">
                <div className="card-slot">
                    <Button style={{ backgroundColor: 'orange' }} onClick={getCard}>
                        Draw up to 3 Cards
                    </Button>
                    <div className="player2">
                        {props.cards.map((card, i) => (
                            <div >
                                <Card
                                    cardIndex={card.index}
                                    suits={card.suits}
                                    card={card.card}
                                    front={props.front}
                                    color={card.color}
                                    cardPiece={card.correspondingPiece}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        player1Cards: state.chanceChessReducer.player1Cards,
        player2Cards: state.chanceChessReducer.player2Cards,
        newBoard: state.chanceChessReducer.newBoard
    }
}

const mapDispatchToProps = dispatch => {
    // console.log(dispatch)
    return {
        onGetCardForPlayer2: () => dispatch(getPlayer2Card())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player2CardContainer);