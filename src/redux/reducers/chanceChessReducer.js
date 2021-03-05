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
}

const reducer = (state = initialState, action) => {
    console.log(`state: ${state} action: ${action}`)
    let cardsArray;
    let randomCard;
    let randomItem;
    let randomItem1;
    let randomItem2;
    let randomItem3;
    let randomItem4;
    let randomItem5;
    let newCardsArray;
    let selectedCard;
    let p1Cards;
    let player1Cards;
    let player2Cards;
    let whiteToMove;
    let cardsPickedP1;
    let cardsPickedArrayForPlayer1;
    let cardsPickedArrayForPlayer2;

    switch (action.type) {
        case actionTypes.START_NEW_GAME:
            cardsPickedArrayForPlayer1 = [];
            cardsPickedArrayForPlayer2 = [];
            cardsArray = state.cardsArray;

            //old code that i might use to start game with 3 random cards////players unfortunately can receive the same card ****************************************************************************************
            randomCard = () => cardsArray[Math.floor(Math.random() * cardsArray.length)];
            randomItem = randomCard();
            randomItem1 = randomCard();
            randomItem2 = randomCard();
            randomItem3 = randomCard();
            randomItem4 = randomCard();
            randomItem5 = randomCard();

            cardsPickedArrayForPlayer1.push(randomItem, randomItem1, randomItem2);
            cardsPickedArrayForPlayer2.push(randomItem3, randomItem4, randomItem5);

            // let randomItems = [randomItem, randomItem1, randomItem2, randomItem3, randomItem4, randomItem5];

            // let filteredItems = randomItems.forEach(item => {
            //     console.log(cardsArray)
            //     return cardsArray.filter(card => card.index !== item.index)
            // })
            // console.log(filteredItems)

            newCardsArray = cardsArray.filter(el =>
                el.index !== randomItem.index &&
                el.index !== randomItem1.index &&
                el.index !== randomItem2.index &&
                el.index !== randomItem3.index &&
                el.index !== randomItem4.index &&
                el.index !== randomItem5.index
            )

            return {
                ...state,
                player1Cards: cardsPickedArrayForPlayer1,
                player2Cards: cardsPickedArrayForPlayer2,
                cardsArray: newCardsArray,
                newBoard: !state.newBoard,
            }
        // *********************************************************************************************


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
                selectedCard: []
            }

        // case actionTypes.SELECT_ALL:
        //     const { cards } = action;

        //     let selectedCards = this.state.selectedCards
        //     selectedCards = { cards };
        //     player1Cards = state.player1Cards;


        //     isSelected = state.allSelected;

        //     let suits = selectedCards.map(card => card.suits);

        //     let clubs = suits.every(suit => suit === 'Club')
        //     let diamonds = suits.every(suit => suit === 'Diamond')
        //     let spades = suits.every(suit => suit === 'Spade')
        //     let hearts = suits.every(suit => suit === 'Heart')

        //     if ((clubs || diamonds || spades || hearts) && selectedCards.length === 3) {
        //         return isSelected = !isSelected
        //     }
        //     return {
        //         ...state,
        //         isSelected: !state.allSelected,
        //         selectedCards
        //     }

        case actionTypes.SELECT_ALL:
            whiteToMove = state.whiteToMove;
            return {
                ...state,
                selectedCard: [],
                allSelected: !state.allSelected
            }

        case actionTypes.CHANGE_TURN:

            return {
                ...state,
                whiteToMove: !state.whiteToMove
            }

        case actionTypes.SHUFFLE:

            // let { deckArray } = action;
            let deck = action.deckArray
            player1Cards = state.player1Cards;
            player2Cards = state.player2Cards;

            let playerCards = player1Cards.concat(player2Cards);

            let playerCardIndexes = playerCards.map(card => card.index);

            let newCardArray = [];


            for (let i = 0; i < deck.length; i++) {
                if (deck[i].index !== playerCardIndexes) {
                    newCardArray.push(deck[i])
                }
            }

            return {
                ...state,
                cardsArray: newCardArray
            }





        // let cardsPickedP1Index = cardsPickedP1.map(card => card.index).join('');












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

            return {
                ...state,
                whiteToMove: !whiteToMove,
                player1Cards: []


            }

        case actionTypes.DISCARD_ALL_P2_CARDS:
            whiteToMove = state.whiteToMove;

            return {
                ...state,
                whiteToMove: !whiteToMove,
                player2Cards: []

            }

        default:
            return state;
    }
};

export default reducer;
