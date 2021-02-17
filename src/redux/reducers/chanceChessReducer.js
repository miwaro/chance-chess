import * as actionTypes from '../actions/actionTypes';

const initialState = {

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CARD':
            return {

            }
        default:
            return state;
    }
};

export default reducer;
