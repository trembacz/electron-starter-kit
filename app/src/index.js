import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'store/configureStore';

import { ipcRenderer as ipc } from 'electron';

import Main from 'containers/Main';
import 'css/global.css';

import { counter } from 'actions';

const store = configureStore();
const mainElem = document.getElementById('app');

ipc.on('reduxCounter', () => { store.dispatch(counter()); });

if (mainElem) {
    render(
        <Provider store={store}>
            <Main />
        </Provider>,
        mainElem
    );
}
