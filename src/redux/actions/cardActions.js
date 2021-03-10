import * as actionTypes from './actionTypes';


export const shuffleOnMount = () => {
    return {
        type: actionTypes.SHUFFLE_ON_MOUNT
    };
};

export const selectCard = (cardValue, cardIndex) => {
    return {
        type: 'SELECT_CARD',
        cardValue,
        cardIndex,
    };
};

export const selectAll = () => {
    return {
        type: 'SELECT_ALL'
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

export const discardOneCard = (selectedCard) => {
    return {
        type: actionTypes.DISCARD_ONE_CARD,
        selectedCard
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

export const shuffle = (p1CardsIndexes, p2CardsIndexes) => {
    return {
        type: actionTypes.SHUFFLE,
        p1CardsIndexes,
        p2CardsIndexes
    };
};


// should Reset Game
export const startNewGame = () => {
    return {
        type: actionTypes.START_NEW_GAME
    };
};



