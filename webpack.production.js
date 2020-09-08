const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        runtimeChunk: false,
        minimize: true,
        minimizer: [new OptimizeCssAssetsPlugin({
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }), new TerserPlugin({
            sourceMap: true,
        })]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'static'), to: `${path.resolve(__dirname, 'dist')}/static` },
                { from: "netlify.toml", to: `${path.resolve(__dirname, 'dist')}` },
            ],
        }),
    ]
});