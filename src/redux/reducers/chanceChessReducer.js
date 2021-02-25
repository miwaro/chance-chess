import * as actionTypes from '../actions/actionTypes';
import { deckArray } from "../../utils/DeckArray";

const initialState = {
    cardInfo: [],
    player1Cards: [],
    player2Cards: [],
    newBoard: false,
    cardsArray: deckArray,
}

const reducer = (state = initialState, action) => {
    let info;
    let cardInfo;
    let cardsArray;
    let randomCard;
    let randomItem;
    let newCardsArray;

    switch (action.type) {
        case actionTypes.START_NEW_GAME:
            return {
                ...state,
                player1Cards: [],
                player2Cards: [],
                newBoard: !state.newBoard,
            }


        case actionTypes.GET_CARD:
            let player1Cards = state.player1Cards;
            // let player2Cards = state.player2Cards;
            let cardsPickedArrayPlayer1 = [...state.player1Cards, player1Cards];
            // let cardsPickedArrayPlayer2 = [...state.player2Cards, player2Cards];
            cardsArray = state.cardsArray;

            randomCard = () => cardsArray[Math.floor(Math.random() * cardsArray.length)];
            randomItem = randomCard();
            // const randomItem1 = randomCard();

            newCardsArray = cardsArray.filter(element => element.index !== randomItem.index)

            if (cardsPickedArrayPlayer1.length > 3) { return cardsPickedArrayPlayer1 };
            // if (cardsPickedArrayPlayer2.length > 3) { return cardsPickedArrayPlayer2 };
            cardsPickedArrayPlayer1 = [...state.player1Cards, randomItem];
            // cardsPickedArrayPlayer2 = [...state.player2Cards, randomItem1];

            return {
                ...state,
                cardsArray: newCardsArray,
                player1Cards: cardsPickedArrayPlayer1
                // player2Cards: cardsPickedArrayPlayer2
            }


        case actionTypes.GET_PLAYER2_CARD:
            // let player1Cards = state.player1Cards;
            let player2Cards = state.player2Cards;
            // let cardsPickedArrayPlayer1 = [...state.player1Cards, player1Cards];
            let cardsPickedArrayPlayer2 = [...state.player2Cards, player2Cards];
            cardsArray = state.cardsArray;

            randomCard = () => cardsArray[Math.floor(Math.random() * cardsArray.length)];
            // const randomItem = randomCard();
            const randomItem1 = randomCard();

            newCardsArray = cardsArray.filter(element => element.index !== randomItem1.index)

            // if (cardsPickedArrayPlayer1.length > 3) { return cardsPickedArrayPlayer1 };
            if (cardsPickedArrayPlayer2.length > 3) { return cardsPickedArrayPlayer2 };
            // cardsPickedArrayPlayer1 = [...state.player1Cards, randomItem];
            cardsPickedArrayPlayer2 = [...state.player2Cards, randomItem1];

            return {
                ...state,
                cardsArray: newCardsArray,
                player2Cards: cardsPickedArrayPlayer2
            }

        case actionTypes.GET_CARD_INFO:

            info = {
                cardIndex: action.cardIndex,
                cardPiece: action.cardPiece,
                cardFile: action.cardFile
            }
            cardInfo = [...state.cardInfo, info]

            return {
                ...state,
                cardInfo
            };



        default:
            return state;
    }
};

export default reducer;
