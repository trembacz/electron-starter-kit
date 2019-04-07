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

const appUpdater = (document, event, message, type, data) => {
    // check if template exist, if not append it
    if (!document.querySelector('.progress-container')) {
        const template = `
            <div class="progress-container hidden">
                <span class="progress-message"></span>
                <div class="progress-dynamic hidden">
                    <progress id="update-progress" max="100" value="0"></progress>
                    <span class="progress-value"></span>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', template);
    }

    const progressBar = document.getElementById('update-progress');
    const progressBarValue = document.querySelector('.progress-value');
    const progressBarMessage = document.querySelector('.progress-message');
    const progressBarDynamic = document.querySelector('.progress-dynamic');
    const progressContainer = document.querySelector('.progress-container');

    if (progressContainer.classList.contains('hidden') && type !== 'not-available' && type !== 'error') {
        progressContainer.classList.remove('hidden');
    }

    const percent = Math.floor(data.percent);

    switch (type) {
        case 'available':
            progressBarMessage.textContent = message + ' (' + data.version + ')';
            break;
        case 'not-available':
            progressBarMessage.textContent = message;
            break;
        case 'progress':
            (data.bytesPerSecond > 1024 * 1024)
                ? progressBarMessage.textContent = message + ' (' + Math.round(data.bytesPerSecond / 1024 / 1024, 2) + '  Mb/s)'
                : progressBarMessage.textContent = message + ' (' + Math.round(data.bytesPerSecond / 1024, 2) + '  kb/s)';
            progressBar.value = percent;
            progressBarValue.textContent = percent + '%';
            progressBarDynamic.classList.remove('hidden');
            break;
        case 'downloaded':
            progressBarMessage.textContent = message + ' (' + data.version + ')';
            setTimeout(() => { progressContainer.classList.add('hidden'); }, 5000);
            break;
        case 'error':
            progressBarMessage.textContent = message;
            break;
        default:
            break;
    }
};

module.exports = {
    installExtensions,
    getPreferences,
    appUpdater
};
