require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = "giftdb";

async function checkGifts() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('gifts');

        // Find all gifts to see the structure
        const gifts = await collection.find({}).limit(3).toArray();
        console.log('First 3 gifts:');
        gifts.forEach((gift, index) => {
            console.log(`Gift ${index + 1}:`, gift);
        });

        // Find the lamp specifically
        const lamp = await collection.findOne({ name: /lamp/i });
        console.log('\nLamp gift:', lamp);

    } catch (error) {
        console.error('Error checking gifts:', error);
    } finally {
        await client.close();
    }
}

checkGifts();