require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = "giftdb";

async function replaceWithImages8to16() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('gifts');

        // Define specific gift updates with images 8-16
        const updates = [
            { name: 'Coffee Table', image: '/images/8.png' },
            { name: 'Laptop Stand', image: '/images/9.png' },
            { name: 'Dining Table', image: '/images/10.png' },
            { name: 'Couch', image: '/images/11.png' },
            { name: 'Office Desk', image: '/images/12.png' },
            { name: 'TV Stand', image: '/images/13.png' },
            { name: 'Bed Frame', image: '/images/14.png' },
            { name: 'Side Table', image: '/images/15.png' },
            { name: 'Filing Cabinet', image: '/images/16.png' }
        ];

        console.log('Updating gifts with images 8-16:');

        for (const update of updates) {
            const result = await collection.updateOne(
                { name: update.name },
                { $set: { image: update.image } }
            );

            console.log(`Updated ${update.name} with ${update.image}: ${result.matchedCount} matched, ${result.modifiedCount} modified`);
        }

        // Verify all updates
        console.log('\nVerifying updates:');
        for (const update of updates) {
            const gift = await collection.findOne({ name: update.name });
            if (gift) {
                console.log(`${gift.name} (ID: ${gift.id}): ${gift.image}`);
            }
        }

        // Show all current assignments
        console.log('\nAll current image assignments:');
        const allGifts = await collection.find({}).sort({ id: 1 }).toArray();
        allGifts.forEach(gift => {
            console.log(`${gift.name} (ID: ${gift.id}): ${gift.image}`);
        });

    } catch (error) {
        console.error('Error updating images:', error);
    } finally {
        await client.close();
    }
}

replaceWithImages8to16();