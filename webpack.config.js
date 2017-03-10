"use strict";
let
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    fs = require('fs'),
    path = require('path'),
    webpack = require('webpack'),
    buildPath = 'dist'
    ;
/**
 * Created by BANO.notIT on 08.03.17.
 */
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(process.env.PWD, buildPath),
        filename: 'end.js',
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.IgnorePlugin(/vertx/),

        new ExtractTextPlugin({filename: 'end.css', allChunks: true}),

        new webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify(process.env.NODE_ENV || 'development'),
            VERSION: JSON.stringify(require('./package.json').version)
        }),

        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: false,
            drop_console: true,
            unsafe: true,
            warnings: false
        }),

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
                    'style',
                    'css',
                    'sass'
                ]
            },
            {
                exclude: /node_modules/,
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',

                    options: {
                        presets: ['stage-2', 'react'],

                        plugins: [
                            'transform-es2015-template-literals',
                            'transform-es2015-literals',
                            'transform-es2015-function-name',
                            'transform-es2015-arrow-functions',
                            'transform-es2015-block-scoped-functions',
                            'transform-es2015-classes',
                            'transform-es2015-object-super',
                            'transform-es2015-shorthand-properties',
                            'transform-es2015-computed-properties',
                            'transform-es2015-for-of',
                            'transform-es2015-sticky-regex',
                            'transform-es2015-unicode-regex',
                            'check-es2015-constants',
                            'transform-es2015-spread',
                            'transform-es2015-parameters',
                            'transform-es2015-destructuring',
                            'transform-es2015-block-scoping',
                            'transform-es2015-typeof-symbol',
                            ['transform-regenerator', {async: false, asyncGenerators: false}],
                        ],
                    }
                }

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
};
