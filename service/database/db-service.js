const { mongoClient } = require('mongodb')
const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.5"
const client = new mongoClient(url)

const getDataFromDb = async () => {
    const collection = await getCarsCollection();
    const output = await collection.find({}).toArray();
    console.log(output)
    return output;
}

const createDocument = async (reqBody) => {
    const collection = await getCarsCollection();
    const output = await collection.insertMany(reqBody)
    console.log(output);
    return output;
}

const getCarsCollection = async () => {
    const conn = await client.connect();
    const db = conn.db('mongodbVSCodeplaygroundDB');
    return db.collection('cars');
}
 
module.exports = {getDataFromDb,createDocument}


