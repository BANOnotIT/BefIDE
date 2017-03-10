"use strict";
/**
 * Created by BANO.notIT on 08.03.17.
 */
'use strict';

let
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    fs = require('fs'),
    path = require('path'),
    webpack = require('webpack'),
    buildPath = 'dist',
    publicPath = 'dist',
    webpackPort = process.env.WEBPACK_PORT || 3001
    ;


module.exports = {
    devtool: "eval-source-map",
    entry: [

        'react-hot-loader/patch',
        // activate HMR for React

        'webpack-dev-server/client?http://localhost:' + webpackPort,
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        // the entry point of our app
        "./src/index.js"
    ],
    output: {
        path: path.resolve(process.env.PWD, buildPath),
        filename: 'end.js',
        publicPath: 'http://localhost:' + webpackPort + '/' + publicPath + '/',
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.IgnorePlugin(/vertx/),

        new webpack.HotModuleReplacementPlugin(),

        new ExtractTextPlugin({filename: 'end.css', allChunks: true}),

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates
        function () {
            this.plugin('done', function (stats) {
                fs.writeFileSync(
                    path.resolve(process.env.PWD, 'stats.json'),
                    JSON.stringify(stats.toJson())
                );
            });
        }
    ],
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'style!css!sass'

                ]
            },
            {
                exclude: /node_modules/,
                test: /\.jsx?$/,
                use: [
                    'babel-loader',
                    // 'react-hot-loader'
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                    'file-loader?name=fonts/[name].[ext]'
                ]
            }
        ]
    },
    bail: false,
    watch: true,
};
