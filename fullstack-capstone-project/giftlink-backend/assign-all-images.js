require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = "giftdb";

async function assignAllImages() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('gifts');

        // Update the second Curtain with 4.png
        const curtain2 = await collection.updateOne(
            { id: '386' },
            { $set: { image: '/images/4.png' } }
        );

        // Update the second Bookshelf with 5.png
        const bookshelf2 = await collection.updateOne(
            { id: '419' },
            { $set: { image: '/images/5.png' } }
        );

        // Update the third Bookshelf with 6.png
        const bookshelf3 = await collection.updateOne(
            { id: '420' },
            { $set: { image: '/images/6.png' } }
        );

        // Let's also assign 7.png to another gift (Desk Chair)
        const deskChair = await collection.updateOne(
            { name: 'Desk Chair' },
            { $set: { image: '/images/7.png' } }
        );

        console.log(`Updated second Curtain (ID 386): ${curtain2.matchedCount} matched, ${curtain2.modifiedCount} modified`);
        console.log(`Updated second Bookshelf (ID 419): ${bookshelf2.matchedCount} matched, ${bookshelf2.modifiedCount} modified`);
        console.log(`Updated third Bookshelf (ID 420): ${bookshelf3.matchedCount} matched, ${bookshelf3.modifiedCount} modified`);
        console.log(`Updated Desk Chair: ${deskChair.matchedCount} matched, ${deskChair.modifiedCount} modified`);

        // Verify all updates
        const updatedGifts = await collection.find({
            $or: [
                { id: '386' },
                { id: '419' },
                { id: '420' },
                { name: 'Desk Chair' }
            ]
        }).toArray();

        console.log('\nUpdated gifts:');
        updatedGifts.forEach(gift => {
            console.log(`${gift.name} (ID: ${gift.id}): ${gift.image}`);
        });

    } catch (error) {
        console.error('Error assigning images:', error);
    } finally {
        await client.close();
    }
}

assignAllImages();