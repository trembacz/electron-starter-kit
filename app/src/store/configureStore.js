import { createStore, compose } from 'redux';
import rootReducer from 'reducers';

export function configureStore() {
    const composeEnhancers = process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : {}
        : compose;
    const store = createStore(rootReducer, composeEnhancers);
    return store;
}
