const { AirplaneRepository } = require('../repositories');

const airplanRepository = new AirplaneRepository();

async function createAirplane(data) {
    try{
        const airplane = await airplanRepository.create(data);
        return airplane;
    } catch(error) {
        throw error;
    }
}

module.exports = {
    createAirplane  
}