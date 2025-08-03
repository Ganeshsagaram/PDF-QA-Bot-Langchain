require('dotenv').config(); // Load env variables
const { MongoClient } = require('mongodb');

const uri = process.env.ATLAS_URI;

async function listDatabases() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas!");

    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases in your cluster:");
    databasesList.databases.forEach(db => console.log(`- ${db.name}`));
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
    await client.close();
  }
}

listDatabases();
