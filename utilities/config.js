let config = {
    updateMode: false,
    useFairies: true,
    tapEquipment: false,
};

exports.get = function () {
    return config;
}

exports.set = function (newConfig) {
    config = {...config, ...newConfig};
}
