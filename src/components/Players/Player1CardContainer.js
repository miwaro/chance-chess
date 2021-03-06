import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import '../../style/components/player1.scss';
import '../../style/components/playerCard.scss';
import star from "../../style/images/star.png";
import Card from '../Card';


function Player1CardContainer(props) {

    const [cards, setCards] = useState([])

    const findCardsFromDeck = (newCard, i, newCards) => {

        const oldCards = cards || [];

        // if the array hasn't changed, don't do anything else; this deals with re-rendering cycles
        if (newCards.length === oldCards.length) {
            return { ...oldCards[i] }
        }

        const isFromDeck = !oldCards.find(oldCard => oldCard.index === newCard.index);
        if (isFromDeck) newCard.isFromDeck = true;
        else newCard.isFromDeck = false;

        newCards[i] = newCard;

        if (i === oldCards.length - 1) {
            setCards(oldCards);
        }


        return newCard;
    }



    return (
        <>
            <div className="card-slot">
                <div className="player1">
                    {props.cards.map(findCardsFromDeck).map(card => (
                        <div key={uuidv4()}>
                            <Card
                                isFromDeck={card.isFromDeck}
                                playerNumber={props.playerNumber}
                                blockAnimation={props.blockAnimation}
                                allCardsSelected={props.allCardsSelected}
                                disabled={props.disableControls}
                                cardIndex={card.index}
                                noTransition={props.noTransition}
                                suits={card.suits}
                                card={card.card}
                                front={true}
                                color={card.color}
                                cardPiece={card.correspondingPiece}
                            />
                        </div>
                    ))}
                </div>
                {props.player1Cards.length === 0 &&
                    < div className={'placeholder-container'}>
                        <div className={'placeholder'}></div>
                        <div className={'placeholder'}></div>
                        <div className={'placeholder'}></div>
                    </div>
                }
                {props.player1Cards.length === 1 &&
                    < div className={'placeholder-container'}>
                        <div className={'placeholder'}></div>
                        <div className={'placeholder'}></div>
                    </div>
                }
                {props.player1Cards.length === 2 &&
                    < div className={'placeholder-container'}>
                        <div className={'placeholder'}></div>
                    </div>
                }
                {props.player1Cards.length === 3 &&
                    <div className='empty-placeholder'></div>
                }
            </div>
        </>
    )
}

const mapStateToProps = (state) => {

    return {
        player1Cards: state.chanceChessReducer.player1Cards,
        player2Cards: state.chanceChessReducer.player2Cards,
        newBoard: state.chanceChessReducer.newBoard,
        whiteToMove: state.chanceChessReducer.whiteToMove,
        cardsArray: state.chanceChessReducer.cardsArray
    }
}

export default connect(mapStateToProps, null)(Player1CardContainer);