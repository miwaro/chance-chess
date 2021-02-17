import React, { Component } from "react";

import Card from "./Card";
import ActionsButtons from "./ActionsButtons";
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



    dealOneCard = () => {
        let cardsArray = this.state.cardsArray;
        const randomItem = cardsArray[Math.floor(Math.random() * cardsArray.length)];
        const newCardsArray = cardsArray.filter(element => element.index !== randomItem.index)

        this.setState({ cardsArray: newCardsArray })

        let cardsPickedArray = this.state.cardPicked;
        cardsPickedArray.length < 52 &&
            cardsPickedArray.push(randomItem);
        this.setState({ cardPicked: cardsPickedArray })
    };


    render() {
        const cardsPickedArray = this.state.cardPicked;

        return (
            <div>
                <ActionsButtons shuffle={this.shuffle} dealOneCard={this.dealOneCard} flip={this.flip} deckArray={deckArray} />
                <div>
                    {cardsPickedArray && cardsPickedArray.map((card, index) => {
                        return (
                            <div className="animated slideInUp" key={index}>
                                <Card suits={card.suits} card={card.card} color={card.color} front={true} />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };
};


export default Cards;
