import { MongoClient } from 'mongodb';

import { ATLAS_URI } from './env-config.js';

// connect to your Atlas deployment
const client = new MongoClient(ATLAS_URI);

async function run() {
   try {
     const database = client.db("learning_vector_embedding_db");
     const collection = database.collection("embeddings");
    
     // define your Atlas Vector Search index
     const index = {
         name: "vector_index",
         type: "vectorSearch",
         definition: {
           "fields": [
             {
               "type": "vector",
               "path": "embedding",
               "similarity": "dotProduct",
               "numDimensions": 768
             }
           ]
         }
     }
     // run the helper method
     const result = await collection.createSearchIndex(index);
     console.log(result);
   } finally {
     await client.close();
   }
}
run().catch(console.dir);