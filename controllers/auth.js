const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const codes = require('../data/code-statuses');
const User = require('../models/User');
const keys = require('../config/keys');

module.exports.login = async function (req, res) {
    if (req && req.body) {
        const login = req && req.body && req.body.login;
        const candidate = await User.findOne({ login });

        if (candidate) {
            loginUser(req, res, candidate);
        } else {
            res.status(codes.NOT_FOUND_CODE).json({
               message: 'No such user found'
            });
        }
    }
};

module.exports.register = async function (req, res) {
    if (req && req.body) {
        const login = req && req.body && req.body.login;
        const candidate = await User.findOne({ login });

        if (candidate) {
            res.status(codes.CONFLICT_CODE).json({
                message: 'Such a user with that email is already exists'
            });
        } else {
            await registerUser(req, res);
        }
    }
};


function loginUser(req, res, candidate) {
    const password = req.body.password;
    const isPasswordMatch = bcrypt.compareSync(password, candidate.password);

    console.log(isPasswordMatch);

    if (isPasswordMatch) {
        const token = jwt.sign({
            login: candidate.login,
            id: candidate._id
        }, keys.jwtCode, {
            expiresIn: '1h'
        });

        if (token) {
            res.status(codes.SUCCESS_CODE).json({
                token: `Bear ${token}`
            });
        } else {
            res.status(codes.NOT_FOUND_CODE).json({
                message: 'Something went wrong with database. Try again later'
            });
        }
    } else {
        res.status(codes.UNAUTHORIZED_CODE).json({
            message: 'Passwords do not match'
        });
    }

}

async function registerUser(req, res) {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;

    const user = new User({
        login: req.body.login,
        password: bcrypt.hashSync(password, salt)
    });

    try {
        await user.save();

        res.status(codes.CREATED_CODE).json(user);
    } catch (error) {
        console.log(error);
        res.status(codes.NOT_FOUND_CODE).json({
            message: 'Something went wrong with database. Try again later'
        });
    }
}
