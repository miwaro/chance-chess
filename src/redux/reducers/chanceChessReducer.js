import * as actionTypes from '../actions/actionTypes';

const initialState = {
    player1StartingCards: [],
    player2StartingCards: [],
    cardInfo: [],
}

const reducer = (state = initialState, action) => {
    let info;
    let cardInfo;

    switch (action.type) {
        case actionTypes.GET_CARD_INFO:
            info = {
                cardIndex: action.cardIndex,
                cardPiece: action.cardPiece,
                cardFile: action.cardFile
            }
            cardInfo = [...state.cardInfo, info]

            return {
                ...state,
                cardInfo
            }
        default:
            return state;
    }
};

export default reducer;
