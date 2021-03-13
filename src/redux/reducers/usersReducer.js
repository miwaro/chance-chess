import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isCreator: false,
  gameid: '',
  username: ''
}

const usersReducer = (state = initialState, action) => {

  switch (action.type) {
      case actionTypes.JOIN_GAME:
         return {
           ...state,
           isCreator: action.isCreator,
           username: action.username,
           numPlayers: action.isCreator ? 1 : 2,
           gameid: action.gameid
         }

      default:
          return state;
  }
};

export default usersReducer;
