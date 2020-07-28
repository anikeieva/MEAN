module.exports.getAll = function (req, res) {
    res.status(200).json({
        login: 'from auth controller'
    });
};

module.exports.create = function (req, res) {
    res.status(200).json({
        register: 'from auth controller'
    });
};
