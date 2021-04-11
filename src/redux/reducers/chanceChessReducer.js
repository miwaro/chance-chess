import * as actionTypes from '../actions/actionTypes';
import { deckArray } from "../../utils/DeckArray";

const initialState = {
    player1Cards: [],
    player2Cards: [],
    newBoard: false,
    whiteToMove: true,
    cardsArray: deckArray, // the deck
    selectedCard: [],
    allSelected: false,
    fullDeck: deckArray,
    fen: 'start',
    capturedPieces: {
        W: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 },
        B: { p: 0, n: 0, b: 0, r: 0, q: 0, k: 0 }
    }
}

const reducer = (state = initialState, action) => {
    let cardsArray;
    let deck;
    let newDeck;
    let selected;
    let selectedCard;
    let p1Cards;
    let p2Cards;
    let player1Cards;
    let player2Cards;
    let whiteToMove;

    console.log(action)

    switch (action.type) {

        case actionTypes.UPDATE_GAME:
            localStorage.setItem(`${action.gameId}-game`, JSON.stringify({ ...action.state }));
            return action.state;

        case actionTypes.UPDATE_FEN:
            return { ...state, fen: action.fen };

        case actionTypes.SET_CARD:
            return {
                ...state,
                player1Cards: action.player1Cards,
                cardsArray: action.cardsArray
            }

        case actionTypes.SET_PLAYER2_CARD:
            return {
                ...state,
                player2Cards: action.player2Cards,
                cardsArray: action.cardsArray
            }

        case actionTypes.GET_CARD:
            player1Cards = state.player1Cards;
            deck = state.cardsArray;

            if (deck.length >= 3) {
                if (player1Cards.length === 0) {
                    player1Cards.push(...deck.slice(0, 3))
                }


                if (player1Cards.length === 1) {
                    player1Cards.push(...deck.slice(0, 2))
                }


                if (player1Cards.length === 2) {
                    player1Cards.push(...deck.slice(0, 1))
                }
            }

            if (deck.length === 2) {
                player1Cards.push(...deck.slice(0, 2))
            }

            if (deck.length === 1) {
                player1Cards.push(...deck.slice(0, 1))
            }

            if (player1Cards.length > 3) player1Cards = player1Cards.slice(0, 3);



            let player1CardsIndex = player1Cards.map(card => card.index)

            newDeck = deck.filter(card => !player1CardsIndex.includes(card.index))

            return {
                ...state,
                player1Cards,
                cardsArray: newDeck
            }

        case actionTypes.GET_PLAYER2_CARD:
            player2Cards = state.player2Cards;
            deck = state.cardsArray;

            if (deck.length >= 3) {
                if (player2Cards.length === 0) {
                    player2Cards.push(...deck.slice(0, 3))
                }


                if (player2Cards.length === 1) {
                    player2Cards.push(...deck.slice(0, 2))
                }


                if (player2Cards.length === 2) {
                    player2Cards.push(...deck.slice(0, 1))
                }
            }

            if (deck.length === 2) {
                player2Cards.push(...deck.slice(0, 2))
            }

            if (deck.length === 1) {
                player2Cards.push(...deck.slice(0, 1))
            }

            if (player2Cards.length > 3) player2Cards = player2Cards.slice(0, 3);


            let player2CardsIndex = player2Cards.map(card => card.index)

            newDeck = deck.filter(card => !player2CardsIndex.includes(card.index))

            return {
                ...state,
                player2Cards,
                cardsArray: newDeck
            }
        case actionTypes.SELECT_CARD:
            const { cardValue, cardIndex } = action;
            selectedCard = state.selectedCard;
            selectedCard = [];
            selectedCard = [cardValue, cardIndex];


            return {
                ...state,
                selectedCard: selectedCard
            }

        case actionTypes.SELECT_ALL:

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

        case actionTypes.SET_CAPTURED_PIECES:
            console.log(action.capturedPieces)
            return {
                ...state,
                capturedPieces: action.capturedPieces
            }

        default:
            return state;
    }
};

export default reducer;
