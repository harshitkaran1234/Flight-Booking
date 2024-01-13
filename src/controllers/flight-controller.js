const { StatusCodes } = require('http-status-code');

const { FlightService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createFlight(req, res){
    try{
        const flight = await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            totalSeats: req.body.totalSeats,
            boardingGate: req.body.boardingGate,
        });
        SuccessResponse.data = flight;
        return res.status(200).json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
}