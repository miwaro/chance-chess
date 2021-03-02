
import React from 'react'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';
import '../../style/components/player1.scss';
import '../../style/components/playerCard.scss';
import { discardAllP1Cards, getCard } from "../../redux/actions/cardActions";
import Card from '../Card';


function Player1CardContainer(props) {

    const getCard = () => {
        let whiteToMove = props.whiteToMove;
        if (!whiteToMove || props.cards.length >= 3) return;
        props.onGetCard();
    }

    const discardAll = () => {
        let whiteToMove = props.whiteToMove;
        if (!whiteToMove || props.cards.length === 0) return;
        props.onDiscardAllCards();
    }

    return (
        <>
            <div className="player-card-container">
                <div className="card-slot">

                    <div className="player1">
                        {props.cards.map(card => (
                            <div key={uuidv4()}>
                                <Card
                                    disabled={props.disableControls}
                                    cardIndex={card.index}
                                    suits={card.suits}
                                    card={card.card}
                                    front={true}
                                    color={card.color}
                                    cardPiece={card.correspondingPiece}
                                />
                            </div>
                        ))}
                    </div>


                    {props.cardsArray.length === 52 &&
                        <div className={'placeholder'}>Draw up to 3 cards to start the game!</div>
                    }
                    {props.player1Cards.length === 0 && props.cardsArray.length < 52 &&
                        <div className={'placeholder'}></div>
                    }


                    <div className="actions">
                        <Button style={{ backgroundColor: 'orange', fontSize: '10px', marginRight: '3px' }} onClick={getCard}>
                            Draw up to 3 Cards
                        </Button>
                        <Button onClick={discardAll} style={{ backgroundColor: 'red', color: 'white', fontSize: '10px', marginLeft: '3px' }}>
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
        newBoard: state.chanceChessReducer.newBoard,
        whiteToMove: state.chanceChessReducer.whiteToMove,
        cardsArray: state.chanceChessReducer.cardsArray
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