
import React from 'react'
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import '../../style/components/player1.scss';
import '../../style/components/playerCard.scss';
import Card from '../Card';


function Player1CardContainer(props) {
    // console.log(`player1ContainerProps: ${props}`)

    return (
        <>

            <div className="card-slot">

                <div className="player1">
                    {props.cards.map(card => (
                        <div key={uuidv4()}>
                            <Card
                                allCardsSelected={props.allCardsSelected}
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