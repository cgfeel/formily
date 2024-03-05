// https://stackoverflow.com/a/71280203/4815301
/*const webpack = require('webpack');

module.exports = function override(config) {
    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "os": require.resolve("os-browserify"),
        "url": require.resolve("url")
    })
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    ])
    
    return config;
}*/

// plugin: https://stackoverflow.com/a/76157892/4815301
// eslint: https://github.com/arackaf/customize-cra/issues/175#issuecomment-547849059

const { addWebpackPlugin, override, fixBabelImports } = require('customize-cra');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = override(
    addWebpackPlugin(new NodePolyfillPlugin({
        excludeAliases: ['console'],
    })),
    fixBabelImports('antd', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    fixBabelImports('@formily/antd', {
        libraryName: '@formily/antd',
        libraryDirectory: 'esm',
        style: true
    }),
)
