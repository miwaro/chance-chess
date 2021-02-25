import * as actionTypes from './actionTypes';

export const getCardInfo = (cardIndex, cardPiece, cardFile) => {
    return {
        type: actionTypes.GET_CARD_INFO,
        cardIndex,
        cardPiece,
        cardFile
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

