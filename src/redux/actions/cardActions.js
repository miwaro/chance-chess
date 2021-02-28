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


// should Reset Game
export const startNewGame = () => {
    return {
        type: actionTypes.START_NEW_GAME
    };
};



