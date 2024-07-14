# Decoupled Tabs [![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

Decoupled Tabs is a WordPress plugin that provides a block to create tabs in the Gutenberg editor. The word decoupled means you can create add tab on the page and add the content of that tab at different places on the page without needing them to wrap inside the tab block. 

For example, There is a drop-down selector at the top of the page and you want to show different content based on the selection. You can create tabs for each selection and add the content of that tab at different places on the page.

## How block works
[![Watch the video]](https://raw.githubusercontent.com/SH4LIN/gutenberg-decoupled-tabs/main/docs/readme/block-editorial-experience.mov)

## Get Started
### Plugin Setup
- Clone the `gutenberg-decoupled-tabs` repository from [GitHub](https://github.com/SH4LIN/gutenberg-decoupled-tabs/) with the desired directory name using the following command:
```bash
git clone https://github.com/SH4LIN/gutenberg-decoupled-tabs.git <directory-name>
```
- Run `nvm use` to use the preferred Node.js version. It is highly recommended to use the Node version mentioned in the `.nvmrc` file to ensure building scripts run without failing.
- Run `npm install` to install all the dependencies.

### Build Assets
- Use `npm start` to build the plugin assets in interactive mode.
- Use `npm run build` to build the plugin assets in a non-interactive mode for Production.
- There are some additional commands available for building the assets separately:
    - `npm run start:blocks`: Builds the blocks assets only in interactive mode within `assets/src/blocks` directory.
    - `npm run start:js`: Builds the JavaScript assets only in interactive mode within `assets/src/js` directory.
    - `npm run build:blocks`: Builds the blocks assets only within `assets/src/blocks` directory.
    - `npm run build:js`: Builds the JavaScript assets only within `assets/src/js` directory.

### Extend Webpack Configuration
- Blocks are using [@wordpress/scripts](https://www.npmjs.com/package/@wordpress/scripts) Webpack configuration so no need to extend Webpack configuration for blocks.
- `assets/src/js` directory is using custom Webpack configuration extended from `@wordpress/scripts` Webpack configuration, so you need to specify entry point for the JavaScript files in `assets/src/js` directory.
- To add more JavaScript files to the Webpack configuration, you can use the following syntax:
```js
// If you have an example.js file in the `assets/src/js` directory, you can add it to the Webpack configuration like this:
const exampleJS = {
    ...sharedConfig,
    entry: {
        'example': path.resolve( process.cwd(), 'assets', 'src', 'js', 'example.js' ),
    },
};

// If you want to add a plugin for this specific JS file, you can use the following syntax:
const exampleJS = {
    ...sharedConfig,
    entry: {
        'example': path.resolve( process.cwd(), 'assets', 'src', 'js', 'example.js' ),
    },
    plugins: [
        ...sharedConfig.plugins,
        new Plugin(),
    ],
};

// Similarly you can modify the webpack configuration for a entry point.

// Now you need to export the webpack configuration like this:
module.exports = [
    // ... more webpack configurations ...
    exampleJS,
]
