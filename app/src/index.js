import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'store/configureStore';
import { remote, ipcRenderer as ipc } from 'electron';

import StoreManager from 'global/store.js';
import Main from 'containers/Main';

import 'css/global.css';

import { counter } from 'actions';
import { defaultConfig } from 'global/constants';
import { appUpdater } from 'global/utils';

const store = configureStore();
const mainElem = document.getElementById('app');
const mainWindow = remote.getCurrentWindow();

// check events from autoupdater
ipc.on('update-info', (event, message, type, data) => { appUpdater(document, event, message, type, data); });

ipc.on('reduxCounter', () => { store.dispatch(counter()); });

if (mainElem) {
    // init local storage
    StoreManager.init(defaultConfig, mainWindow, true);
    render(
        <Provider store={store}>
            <Main />
        </Provider>,
        mainElem
    );
}
