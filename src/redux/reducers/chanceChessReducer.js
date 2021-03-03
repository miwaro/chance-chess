import * as actionTypes from '../actions/actionTypes';
import { deckArray } from "../../utils/DeckArray";

const initialState = {
    player1Cards: [],
    player2Cards: [],
    newBoard: false,
    whiteToMove: true,
    forceMove: false,
    cardsArray: deckArray,
    selectedCard: null
}

const reducer = (state = initialState, action) => {
    let cardsArray;
    let randomCard;
    let randomItem;
    let newCardsArray;
    let selectedCard;
    let p1Cards;
    let player1Cards;
    let whiteToMove;
    let forceMove;
    let cardsPickedP1;

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
            player1Cards = state.player1Cards;
            let cardsPickedArrayPlayer1 = [...state.player1Cards, player1Cards];

            cardsArray = state.cardsArray;

            randomCard = () => cardsArray[Math.floor(Math.random() * cardsArray.length)];
            randomItem = randomCard();

            newCardsArray = cardsArray.filter(element => element.index !== randomItem.index)

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
            const { cardValue, cardIndex, cardPiece, turn } = action;
            selectedCard = { cardValue, cardIndex, cardPiece, turn }

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


        case actionTypes.CHANGE_TURN:

            return {
                ...state,
                whiteToMove: !state.whiteToMove
            }


        case actionTypes.SHUFFLE:

            let { deckArray } = action;
            player1Cards = state.player1Cards;

            cardsPickedP1 = [...state.player1Cards, player1Cards];

            // let cardsPickedP1 = state.player1Cards;
            // let cardsPickedP2 = state.player2Cards;

            let cardsPickedP1Index = cardsPickedP1.map(card => card.index).join('');
            // let cardsPickedP2Index = cardsPickedP2.map(card => card.index).join('');

            let newCardArray = [];

            for (let i = 0; i < deckArray.length; i++) {
                if (deckArray[i].index !== cardsPickedP1Index) {
                    newCardArray.push(deckArray[i])
                }
            }

            return {
                ...state,
                cardsArray: newCardArray
            }









        case actionTypes.REMOVE_SELECTED_CARD:
            // let selectedCardIndex = action;
            p1Cards = state.player1Cards;
            let p2Cards = state.player2Cards;
            let selected = state.selectedCard;
            whiteToMove = state.whiteToMove;


            if (whiteToMove) {
                p1Cards = p1Cards.filter(card => card.index !== selected.cardIndex)
            } else if (!whiteToMove) {
                p2Cards = p2Cards.filter(card => card.index !== selected.cardIndex)
            }

            return {
                ...state,
                player1Cards: p1Cards,
                player2Cards: p2Cards
            }


        case actionTypes.DISCARD_ALL_P1_CARDS:
            whiteToMove = state.whiteToMove;
            forceMove = state.forceMove;
            // let forceBlackMove = state.forceMove;
            return {
                ...state,
                player1Cards: [],
                forceMove: !forceMove,
                whiteToMove: !whiteToMove

            }

        case actionTypes.DISCARD_ALL_P2_CARDS:
            whiteToMove = state.whiteToMove;
            forceMove = state.forceMove;

            // let forceWhiteMove = state.forceMove;


            return {
                ...state,
                player2Cards: [],
                forceMove: !forceMove,
                whiteToMove: !whiteToMove
            }

        default:
            return state;
    }
};

export default reducer;
