const { StatusCodes } = require('http-status-code');

const { CityService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createCity(req, res) {
    try{
        const city = await CityService.createCity({
            name: req.body.name,
        });
        SuccessResponse.data = city;
        return res.status(200).json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createCity
}