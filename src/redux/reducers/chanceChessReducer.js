import * as actionTypes from '../actions/actionTypes';
import { deckArray } from "../../utils/DeckArray";



const initialState = {
    cardInfo: [],
    player1Cards: [],
    player2Cards: [],
    newBoard: 'start',
    cardsArray: deckArray,
}

const reducer = (state = initialState, action) => {
    let info;
    let cardInfo;

    switch (action.type) {
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

        case actionTypes.START_NEW_GAME:

            console.log(`action: ${action}`);
            console.log(state);

            let cardsPickedArrayPlayer1 = [];
            let cardsPickedArrayPlayer2 = [];
            let cardsArray = state.cardsArray;

            const randomCard = () => cardsArray[Math.floor(Math.random() * cardsArray.length)];
            let randomItem = randomCard();
            let randomItem1 = randomCard();
            let randomItem2 = randomCard();
            let randomItem3 = randomCard();
            let randomItem4 = randomCard();
            let randomItem5 = randomCard();


            // while (cardsPickedArrayPlayer1.map(card => card.id).includes(randomItem.id)) {
            //     console.log('infinite')
            //     randomItem = randomCard();
            // }
            // cardsPickedArrayPlayer1.push(randomItem);

            // randomItem = randomCard();
            // while (cardsPickedArrayPlayer1.map(card => card.id).includes(randomItem.id)) {
            //     randomItem = randomCard();
            // }
            // cardsPickedArrayPlayer1.push(randomItem);

            // randomItem = randomCard();
            // while (cardsPickedArrayPlayer1.map(card => card.id).includes(randomItem.id)) {
            //     randomItem = randomCard();
            // }
            cardsPickedArrayPlayer1.push(randomItem, randomItem1, randomItem2);


            //////////////////////////////////

            // while (cardsPickedArrayPlayer2.map(card => card.id).includes(randomItem.id)) {
            //     randomItem = randomCard();
            // }
            // cardsPickedArrayPlayer2.push(randomItem);

            // randomItem = randomCard();
            // while (cardsPickedArrayPlayer2.map(card => card.id).includes(randomItem.id)) {
            //     randomItem = randomCard();
            // }
            // cardsPickedArrayPlayer2.push(randomItem);

            // randomItem = randomCard();
            // while (cardsPickedArrayPlayer2.map(card => card.id).includes(randomItem.id)) {
            //     randomItem = randomCard();
            // }
            cardsPickedArrayPlayer2.push(randomItem3, randomItem4, randomItem5);

            return {
                ...state,
                player1Cards: cardsPickedArrayPlayer1,
                player2Cards: cardsPickedArrayPlayer2,
                newBoard: 'start'
            }

        default:
            return state;
    }
};

export default reducer;
