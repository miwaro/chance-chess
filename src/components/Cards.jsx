import React, { Component } from "react";
import { connect } from 'react-redux';

import { getCardInfo } from '../redux/actions/cardActions'
import Card from "./Card";
import { deckArray } from "../utils/DeckArray";

class Cards extends Component {

    constructor() {
        super();
        this.state = {
            cardsArray: deckArray,
            cardPicked: [],
            front: true
        };
    };

    componentDidMount() {
        let cardsArray = this.state.cardsArray;
        const randomItem = cardsArray[Math.floor(Math.random() * cardsArray.length)];
        const newCardsArray = cardsArray.filter(element => element.index !== randomItem.index)

        this.setState({ cardsArray: newCardsArray })

        let cardsPickedArray = this.state.cardPicked;
        cardsPickedArray.length < 52 &&
            cardsPickedArray.push(randomItem);
        this.setState({ cardPicked: cardsPickedArray })
    }

    // const getPieceAndFile = (piece, file) => {
    //     setBorder(!border)
    //     console.log(piece, file)
    //   }

    getPieceAndFile = () => {
        // may have to change deckArray to cardsArray
        const cardPiece = this.state.cardsArray.correspondingPiece
        const cardFile = this.state.cardsArray.correspondingFile
        const cardIndex = this.state.cardsArray.index

        this.props.onGetCardInfo(cardPiece, cardFile, cardIndex)
    }

    flip = () => {
        this.setState({ front: !this.state.front })
    };

    // dealOneCard = () => {
    //     let cardsArray = this.state.cardsArray;
    //     const randomItem = cardsArray[Math.floor(Math.random() * cardsArray.length)];
    //     const newCardsArray = cardsArray.filter(element => element.index !== randomItem.index)

    //     this.setState({ cardsArray: newCardsArray })

    //     let cardsPickedArray = this.state.cardPicked;
    //     cardsPickedArray.length < 52 &&
    //         cardsPickedArray.push(randomItem);
    //     this.setState({ cardPicked: cardsPickedArray })
    // };


    render() {
        const cardsPickedArray = this.state.cardPicked;

        return (
            <div>
                <div>
                    {cardsPickedArray && cardsPickedArray.map((card, index) => {
                        return (
                            <div className="animated slideInUp" key={index}>
                                <Card
                                    cardIndex={card.index}
                                    suits={card.suits}
                                    card={card.card}
                                    color={card.color}
                                    front={true}
                                    flip={this.flip}
                                    cardPiece={card.correspondingPiece}
                                    cardFile={card.correspondingFile}
                                    getCardInfo={this.getPieceAndFile}
                                />
                            </div>
                        );
                    })}
                </div>

            </div>
        );
    };
};



const mapDispatchToProps = dispatch => {
    return {
        onGetCardInfo: (cardIndex, cardPiece, cardFile) => dispatch(getCardInfo(cardIndex, cardPiece, cardFile)),
    }
}



export default connect(null, mapDispatchToProps)(Cards);
