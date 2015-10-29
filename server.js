"use strict"
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var path = require('path');

var server = new WebpackDevServer(webpack(config), {
      publicPath: config.output.publicPath,
      hot: true,
      historyApiFallback: true
});

server.use('/', function(req, res){
      res.sendFile(path.join(__dirname, '/index.html'));
});

server.listen(8080, 'localhost', function (err) {
      if (err) {
              console.log(err);
                }
        console.log('Listening at localhost:8080');
});
