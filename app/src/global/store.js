const { app, remote } = require('electron');
const path = require('path');
const fs = require('fs');

const StoreManager = {
    path: '',
    data: {},
    mainWindow: {},
    init(options, window, events) {
        const userDataPath = (app || remote.app).getPath('userData');
        this.path = path.join(userDataPath, options.configName + '.json');
        this.mainWindow = window ? window : this.mainWindow;
        this.data = this.parseDataFile(this.path, options.defaults);
        this.writeToFile(this.data);
        events && this.setEvents();
    },
    get(key) {
        return this.data[key] || this.data;
    },
    set(key, val) {
        const data = this.parseDataFile(this.path);
        data[key] = val;
        this.writeToFile(data);
    },
    writeToFile(data) {
        fs.writeFileSync(this.path, JSON.stringify(data));
    },
    parseDataFile(filePath, defaults) {
        try {
            const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            return content;
        } catch(error) {
            return defaults;
        }
    },
    setWindow(window) {
        this.mainWindow = window;
    },
    setEvents() {
        const self = this;
        ['resize', 'move', 'close'].forEach(e => {
            self.mainWindow.on(e, () => {
                self.data = self.parseDataFile(self.path);
                const maximized = self.mainWindow.isMaximized();
                const { width, height, x, y } = self.mainWindow.getBounds();
                self.set('windowBounds', { width, height, x, y, maximized });
            });
        });
    }
};

export default StoreManager;
