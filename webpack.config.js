const webpack = require('webpack'),
	path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	ReactRootPlugin = require('html-webpack-react-root-plugin'),
	OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: './client/index.js',
	output: {
		path: path.resolve(__dirname, 'client/build'),
		filename: 'script.js'
	},
	watch: true,
	resolve: {
		alias: {
			components: path.resolve(__dirname, 'client/app/commons/components'),
			utils: path.resolve(__dirname, 'client/app/commons/utils')
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['env', 'react']
				}
			}
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		}],
	},
	plugins: [
		new webpack.ProvidePlugin({
			'React': 'react',
		}),
		new ExtractTextPlugin('style.css'),
		new HtmlWebpackPlugin(),
		new ReactRootPlugin,
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: true
		}),
/*		new webpack.optimize.UglifyJsPlugin({
			beautify: false,
			mangle: {
				screw_ie8: true,
				keep_fnames: true
			},
			compress: {
				screw_ie8: true
			},
			comments: false
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.style\.css$/g,
			canPrint: true
		})*/
	],
}