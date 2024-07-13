/**
 * External dependencies
 */
const fs = require( 'fs' );
const path = require( 'path' );
const CssMinimizerPlugin = require( 'css-minimizer-webpack-plugin' );
const RemoveEmptyScriptsPlugin = require( 'webpack-remove-empty-scripts' );

/**
 * WordPress dependencies
 */
const { getAsBooleanFromENV } = require( '@wordpress/scripts/utils' );

const hasExperimentalModulesFlag = getAsBooleanFromENV( 'WP_EXPERIMENTAL_MODULES' );
let scriptConfig, moduleConfig;

if ( hasExperimentalModulesFlag ) {
	[ scriptConfig, moduleConfig ] = require( '@wordpress/scripts/config/webpack.config' );
} else {
	scriptConfig = require( '@wordpress/scripts/config/webpack.config' );
}

// Extend the default config.
const sharedConfig = {
	...scriptConfig,
	output: {
		path: path.resolve( process.cwd(), 'assets', 'build', 'js' ),
		filename: '[name].js',
		chunkFilename: '[name].js',
	},
	plugins: [
		...scriptConfig.plugins
			.map(
				( plugin ) => {
					if ( plugin.constructor.name === 'MiniCssExtractPlugin' ) {
						plugin.options.filename = '../css/[name].css';
					}
					return plugin;
				},
			),
		new RemoveEmptyScriptsPlugin(),
	],
	optimization: {
		...scriptConfig.optimization,
		splitChunks: {
			...scriptConfig.optimization.splitChunks,
		},
		minimizer: scriptConfig.optimization.minimizer.concat( [ new CssMinimizerPlugin() ] ),
	},
};

// Generate a webpack config which includes setup for CSS extraction.
// Look for css/scss files and extract them into a build/css directory.
const styles = {
	...sharedConfig,
	entry: () => {
		const entries = {};

		const dir = './assets/src/css';
		fs.readdirSync( dir ).forEach( ( fileName ) => {
			const fullPath = `${ dir }/${ fileName }`;
			if ( ! fs.lstatSync( fullPath ).isDirectory() ) {
				entries[ fileName.replace( /\.[^/.]+$/, '' ) ] = fullPath;
			}
		} );

		return entries;
	},
	module: {
		...sharedConfig.module,
	},
	plugins: [
		...sharedConfig.plugins.filter(
			( plugin ) => plugin.constructor.name !== 'DependencyExtractionWebpackPlugin',
		),
	],

};

const scripts = {
	...sharedConfig,
	entry: {

	},
};

let moduleScripts = {};
if ( hasExperimentalModulesFlag ) {
	moduleScripts = {
		...moduleConfig,
		entry: {
		},
		output: {
			...moduleConfig.output,
			path: path.resolve( process.cwd(), 'assets', 'build', 'js', 'modules' ),
			filename: '[name].js',
			chunkFilename: '[name].js',
		},
	};
}

const customExports = [ scripts, styles ];

if ( hasExperimentalModulesFlag ) {
	customExports.push( moduleScripts );
}

module.exports = customExports;
