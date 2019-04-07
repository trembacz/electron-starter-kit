const fs = require('fs');
const path = require('path');

const installExtensions = async() => {
    const installer = require('electron-devtools-installer');
    const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) {
        try {
            await installer.default(installer[name], forceDownload);
        } catch (e) {
            console.log(`Error installing ${name} extension: ${e.message}`); // eslint-disable-line
        }
    }
};

const getPreferences = (app, remote, config, key) => {
    const userDataPath = (app || remote.app).getPath('userData');
    const filePath = path.join(userDataPath, config + '.json');
    try {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        return content[key] || content;
    } catch(error) {
        return false;
    }
};

module.exports = {
    installExtensions,
    getPreferences
};
