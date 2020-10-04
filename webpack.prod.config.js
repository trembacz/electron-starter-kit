const webpack = require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'production',
    entry: './app/src/index.js',
    output: {
        path: path.join(__dirname, '/build/'),
        filename: '[name].min.js',
        publicPath: ''
    },
    target: 'electron-renderer',
    watch: true,
    resolve: {
        modules: ['app/src', 'node_modules'],
        extensions: ['.js', '.json'],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
              terserOptions: {
                output: {
                  comments: false
                }
              }
            })
        ],
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
        new MiniCssExtractPlugin({
            filename: 'bundle.min.css',
            disable: false,
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new HtmlWebpackPlugin({
            template: 'app/index.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new OptimizeCSSAssetsPlugin({}),
        // new BundleAnalyzerPlugin(),
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
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[ext]',
                        limit: false,
                        encoding: false,
                        esModule: false,
                    }
                }
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
