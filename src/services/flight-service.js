const { FlightRepository } = require('../repositories');
const { Op } = require('sequelize');
const AppError = require('../utils/errors/app-error');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try{
        const flight = await flightRepository.create(data);
        return flight;
    } catch(error) {
        if(error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, 400);
        }
        throw new AppError('Cannot create a new flight object', 500);
    }
}

async function getAllFlights(query) {
    const filter = {};
    let sortFilter = [];
    if(query.trips) {
        const [ departureAirportId, arrivalAirportId ] = query.trips.split('-');
        filter.departureAirportId = departureAirportId;
        filter.arrivalAirportId = arrivalAirportId;
    }

    if(query.price) {
        const [ minPrice, maxPrice ] = query.price.split('-');
        filter.price = {
            [ Op.between ] : [minPrice, maxPrice ? maxPrice : 20000]
        }
    }

    if(query.travellers) {
        filter.totalSeats = {
            [ Op.gte ] : query.travellers
        }
    }

    if(query.tripDate) {
        filter.departureTime = {
            [Op.between] : [query.tripDate, query.tripDate + " 23:59:00"]
        }
    }

    if(query.sort) {
        const params = query.sort.split(',');
        sortFilter = params.map((param) => param.split('_'));
    }

    try {
        const flights = await flightRepository.getAllFlights(filter, sortFilter);
        return flights;
    } catch(err) {
        throw new AppError('Cannot fetch all filghts for given data', 500);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
}