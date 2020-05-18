const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const argv = require('yargs').argv;
const polyfill = [];

const sourceMap = process.env.NODE_ENV === 'dev';
const umd = {
    entry: polyfill.concat(['./src/index.js']),
    output: {
        path: `${__dirname}/dist`,
        filename: 'index.js',
        library: 'xgplayer-contentprotect-service',
        libraryTarget: 'umd',
        chunkFilename: '[name].[chunkhash:8].bundle.js',
        publicPath: ''
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    externals: {
    },
    node: {
        fs: 'empty',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                test: [/\.(js|jsx)$/],
                exclude: [/node_modules/],
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        inline: 1,
                        keep_fnames: true
                    },
                    mangle: {
                        keep_fnames: true
                    }
                }
            })
        ],
        splitChunks: {
            chunks: 'async',
            automaticNameDelimiter: '.',
            cacheGroups: {
                vendors: false,
                default: false
            }
        },
        chunkIds: 'named',
        moduleIds: 'hashed'
    },

};
argv.analyze && (umd.plugins = [new BundleAnalyzerPlugin()]);
const client = {
    entry: polyfill.concat(['./src/index.js']),
    output: {
        path: `${__dirname}/browser`,
        filename: 'index.js',
        library: 'XgplayerContentprotectService',
        libraryTarget: 'window',
        chunkFilename: '[name].[chunkhash:8].bundle.js',
        publicPath: ''
    },
    devtool: sourceMap ? 'source-map' : 'none',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    externals: {
    },
    mode: 'production',
    node: {
        fs: 'empty',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                test: [/\.(js|jsx)$/],
                exclude: [/node_modules/],
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        inline: 1,
                        keep_fnames: true
                    },
                    mangle: {
                        keep_fnames: true
                    }
                }
            })
        ],
        splitChunks: {
            chunks: 'async',
            automaticNameDelimiter: '.',
            cacheGroups: {
                vendors: false,
                default: false
            }
        },
        chunkIds: 'named',
        moduleIds: 'hashed'
    }
};

module.exports = [umd, client];
