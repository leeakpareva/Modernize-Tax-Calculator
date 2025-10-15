require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = "giftdb";

async function assignImages8to16() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('gifts');

        // First, let's see all gifts and their current image status
        const allGifts = await collection.find({}).toArray();
        console.log(`Total gifts found: ${allGifts.length}`);

        // Show current image assignments
        console.log('\nCurrent image assignments:');
        allGifts.forEach(gift => {
            console.log(`${gift.name} (ID: ${gift.id}): ${gift.image || 'NO IMAGE'}`);
        });

        // Find gifts without images
        const giftsWithoutImages = allGifts.filter(gift => !gift.image);
        console.log(`\nGifts without images: ${giftsWithoutImages.length}`);

        // Define the image assignments for images 8-16
        const imageAssignments = [
            '/images/8.png',
            '/images/9.png',
            '/images/10.png',
            '/images/11.png',
            '/images/12.png',
            '/images/13.png',
            '/images/14.png',
            '/images/15.png',
            '/images/16.png'
        ];

        // Assign images to gifts without images
        const updatePromises = [];
        let imageIndex = 0;

        for (const gift of giftsWithoutImages) {
            if (imageIndex < imageAssignments.length) {
                const updatePromise = collection.updateOne(
                    { id: gift.id },
                    { $set: { image: imageAssignments[imageIndex] } }
                );
                updatePromises.push(updatePromise);
                console.log(`Assigning ${imageAssignments[imageIndex]} to ${gift.name} (ID: ${gift.id})`);
                imageIndex++;
            }
        }

        // Execute all updates
        const results = await Promise.all(updatePromises);

        console.log('\nUpdate results:');
        results.forEach((result, index) => {
            console.log(`Update ${index + 1}: ${result.matchedCount} matched, ${result.modifiedCount} modified`);
        });

        // Verify all updates
        const updatedGifts = await collection.find({}).toArray();
        console.log('\nFinal image assignments:');
        updatedGifts.forEach(gift => {
            console.log(`${gift.name} (ID: ${gift.id}): ${gift.image || 'NO IMAGE'}`);
        });

        // Count total gifts with images
        const giftsWithImages = updatedGifts.filter(gift => gift.image);
        console.log(`\nTotal gifts with images: ${giftsWithImages.length}/${updatedGifts.length}`);

    } catch (error) {
        console.error('Error assigning images:', error);
    } finally {
        await client.close();
    }
}

assignImages8to16();