import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isCreator: false,
  gameId: '',
  username: '',
  numPlayers: 0,
  playerNumber: 0
}

const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.UPDATE_USERS:
      return action.state;

    case actionTypes.JOIN_GAME:
      return {
        ...state,
        isCreator: action.isCreator,
        username: action.username,
        numPlayers: action.isCreator ? 1 : 2,
        gameId: action.gameId,
        playerNumber: action.isCreator ? 1 : 2 // TODO: randomize playerNumber
      }

    default:
      return state;
  }
};

export default usersReducer;
