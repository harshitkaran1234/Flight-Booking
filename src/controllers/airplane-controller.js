const { StatusCodes } = require('http-status-code');

const { AirplaneService } = require('../services');

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
        console.log(airplane,' ++++++++')
        return res.status(200).json({
            success: true,
            message: 'Successfully created an airplane',
            data: airplane,
            error: {}
        });
    } catch(error) {
        console.log(error, 'in error');
        return res.status(500).json({
            success: true,
            message: 'Something went wrong while creating airplane',
            data: {},
            error: error
        });
    }
}

module.exports = {
    createAirplane
}