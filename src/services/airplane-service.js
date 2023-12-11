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

module.exports = {
    createAirplane  
}