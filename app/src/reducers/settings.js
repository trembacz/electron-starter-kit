import * as types from 'actions/types';
const clone = (item) => JSON.parse(JSON.stringify(item));

const initState = {
    counter: 0
};

function reduxCounter(state) {
    const newState = clone(state);
    newState.counter = newState.counter + 1;
    return newState;
}

export default function settings(state = initState, action) {
    switch (action.type) {
        case types.COUNTER:
            return reduxCounter(state);
        default:
            return state;
    }
}
