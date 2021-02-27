import * as actionTypes from './actionTypes';

// new action creator
export const selectCard = (cardValue, cardIndex, cardPiece) => {
    return {
        type: 'SELECT_CARD',
        cardValue,
        cardIndex,
        cardPiece
    };
};


export const getCard = () => {
    return {
        type: actionTypes.GET_CARD
    };
};

export const getPlayer2Card = () => {
    return {
        type: actionTypes.GET_PLAYER2_CARD
    };
};


export const startNewGame = () => {
    return {
        type: actionTypes.START_NEW_GAME
    };
};

