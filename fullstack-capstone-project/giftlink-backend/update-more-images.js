require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = "giftdb";

async function updateMoreImages() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('gifts');

        // Update Curtain gift (ID '396') to use 2.png
        const curtainResult = await collection.updateOne(
            { id: '396' },
            { $set: { image: '/images/2.png' } }
        );

        // Update Bookshelf gift (ID '812') to use 3.png
        const bookshelfResult = await collection.updateOne(
            { id: '812' },
            { $set: { image: '/images/3.png' } }
        );

        console.log(`Updated Curtain: ${curtainResult.matchedCount} matched, ${curtainResult.modifiedCount} modified`);
        console.log(`Updated Bookshelf: ${bookshelfResult.matchedCount} matched, ${bookshelfResult.modifiedCount} modified`);

        // Verify the updates
        const curtain = await collection.findOne({ id: '396' });
        const bookshelf = await collection.findOne({ id: '812' });

        console.log('Updated Curtain:', curtain);
        console.log('Updated Bookshelf:', bookshelf);

    } catch (error) {
        console.error('Error updating gifts:', error);
    } finally {
        await client.close();
    }
}

updateMoreImages();