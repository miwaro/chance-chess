import * as actionTypes from '../actions/actionTypes';

const initialState = {
    player1StartingCards: [],
    player2StartingCards: [],
    card1: null,
    card2: null,
    card3: null,
    card4: null,
    card5: null,
    card6: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SELECT_CARD:
            return {

            }
        default:
            return state;
    }
};

export default reducer;
