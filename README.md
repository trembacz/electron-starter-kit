# electron-starter-kit
Electron starter kit with React, Redux, Webpack 4, Autoupdater and much more...

![](https://i.imgur.com/hws0j5C.png "Application")

## Contains

* React
* Redux
* Webpack 4 dev and production configs
* Autoupdater - checking and updating whole application when new version is available
* Local store - used to save application settings
* React + Redux devtools for debugging application
* Hot module replacement support (HMR)
* ESlint - to keep your js readable
* Code spliting - separate vendor and your app code
* Minified JS & CSS in production bundle / package
* Bundle Analyzer included (uncomment in webpack production configuration file)
* Counter examples using ```Redux``` state and ```React component``` state

## Getting Started

**1. Clone the repository to your local machine by running**

```bash
git clone git@github.com:trembacz/electron-starter-kit.git
cd electron-starter-kit
```

**2. Install all dependencies**

```npm install``` or ```yarn install```

**3. Build dev files and start the app**

```npm run start``` or ```yarn start```

**4. Build production files and start the app**

```npm run prod``` or ```yarn prod```

**5. Menu configuration**

Application menu can be found under ```global/menu.js```, you can modify it to fit your needs.

## Packages

All packages are created under the ```dist``` folder.
Before creating packages, please remember to specify ```repository``` in the ```package.json```.
If you need to change packages configuration you can do that in ```package.json``` under ```build```.

To create application packages you need to run one of the commands.

**1. Commands**

| Platform | Command |
| -------- | ---- |
| All | ```npm run package-all``` <br/> ```yarn package-all``` |
| Windows | ```npm run package-win``` <br/> ```yarn package-win``` |
| Mac | ```npm run package-mac``` <br/> ```yarn package-mac``` |
| Linux  | ```npm run package-linux``` <br/> ```yarn package-linux``` |

**2. Publishing packages**

```npm run publish-app``` or ```yarn publish-app```

## Autoupdater

Application have built in autoupdater. There are just two things you need to do:
* edit ```dev-app-update.yml``` file and fill it with your github username and repository name

```bash
owner: Github-Username
repo: Repo-Name
provider: github
```

* edit ```main.js``` and uncomment line marked below

```javascript
// check for update
// updateManager.checkForUpdate(); <-- this line
```

![](https://i.imgur.com/1xmUqta.png "Downloading update")

## Local storage

Application have built in local storage, it contains width, height and position of the application, so when you restart your application, on next run it will use these settings. It can be extended by more informations if you need to save something more. StoreManager can be found in ```global/store.js```, just use ```get``` and ```set``` methods to load / save extra informations.

Store is saved as ```JSON``` file inside the ```userData``` folder and his default version looks like below
```json
{"windowBounds":{"width":1112,"height":792,"x":184,"y":12,"maximized":false}}
```

## Authors

* **Tomasz Rembacz**
