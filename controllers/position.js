const errorHandler = require('../utils/errorHandler');
const Position = require('../models/Position');
const codes = require('../data/code-statuses');

module.exports.getByCategoryId = async function (req, res) {
    try {
        const positions = await Position.find({
            category: req.params.categoryId,
            user: req.user.id
        });

        res.status(codes.SUCCESS_CODE).json(positions);
    } catch (err) {
        errorHandler(res, err);
    }
};

module.exports.create = async function (req, res) {
    try {
        const { name, cost, category } = req.body;

        const position = await new Position({
            name,
            cost,
            category,
            user: req.user.id
        }).save();

        res.status(codes.CREATED_CODE).json(position);

    } catch (err) {
        errorHandler(res, err);
    }
};

module.exports.update = async function (req, res) {
    try {
        const position = await Position.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );

        res.status(codes.SUCCESS_CODE).json(position);

    } catch (err) {
        errorHandler(res, err);
    }
};

module.exports.remove = async function (req, res) {
    try {
        await Position.remove({
           _id: req.params.id
        });

        res.status(codes.SUCCESS_CODE).json({
           message: 'Position was removed'
        });
    } catch (err) {
        errorHandler(res, err);
    }
};
