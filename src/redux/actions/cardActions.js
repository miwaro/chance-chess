import * as actionTypes from './actionTypes';

export const addPlayer = (card) => {
    return {
        type: actionTypes.ADD_CARD,
        card
    };
};

// export const removePlayer = (playerIndex) => {
//     return {
//         type: actionTypes.REMOVE_PLAYER,
//         playerIndex,
//     };
// };