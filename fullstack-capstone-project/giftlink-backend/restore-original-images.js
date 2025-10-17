require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = "giftdb";

// Map gift names to their original image paths
const imageMapping = {
    'Lamp': '/images/lamp.jpeg',
    'Curtain': '/images/curtains1.jpeg',
    'Bookshelf': '/images/bookshelf1.jpeg',
    'Couch': '/images/couch2.jpeg',
    'Coffee Table': '/images/coffee-table.jpeg',
    'Desk Chair': '/images/desk-chair.jpeg',
    'Filing Cabinet': '/images/filing-cabinet.jpeg',
    'Office Desk': '/images/office-desk.jpeg',
    'Dining Table': '/images/dining-table.jpeg',
    'Bed Frame': '/images/bed-frame.jpeg',
    'Side Table': '/images/side-table.jpeg',
    'TV Stand': '/images/tv-stand.jpeg',
    'Laptop Stand': '/images/laptop-stand.jpeg'
};

async function restoreOriginalImages() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('gifts');

        // Get all gifts to see what needs updating
        const allGifts = await collection.find({}).toArray();
        console.log(`\nFound ${allGifts.length} gifts in database`);

        let updateCount = 0;

        // Update each gift with its correct image path
        for (const [giftName, imagePath] of Object.entries(imageMapping)) {
            // Find all gifts with this name
            const gifts = allGifts.filter(g => g.name === giftName);

            if (gifts.length === 0) {
                console.log(`⚠️  No gifts found with name: ${giftName}`);
                continue;
            }

            // Handle multiple instances (e.g., bookshelf1, bookshelf2, bookshelf3)
            for (let i = 0; i < gifts.length; i++) {
                const gift = gifts[i];
                let correctPath = imagePath;

                // For items with multiple instances, use numbered versions
                if (gifts.length > 1) {
                    if (giftName === 'Bookshelf') {
                        correctPath = `/images/bookshelf${i + 1}.jpeg`;
                    } else if (giftName === 'Curtain') {
                        correctPath = `/images/curtains${i + 1}.jpeg`;
                    }
                }

                const result = await collection.updateOne(
                    { _id: gift._id },
                    { $set: { image: correctPath } }
                );

                if (result.modifiedCount > 0) {
                    console.log(`✅ Updated ${giftName} (ID: ${gift.id}) -> ${correctPath}`);
                    updateCount++;
                }
            }
        }

        console.log(`\n✨ Successfully updated ${updateCount} gift images to original paths`);

        // Show final state
        console.log('\n📋 Final image paths:');
        const updatedGifts = await collection.find({}).sort({ name: 1 }).toArray();
        updatedGifts.forEach(gift => {
            console.log(`  ${gift.name} (ID: ${gift.id}): ${gift.image}`);
        });

    } catch (error) {
        console.error('❌ Error restoring images:', error);
    } finally {
        await client.close();
    }
}

restoreOriginalImages();
