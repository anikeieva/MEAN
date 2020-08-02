const Category = require('../models/Category');
const Position = require('../models/Position');
const errorHandler = require('../utils/errorHandler');
const codes = require('../data/code-statuses');

module.exports.getAll = async function (req, res) {
    try {
        const categories = await Category.find({ user: req.user.id });

        res.status(codes.SUCCESS_CODE).json(categories);

    } catch (err) {
        errorHandler(res, err);
    }
};

module.exports.getById = async function (req, res) {
    try {
        const category = await Category.findById(req.params.id);

        res.status(codes.SUCCESS_CODE).json(category);

    } catch (err) {
        errorHandler(res, err);
    }
};

module.exports.remove = async function (req, res) {
    console.log(req.params.id);
    try {
        await Category.findByIdAndRemove(req.params.id);
        await Position.findOneAndDelete({ category: req.params.id });

        res.status(codes.SUCCESS_CODE).json({
           message: 'Category was removed'
        });

    } catch (err) {
        errorHandler(res, err);
    }
};

module.exports.create = async function (req, res) {
    try {
        const category = await new Category({
            name: req.body.name,
            user: req.user.id,
            imageSrc: req.file ? req.file.path : ''
        }).save();

        res.status(codes.CREATED_CODE).json(category);
    } catch (err) {
        errorHandler(res, err);
    }
};

module.exports.update = async function (req, res) {
    try {
        const updated = {
            name: req.body.name,
            imageSrc: req.file ? req.file.path : ''
        };
        const category = await Category.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updated },
            { new: true }
        );

        res.status(codes.SUCCESS_CODE).json(category);

    } catch (err) {
        errorHandler(res, err);
    }
};
