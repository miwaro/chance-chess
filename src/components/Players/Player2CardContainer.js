import React from 'react'
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import "../../style/components/playerCard.scss";
import '../../style/components/player2.scss';
import '../../style/components/playerCard.scss';
import Card from '../Card';


function Player2CardContainer(props) {


    return (
        <>
            <div className="card-slot">

                <div className="player2">
                    {props.cards.map(card => (
                        <div key={uuidv4()}>
                            <Card
                                playerNumber={props.playerNumber}
                                blockAnimation={props.blockAnimation}
                                allCardsSelected={props.allCardsSelected}
                                disabled={props.disableControls}
                                noTransition={props.noTransition}
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

                {props.player2Cards.length === 0 &&
                    < div className={'placeholder-container'}>
                        <div className={'placeholder'}></div>
                        <div className={'placeholder'}></div>
                        <div className={'placeholder'}></div>
                    </div>
                }
                {props.player2Cards.length === 1 &&
                    < div className={'placeholder-container'}>
                        <div className={'placeholder'}></div>
                        <div className={'placeholder'}></div>
                    </div>
                }
                {props.player2Cards.length === 2 &&
                    < div className={'placeholder-container'}>
                        <div className={'placeholder'}></div>
                    </div>
                }
                {props.player2Cards.length === 3 &&
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



export default connect(mapStateToProps, null)(Player2CardContainer);