require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URL;
const dbName = "giftdb";

async function checkDuplicates() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('gifts');

        // Find all gifts to see the structure
        const gifts = await collection.find({}).toArray();
        console.log(`Total gifts found: ${gifts.length}`);

        // Group by name to find duplicates
        const nameGroups = {};
        gifts.forEach(gift => {
            if (!nameGroups[gift.name]) {
                nameGroups[gift.name] = [];
            }
            nameGroups[gift.name].push(gift);
        });

        console.log('\nGift counts by name:');
        Object.keys(nameGroups).forEach(name => {
            const count = nameGroups[name].length;
            console.log(`${name}: ${count} ${count > 1 ? '(DUPLICATE!)' : ''}`);
            if (count > 1) {
                nameGroups[name].forEach((gift, index) => {
                    console.log(`  ${index + 1}. ID: ${gift.id}, Description: ${gift.description.substring(0, 50)}...`);
                });
            }
        });

        // Show all Bookshelf entries specifically
        const bookshelves = await collection.find({ name: 'Bookshelf' }).toArray();
        console.log('\nAll Bookshelf entries:');
        bookshelves.forEach((bookshelf, index) => {
            console.log(`${index + 1}. ID: ${bookshelf.id}, Category: ${bookshelf.category}, ZIP: ${bookshelf.zipcode}`);
            console.log(`   Description: ${bookshelf.description}`);
            console.log(`   Image: ${bookshelf.image}`);
            console.log('');
        });

    } catch (error) {
        console.error('Error checking duplicates:', error);
    } finally {
        await client.close();
    }
}

checkDuplicates();