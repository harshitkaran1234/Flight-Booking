const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if(!req.body.name) {
        ErrorResponse.message = 'Something went wrong while creating city';
        ErrorResponse.error = new AppError(['name not found in the incoming req'], 400);
        return res
                .status(400)
                .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}