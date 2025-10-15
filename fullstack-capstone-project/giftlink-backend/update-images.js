require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = "giftdb";

async function updateGiftImage() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('gifts');

        // Update the lamp gift (ID 1) to include image path
        const result = await collection.updateOne(
            { id: 1 },
            { $set: { image: '/images/1.png' } }
        );

        console.log(`Updated ${result.matchedCount} gift(s)`);
        console.log(`Modified ${result.modifiedCount} gift(s)`);

        // Verify the update
        const gift = await collection.findOne({ id: 1 });
        console.log('Updated gift:', gift);

    } catch (error) {
        console.error('Error updating gift:', error);
    } finally {
        await client.close();
    }
}

updateGiftImage();