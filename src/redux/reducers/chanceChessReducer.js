import * as actionTypes from '../actions/actionTypes';
import { deckArray } from "../../utils/DeckArray";

const initialState = {
    // cardInfo: [],
    player1Cards: [],
    player2Cards: [],
    newBoard: false,
    cardsArray: deckArray,
    selectedCard: null
}

const reducer = (state = initialState, action) => {
    // let info;
    // let cardInfo;
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
            // Todo: Restore the deck when the cards run out.
            let player1Cards = state.player1Cards;
            let cardsPickedArrayPlayer1 = [...state.player1Cards, player1Cards];
            // let cardsPickedArrayPlayer1 = player1Cards;
            // 
            // Do I need to do what I do above this line to the line below?????????????????
            cardsArray = state.cardsArray;

            randomCard = () => cardsArray[Math.floor(Math.random() * cardsArray.length)];
            randomItem = randomCard();

            newCardsArray = cardsArray.filter(element => element.index !== randomItem.index)
            // console.log(`Player1Deck: ${cardsArray.length}`)

            if (cardsPickedArrayPlayer1.length > 3) {
                return [...cardsPickedArrayPlayer1]
            } else {
                cardsPickedArrayPlayer1 = [...state.player1Cards, randomItem];
            }
            return {
                ...state,
                cardsArray: newCardsArray,
                player1Cards: cardsPickedArrayPlayer1
            }


        case actionTypes.GET_PLAYER2_CARD:

            let player2Cards = state.player2Cards;

            let cardsPickedArrayPlayer2 = [...state.player2Cards, player2Cards];
            cardsArray = state.cardsArray;

            randomCard = () => cardsArray[Math.floor(Math.random() * cardsArray.length)];

            randomItem = randomCard();

            newCardsArray = cardsArray.filter(element => element.index !== randomItem.index)
            // console.log(`Player2Deck: ${cardsArray.length}`)
            // console.log(cardsPickedArrayPlayer2.length)
            if (cardsPickedArrayPlayer2.length > 3) {
                return [...state.player2Cards, player2Cards]
            } else {
                cardsPickedArrayPlayer2 = [...state.player2Cards, randomItem];
            }

            return {
                ...state,
                cardsArray: newCardsArray,
                player2Cards: cardsPickedArrayPlayer2
            }


        case actionTypes.SELECT_CARD:
            const { cardValue, cardIndex, cardPiece } = action;
            const selectedCard = { cardValue, cardIndex, cardPiece }
            return {
                ...state,
                selectedCard
            }


        default:
            return state;
    }
};

export default reducer;
