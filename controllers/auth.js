module.exports.login = function (req, res) {
    baseAuth(req, res, 'login');
};

module.exports.register = function (req, res) {
   baseAuth(req, res, 'register');
};

function baseAuth(req, res, param) {
    const params = req.body;

    if (params) {
        res.status(200).json({
            [param]: {
                login: params.login,
                password: params.password
            }
        });
    } else {
        res.status(401)
    }
}
