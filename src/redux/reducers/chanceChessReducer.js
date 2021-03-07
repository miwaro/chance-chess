import * as actionTypes from '../actions/actionTypes';
import { deckArray } from "../../utils/DeckArray";

const initialState = {
    player1Cards: [],
    player2Cards: [],
    newBoard: false,
    whiteToMove: true,
    cardsArray: deckArray,
    selectedCard: [],
    allSelected: false,
    fullDeck: deckArray
}

const reducer = (state = initialState, action) => {
    // console.log(action)
    let cardsArray;
    let randomCard;
    let randomItem;
    let newCardsArray;
    let selected;
    let selectedCard;
    let p1Cards;
    let p2Cards;
    let player1Cards;
    let player2Cards;
    let whiteToMove;

    // let cardsArray;
    // let randomCard;
    // let randomItem;
    // let randomItem1;
    // let randomItem2;
    // let randomItem3;
    // let randomItem4;
    // let randomItem5;
    // let newCardsArray;

    // let p1Cards;
    // let p2Cards;
    // let player1Cards;
    // let player2Cards;
    // let whiteToMove;
    // let cardsPickedP1;
    // let cardsPickedArrayForPlayer1;
    // let cardsPickedArrayForPlayer2;

    switch (action.type) {
        case actionTypes.START_NEW_GAME:
            let deck = [...state.fullDeck];

            player1Cards = [...state.player1Cards];
            player2Cards = [...state.player2Cards];

            for (let i = 0; i < 3; i++) {
                let p1Cards = player1Cards;
                let newDeck = deck;
                if (player1Cards.length === 3) return;
                p1Cards.push(deck[i])
                newDeck.shift(3)
            }

            for (let i = 4; i < 7; i++) {
                let p2Cards = player2Cards;
                let newDeck = deck;
                if (player2Cards.length === 3) return;
                p2Cards.push(deck[i])
                newDeck.shift(3)
            }

            return {
                ...state,
                player1Cards,
                player2Cards,
                cardsArray: deck,
                // newBoard: !state.newBoard,
            }
        // ************************************Used for testing***************************************
        // case actionTypes.START_NEW_GAME:
        //     cardsPickedArrayForPlayer1 = [];
        //     cardsPickedArrayForPlayer2 = [];
        //     cardsArray = state.cardsArray;

        //     randomCard = () => cardsArray[Math.floor(Math.random() * cardsArray.length)];
        //     randomItem = randomCard();
        //     randomItem1 = randomCard();
        //     randomItem2 = randomCard();
        //     randomItem3 = randomCard();
        //     randomItem4 = randomCard();
        //     randomItem5 = randomCard();

        //     cardsPickedArrayForPlayer1.push(randomItem, randomItem1, randomItem2);
        //     cardsPickedArrayForPlayer2.push(randomItem3, randomItem4, randomItem5);

        //     newCardsArray = cardsArray.filter(el =>
        //         el.index !== randomItem.index &&
        //         el.index !== randomItem1.index &&
        //         el.index !== randomItem2.index &&
        //         el.index !== randomItem3.index &&
        //         el.index !== randomItem4.index &&
        //         el.index !== randomItem5.index
        //     )

        //     return {
        //         ...state,
        //         player1Cards: cardsPickedArrayForPlayer1,
        //         player2Cards: cardsPickedArrayForPlayer2,
        //         cardsArray: newCardsArray,
        //         newBoard: !state.newBoard,
        //     }
        // ********************************************************************************************

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

            player2Cards = state.player2Cards;

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
            const { cardValue, cardIndex } = action;
            // selectedCard = state.selectedCard;
            selectedCard = state.selectedCard;
            selectedCard = [];
            selectedCard = [cardValue, cardIndex];


            return {
                ...state,
                selectedCard: selectedCard
            }

        case actionTypes.DESELECT_CARD:

            // selectedCard = state.selectedCard
            return {
                ...state,
                selectedCard: []
            }


        case actionTypes.SELECT_ALL:
            // whiteToMove = state.whiteToMove;
            // let all = state.allSelected;
            return {
                ...state,
                selectedCard: [],
                allSelected: !state.allSelected
            }

        case actionTypes.CHANGE_TURN:

            return {
                ...state,
                allSelected: false,
                selectedCard: [],
                whiteToMove: !state.whiteToMove
            }

        case actionTypes.SHUFFLE:
            p1Cards = state.player1Cards;
            p2Cards = state.player2Cards;
            let p1CardIndexes = action.p1Cards;
            let p2CardIndexes = action.p2Cards;
            let fullDeck = state.fullDeck;
            cardsArray = state.cardsArray;

            p1CardIndexes = p1Cards.map(card => card.index);
            p2CardIndexes = p2Cards.map(card => card.index);


            cardsArray = fullDeck.filter(card => !p1CardIndexes.includes(card.index) && !p2CardIndexes.includes(card.index))


            return {
                ...state,
                cardsArray
            }

        case actionTypes.SHUFFLE_ON_MOUNT:

            let shuffledDeck = state.cardsArray;

            for (let i = shuffledDeck.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * i);
                let temp = shuffledDeck[i];
                shuffledDeck[i] = shuffledDeck[j];
                shuffledDeck[j] = temp;
            }

            return {
                ...state
            }


        case actionTypes.REMOVE_SELECTED_CARD:
            p1Cards = state.player1Cards;
            p2Cards = state.player2Cards;
            selected = state.selectedCard;
            whiteToMove = state.whiteToMove;


            if (whiteToMove) {
                p1Cards = p1Cards.filter(card => card.index !== selected[1])
            } else if (!whiteToMove) {
                p2Cards = p2Cards.filter(card => card.index !== selected[1])
            }

            return {
                ...state,
                player1Cards: p1Cards,
                player2Cards: p2Cards
            }


        case actionTypes.DISCARD_ALL_P1_CARDS:
            whiteToMove = state.whiteToMove;

            return {
                ...state,
                allSelected: false,
                whiteToMove: !whiteToMove,
                player1Cards: []


            }

        case actionTypes.DISCARD_ALL_P2_CARDS:
            whiteToMove = state.whiteToMove;

            return {
                ...state,
                allSelected: false,
                whiteToMove: !whiteToMove,
                player2Cards: []

            }

        default:
            return state;
    }
};

export default reducer;
