const { AirportRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airportRepository = new AirportRepository();

async function createAirport(data) {
    try{
        const airport = await airportRepository.create(data);
        return airport;
    } catch(error) {
        if(error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, 400);
        }
        throw new AppError('Cannot create a new airport object', 500);
    }
}

async function getAllAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch(err) {
        throw new AppError('Cannot fetch all airports data', 500);
    }
}

async function getAirport(id){
    try{
        const airport = await airportRepository.get(id);
        return airport;
    } catch(err) {
        if(err.statusCode === 404){
            throw new AppError(err.message, err.statusCode);
        }
        throw new AppError('Cannot fetch all airports data', 500);
    }
}

async function deleteAirport(id){
    try{
        const response = await airportRepository.destroy(id);
        return response;
    } catch(err) {
        if(err.statusCode === 404){
            throw new AppError(err.message, err.statusCode);
        }
        throw new AppError('Cannot fetch all airports data', 500);
    }
}

module.exports = {
    createAirport,
    getAllAirports,  
    getAirport,
    deleteAirport,
}