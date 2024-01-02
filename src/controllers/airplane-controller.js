const { StatusCodes } = require('http-status-code');

const { AirplaneService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

 /**
  * POST: /airplanes
  * req-body {modelNumber: 'airbus320', capacity: 200}
  */
async function createAirplane(req, res){
    try{
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
        return res.status(200).json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAllAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAllAirplanes();
        SuccessResponse.data = airplanes;
        return res.status(200).json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirplane(req, res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res.status(200).json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function deleteAirplane(req, res) {
    try {
        const response = await AirplaneService.deleteAirplane(req.params.id);
        SuccessResponse.data = response;
        return res.status(200).json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createAirplane,
    getAllAirplanes,
    getAirplane,
    deleteAirplane,
}