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
      const incomingPlayerOne = action.state.playerOne;
      const currentPlayerOne = state.playerOne;
      const playerOne = incomingPlayerOne ? incomingPlayerOne : currentPlayerOne;
      const incomingPlayerTwo = action.state.playerTwo;
      const currentPlayerTwo = state.playerTwo;
      const playerTwo = incomingPlayerTwo ? incomingPlayerTwo : currentPlayerTwo;
      return { ...action.state, playerOne, playerTwo };

    case actionTypes.JOIN_GAME:
      console.log(action)
      return {
        ...state,
        creator: action.isCreator ? action.username : state.creator,
        numPlayers: action.isCreator ? 1 : 2,
        gameId: action.gameId,
        playerOne: action.isCreator ? action.username : state.playerOne,
        playerTwo: action.isCreator ? state.playerTwo : action.username,
      }

    case actionTypes.SET_PLAYER_ONE:
      return { ...state, playerOne: action.playerOne }

    case actionTypes.SET_PLAYER_TWO:
      return { ...state, playerTwo: action.playerTwo }

    default:
      return state;
  }
};

export default usersReducer;
