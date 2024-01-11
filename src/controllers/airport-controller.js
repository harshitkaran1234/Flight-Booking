const { StatusCodes } = require('http-status-code');

const { AirportService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


async function createAirport(req, res){
    try{
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId,
        });
        SuccessResponse.data = airport;
        return res.status(200).json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAllAirports(req, res) {
    try {
        const airports = await AirportService.getAllAirports();
        SuccessResponse.data = airports;
        return res.status(200).json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport;
        return res.status(200).json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function deleteAirport(req, res) {
    try {
        const response = await AirportService.deleteAirport(req.params.id);
        SuccessResponse.data = response;
        return res.status(200).json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirport,
    getAllAirports,
    getAirport,
    deleteAirport,
}