
import React from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import "../../style/components/playerCard.scss";
import '../../style/components/player1.scss';
import '../../style/components/playerCard.scss';
import { discardAllP1Cards, getCard } from "../../redux/actions/cardActions";
import Card from '../Card';




function Player1CardContainer(props) {
    // console.log(props.cards)

    const getCard = () => {
        if (props.cards.length >= 3) return;
        props.onGetCard();
    }
    return (
        <>
            <div className="player-card-container">
                <div className="card-slot">

                    <div className="player1">
                        {props.cards.map((card, i) => (
                            <div >
                                <Card
                                    disabled={props.disableControls}
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
                    <div className="actions">
                        <Button style={{ backgroundColor: 'orange', fontSize: '10px', marginRight: '3px' }} onClick={getCard}>
                            Draw up to 3 Cards
                    </Button>
                        <Button onClick={() => props.onDiscardAllCards()} style={{ backgroundColor: 'red', color: 'white', fontSize: '10px', marginLeft: '3px' }}>
                            Discard All Cards
                    </Button>
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
        onGetCard: () => dispatch(getCard()),
        onDiscardAllCards: () => dispatch(discardAllP1Cards())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player1CardContainer);