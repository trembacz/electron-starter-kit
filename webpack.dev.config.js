const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    // devtool: 'eval',
    entry: './app/src/index.js',
    output: {
        path: path.join(__dirname, '/build/'),
        filename: '[name].js',
        publicPath: ''
    },
    target: 'electron-renderer',
    watch: true,
    resolve: {
        modules: ['app/src', 'node_modules'],
        extensions: ['.js', '.json'],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        }
    },
    performance: {
        hints: false
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'bundle.css',
            disable: false,
            allChunks: true,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            inject: 'body',
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                include: path.join(__dirname, 'app'),
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(js)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    configFile: '.eslintrc',
                    failOnWarning: false,
                    failOnError: false
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    loader: 'css-loader',
                    options: {
                        modules: 'global'
                    },
                }),
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?prefix=font/&limit=5000',
                options: {
                    modules: false,
                },
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    useRelativePath: true,
                    outputPath: "images/",
                    publicPath: ""
                }
            }
        ],
    },
    externals: [
        'child-killer'
    ]
};
