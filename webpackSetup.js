var webpack = require('webpack');

exports.compilerConfiguration = {
    cache: true,
    entry:'./app_client/webpackTest.js',
    output: {
        path: __dirname + '/public/javascripts',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({
            riot: 'riot'
        })
    ],
    module: {
        preLoaders: [
            {
                test: /\.tag$/,
                exclude: /node_modules/,
                loader: 'riotjs-loader',
                query: { type: 'none' }
            }
        ],
        loaders: [
            {
                test: /\.js|\.tag$/,
                include: /src/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: { modules: 'common' }
            },
            {
                test: /\.less$/,
                include: /src/,
                exclude: /node_modules/,
                loader: 'style!css!less'
            }
        ]
    },
    progress: true
};

exports.trackProgress = function (compiler) {
    var bundleStart = null;
    compiler.plugin('compile', function() {
        log('Webpack bundling...');
        bundleStart = Date.now();
    });
    compiler.plugin('done', function() {
        log('Webpack bundled in ' + (Date.now() - bundleStart) + 'ms!', 'green');
    });
};

exports.watchOptions = {
    aggregateTimeout: 300
};

exports.errorHandler = function (err, stats) {
    if (err) {
        log('Webpack FATAL ERROR:', 'red');
        log(err, 'red');
    }

    var jsonStats = stats.toJson();
    var i, l;
    for (i=0, l=jsonStats.errors.length; i < l; i++) {
        log('Webpack soft ERROR:', 'red');
        log(jsonStats.errors[i], 'red');
    }
    for (i=0, l=jsonStats.warnings.length; i < l; i++) {
        log('Webpack WARNING:', 'yellow');
        log(jsonStats.errors[i], 'yellow');
    }
};


// Nice logging
var colorMap = { red: '\x1b[31m', yellow: '\x1b[33m', green: '\x1b[32m' };
var timezoneOffset = (new Date().getTimezoneOffset()) * 60 * 1000;

function log(msg, color) {
    var date = new Date(Date.now() - timezoneOffset);
    var timestamp = date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var colorStr = colorMap[color] || '';
    console.log(colorStr, timestamp, msg, '\x1b[0m');
}

// A more advanced Webpack setup can be found here:
//   https://github.com/christianalfoni/webpack-express-boilerplate