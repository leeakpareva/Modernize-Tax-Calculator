require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = "giftdb";

async function updateLampImage() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('gifts');

        // Update the lamp gift (ID '875') to use 1.png
        const result = await collection.updateOne(
            { id: '875' },
            { $set: { image: '/images/1.png' } }
        );

        console.log(`Updated ${result.matchedCount} gift(s)`);
        console.log(`Modified ${result.modifiedCount} gift(s)`);

        // Verify the update
        const gift = await collection.findOne({ id: '875' });
        console.log('Updated lamp gift:', gift);

    } catch (error) {
        console.error('Error updating gift:', error);
    } finally {
        await client.close();
    }
}

updateLampImage();