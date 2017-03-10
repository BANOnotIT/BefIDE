#!/usr/bin/env node
'use strict';


process.title = "NODE_DEV_SERVER";

const
    WebpackDevServer = require('webpack-dev-server'),
    webpack = require('webpack'),
    express = require('express'),
    proxy = require('proxy-middleware'),
    url = require('url'),
    fs = require('fs'),
    path = require('path'),


    config = require('./webpack.dev'),
    publicPath = 'dist',
    port = process.env.SERVER_PORT || 3000,
    webpackPort = process.env.WEBPACK_PORT || 3001;


let app = express();


app.use(
    '/' + publicPath,
    proxy(url.parse('http://127.0.0.1:' + webpackPort + '/' + publicPath))
);

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

let server = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    stats: {colors: true}
});

server.listen(webpackPort, function (err) {
    if (err) {
        return console.log(err);
    }
    app.listen(port, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('Listening at http://0.0.0.0:%d', port);
    });
});