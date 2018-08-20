// Webpack v4
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

function recursiveIssuer(m) {
	if (m.issuer) {
		return recursiveIssuer(m.issuer);
	} else if (m.name) {
		return m.name;
	} else {
		return false;
	}
}

module.exports = {
	entry: {
		main: './src/index.js',
		ie: './src/ie.js'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				mainStyles: {
					name: 'main',
					test: (m,c,entry = 'main') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
					chunks: 'all',
					enforce: true
				},
				ieStyles: {
					name: 'ie',
					test: (m,c,entry = 'ie') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin('dist', {} ),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new HtmlWebpackPlugin({
			inject: false,
			hash: false,
			template: './src/index.html',
			filename: 'index.html'
		}),
	]
};