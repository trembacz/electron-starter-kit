const appTitle = 'Electron starter kit with React, Redux, Webpack';
const clickMe = 'Click me';

const defaultConfig = {
    configName: 'preferences',
    defaults: {
        windowBounds: { width: 1000, height: 800, x: undefined, y: undefined, maximized: false }
    }
};

module.exports = {
    appTitle,
    clickMe,
    defaultConfig
};
