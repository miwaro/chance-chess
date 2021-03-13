import * as actionTypes from './actionTypes';

export const updateUsers = (state) => {
    return {
        type: actionTypes.UPDATE_USERS,
        state
    };
};

export const joinGame = (username, isCreator, gameId) => {
    return {
        type: actionTypes.JOIN_GAME,
        username,
        isCreator,
        gameId
    };
};