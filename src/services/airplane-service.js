const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airplanRepository = new AirplaneRepository();

async function createAirplane(data) {
    try{
        const airplane = await airplanRepository.create(data);
        return airplane;
    } catch(error) {
        if(error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, 400);
        }
        throw new AppError('Cannot create a new airplane object', 500);
    }
}

async function getAllAirplanes() {
    try {
        const airplanes = await airplanRepository.getAll();
        return airplanes;
    } catch(err) {
        throw new AppError('Cannot fetch all airplanes data', 500);
    }
}

async function getAirplane(id){
    try{
        const airplane = await airplanRepository.get(id);
        return airplane;
    } catch(err) {
        if(err.statusCode === 404){
            throw new AppError(err.message, err.statusCode);
        }
        throw new AppError('Cannot fetch all airplanes data', 500);
    }
}

module.exports = {
    createAirplane,
    getAllAirplanes,  
    getAirplane,
}