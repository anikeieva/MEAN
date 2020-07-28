module.exports.overview = function (req, res) {
    res.status(200).json({
        login: 'from auth controller'
    });
};

module.exports.analytics = function (req, res) {
    res.status(200).json({
        register: 'from auth controller'
    });
};
