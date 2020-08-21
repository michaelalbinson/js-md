'use strict';

const path = require('path');


module.exports = [
    'source-map'
].map(devtool => ({
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'js_md'
    },
    devtool,
    mode: "production"
}));
