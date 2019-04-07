import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { remote } from 'electron';

import electron from 'assets/electron.png';
import react from 'assets/react.png';
import redux from 'assets/redux.png';
import webpack from 'assets/webpack.png';

import { appTitle, clickMe } from 'global/constants';

const mainWindow = remote.getCurrentWindow();

class Main extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        settings: PropTypes.object
    };
    constructor() {
        super();
        this.state = {
            counter: 0
        };
    }
    render() {
        const { counter: reduxCounter } = this.props.settings;
        const { counter: componentCounter } = this.state;
        return (
            <div className="container">
                <div className="title">{appTitle}</div>
                <div className="images">
                    <img src={electron} name="Electron" />
                    <img src={react} name="React" />
                    <img src={redux} name="Redux" />
                    <img src={webpack} name="Webpack" />
                </div>
                <div className="container-buttons">
                    <div className="row">
                        <p>You clicked {reduxCounter} times - Redux state</p>
                        <button onClick={() => mainWindow.webContents.send('reduxCounter')}>
                            {clickMe}
                        </button>
                    </div>
                    <div className="row">
                        <p>You clicked {componentCounter} times - Component state</p>
                        <button onClick={() => this.setState({ counter: componentCounter + 1 })}>
                            {clickMe}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => { return { ...state }; };
export default connect(mapStateToProps)(Main);
