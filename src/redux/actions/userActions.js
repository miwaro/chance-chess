import * as actionTypes from './actionTypes';

export const joinGame = (username, isCreator, gameid) => {
    return {
        type: actionTypes.JOIN_GAME,
        username,
        isCreator,
        gameid
    };
};