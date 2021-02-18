import * as actionTypes from './actionTypes';

export const selectCard = (card) => {
    return {
        type: actionTypes.SELECT_CARD,
        card
    };
};

