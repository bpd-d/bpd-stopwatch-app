const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        noInfo: false,
        host: 'bartoszpc',
        port: 9000

    },
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
});