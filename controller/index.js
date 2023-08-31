const {getDataFromDb, createDocument} = require('../service/database/db-service.js');

const gerCars = async (req,res) =>{
    console.log('yes')
    try{
        const response = await getDataFromDb();
        res.status(201).send (response);
    }
    catch(err){
        res.status(500).send(err)
    }
};

const createCars = async(req,res) =>{
    try{
        createDocument(req.body)
        res.status(200).json({ mssg: 'success'});
    }
    catch(err){
        res.status(500).send(err)
    }
};


module.exports = {gerCars,createCars}