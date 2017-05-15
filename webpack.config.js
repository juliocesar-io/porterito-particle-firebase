const path = require('path')
const webpack = require('webpack')

module.exports = {
    context: path.resolve(__dirname, 'app'),
    entry: [
        './listener.js',
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: 'bundle.js',
        hot: true
    },
    resolveLoader: {
        root: path.resolve(__dirname, 'node_modules')
    },
    module: {
        loaders: [
            {
                test: /\.js$/, exclude: /(node_modules|bower_components)/,
                include: path.resolve(__dirname, 'app'),
                loader: 'babel',
                query: {presets: ['es2015']}
            },
            {test: /\.css$/, loader: 'style!css'},
            {test: /\json$/, loader: 'json'},
            {test: /\.html$/, loader: 'file'},
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    devServer: {
        inline: true
    },
    compress :true,
    // plugins: [
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: { warnings: false }
    //     })
    // ]
}
