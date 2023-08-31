const { MongoClient } = require('mongodb');

const url = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url);

async function setupDatabase() {
    try {
        await client.connect();
        const db = client.db('your_database_name');

        const carsCollection = db.collection('car');
        const purchasesCollection = db.collection('purchase');

        const carsData = [
            {
                brand: 'BMW',
                model: 'X5',
                carId: 23445,
                price: 10000000,
                status: 'AVAILABLE'
            },
            {
                brand: 'Hyundai',
                model: 'Grand i10',
                carId: 234452,
                price: 1200000,
                status: 'AVAILABLE'
            }
        ];

        const purchasesData = [
            {
                orderId: '1000',
                brand: 'BMW',
                model: 'X5',
                carId: 23445,
                price: 10000000,
                orderDate: '15/04/2023'
            }
        ];

        await carsCollection.insertMany(carsData);
        await purchasesCollection.insertMany(purchasesData);

        console.log('Sample data inserted successfully.');
    } catch (error) {
        console.error('Error inserting sample data:', error);
    } finally {
        await client.close();
    }
}

setupDatabase();



///const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const url = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(url);

app.use(express.json());

app.get('/api/car/get', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('your_database_name');
        const collection = db.collection('car');
        const cars = await collection.find({ status: 'AVAILABLE' }).toArray();
        res.json(cars);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});

app.post('/api/car/purchase', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('your_database_name');
        const carsCollection = db.collection('car');
        const purchasesCollection = db.collection('purchase');

        const { brand, model, carId } = req.body;
        const orderDate = new Date().toLocaleDateString();

        const purchaseDocument = {
            orderId: '1001', // Generate a unique order ID
            brand,
            model,
            carId,
            price: 0, // You need to retrieve the price from the car collection
            orderDate
        };

        await purchasesCollection.insertOne(purchaseDocument);
        await carsCollection.updateOne({ carId }, { $set: { status: 'SOLD' } });

        res.json({ message: `Thank you for purchasing (${brand} ${model})` });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});

app.get('/api/car/query', async (req, res) => {
    try {
        await client.connect();
        const db = client.db('your_database_name');
        const collection = db.collection('car');
        const soldCars = await collection.find({ status: 'SOLD' }).toArray();
        res.json(soldCars);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});