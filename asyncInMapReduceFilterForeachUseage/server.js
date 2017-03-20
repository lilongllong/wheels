const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config.js');


var server = new WebpackDevServer(webpack(config), {
     publicPath: config.output.publicPath
}).listen(8079, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }
    console.log('Listening at localhost:8079');
});
