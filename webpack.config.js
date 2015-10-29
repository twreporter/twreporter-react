var path = require('path');
var webpack = require('webpack');
var plugins = [];
var entries = [ './src/index' ];
var loaders = [ 'babel?stage=0' ];

if (/production/.test(process.env.NODE_ENV)) {
    plugins = [
        new ExtractTextPlugin("styles.css"),
        new StaticSiteGeneratorPlugin('bundle.js', []),
        new webpack.optimize.UglifyJsPlugin()];
}
else if (!/staging/.test(process.env.NODE_ENV)) {
    plugins = [ new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin() ];
    entries.push('webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server');
    loaders.unshift('react-hot');

}
module.exports = {
    devtool: 'eval',
    entry: entries,
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/',
        libraryTarget: 'umd'
    },
    plugins: plugins,
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
                loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: loaders,
                    include: path.join(__dirname, 'src'),
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    loader: (/production/.test(process.env.NODE_ENV)) ?
                        ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader') :
                        'style-loader!css-loader!postcss-loader'
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    loader: 'url-loader?limit=1'
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                }
                ]
            }
};
