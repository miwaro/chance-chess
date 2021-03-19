import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

export default (initialState) => {
    return createStore(
        rootReducer,
        initialState,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk)
        );
}


// const store = createStore(rootReducer, applyMiddleware(thunk));