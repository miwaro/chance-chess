import chanceChessReducer from './chanceChessReducer';
import usersReducer from './usersReducer';
import { combineReducers } from 'redux';
const rootReducer = combineReducers({
    chanceChessReducer,
    usersReducer
});
export default rootReducer;