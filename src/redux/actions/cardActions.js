import * as actionTypes from './actionTypes';

export const selectCard = (cardValue, cardIndex, cardPiece, turn) => {
    return {
        type: 'SELECT_CARD',
        cardValue,
        cardIndex,
        cardPiece,
        turn
    };
};


export const deselectCard = (selectedCardIndex) => {
    return {
        type: 'DESELECT_CARD',
        selectedCardIndex
    };
};

export const selectAll = () => {
    return {
        type: 'SELECT_ALL'
    };
};

export const deselectAll = (cardValues, cardIndexes, cardPieces) => {
    return {
        type: 'DESELECT_ALL',
        cardValues,
        cardIndexes,
        cardPieces
    };
};

// should be called "draw" card
export const getCard = () => {
    return {
        type: actionTypes.GET_CARD
    };
};

// should be called "draw" card

export const getPlayer2Card = () => {
    return {
        type: actionTypes.GET_PLAYER2_CARD
    };
};

export const changeTurn = () => {
    return {
        type: actionTypes.CHANGE_TURN
    };
};

export const removeSelectedCard = (selectedCardIndex) => {
    return {
        type: actionTypes.REMOVE_SELECTED_CARD,
        selectedCardIndex
    };
};



export const discardAllP1Cards = () => {
    return {
        type: actionTypes.DISCARD_ALL_P1_CARDS
    };
};

export const discardAllP2Cards = () => {
    return {
        type: actionTypes.DISCARD_ALL_P2_CARDS
    };
};

export const shuffle = (deckArray) => {
    return {
        type: actionTypes.SHUFFLE,
        deckArray
    };
};




// should Reset Game
export const startNewGame = () => {
    return {
        type: actionTypes.START_NEW_GAME
    };
};



