const User = require('../models/User');

module.exports.login = function (req, res) {
};

module.exports.register = function (req, res) {
    const params = req.body;
    const user = new User({
       login: params.login,
       password: params.password
    });

    user.save().then((user) => console.log('user saved', user));

    res.send('done');
    return res;
};
