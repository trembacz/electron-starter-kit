import { createStore, compose } from 'redux';
import rootReducer from 'reducers';

export function configureStore() {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() || compose;
    const store = createStore(rootReducer, composeEnhancers);
    return store;
}
