const codes = require('../data/code-statuses');

module.exports = (res, err) => {
    console.log(err);
    res.status(codes.INTERNAL_SERVER_ERROR_CODE).json({
        success: false,
        message: err.message ? err.message : err
    });
};
