let config = {};

exports.get = function () {
    return config;
}

exports.set = function (newConfig) {
    config = {...config, ...newConfig};
}