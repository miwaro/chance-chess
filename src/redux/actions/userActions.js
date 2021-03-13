import * as actionTypes from './actionTypes';

export const updateUsers = (state) => {
    return {
        type: actionTypes.UPDATE_USERS,
        state
    };
};

export const joinGame = (username, isCreator, gameid) => {
    return {
        type: actionTypes.JOIN_GAME,
        username,
        isCreator,
        gameid
    };
};