const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data) {
    try{
        const city = await cityRepository.create(data);
        return city;
    } catch(error) {
        if(error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
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
    createCity,
}