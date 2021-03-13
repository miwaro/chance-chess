import * as actionTypes from '../actions/actionTypes';

const initialState = {
  creator: '',
  gameId: '',
  numPlayers: 0,
  playerOne: '',
  playerTwo: ''
}

const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.UPDATE_USERS:
      return action.state;

    case actionTypes.JOIN_GAME:
      return {
        ...state,
        creator: action.isCreator ? action.username : state.creator,
        numPlayers: action.isCreator ? 1 : 2,
        gameId: action.gameId,
        playerOne: action.isCreator ? action.username : state.playerOne,
        playerTwo: action.isCreator ? state.playerTwo : action.username,
      }

    default:
      return state;
  }
};

export default usersReducer;
