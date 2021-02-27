import * as actionTypes from '../actions/actionTypes';
import { deckArray } from "../../utils/DeckArray";

const initialState = {
    player1Cards: [],
    player2Cards: [],
    newBoard: false,
    cardsArray: deckArray,
    selectedCard: null
}

const reducer = (state = initialState, action) => {
    let cardsArray;
    let randomCard;
    let randomItem;
    let newCardsArray;
    let selectedCard;
    // let cardValue;
    // let cardIndex;
    // let cardPiece;

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
            selectedCard = { cardValue, cardIndex, cardPiece }
            return {
                ...state,
                selectedCard
            }

        case actionTypes.DESELECT_CARD:

            selectedCard = state.selectedCard
            return {
                ...state,
                selectedCard: null

            }

        default:
            return state;
    }
};

export default reducer;
