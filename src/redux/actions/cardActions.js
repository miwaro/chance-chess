import * as actionTypes from './actionTypes';

export const getCardInfo = (cardIndex, cardPiece, cardFile) => {
    return {
        type: actionTypes.GET_CARD_INFO,
        cardIndex,
        cardPiece,
        cardFile
    };
};


export const startNewGame = () => {
    return {
        type: actionTypes.START_NEW_GAME
    };
};

