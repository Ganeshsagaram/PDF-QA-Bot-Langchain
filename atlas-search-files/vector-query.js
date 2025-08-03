import { MongoClient } from 'mongodb';
import getEmbedding from "./get-Embeddings.js";
import { ATLAS_URI } from './env-config.js';

// MongoDB connection URI and options
const client = new MongoClient(ATLAS_URI);

async function run() {
    try {
        // Connect to the MongoDB client
        await client.connect();

        // Specify the database and collection
        const database = client.db("learning_vector_embedding_db"); 
        const collection = database.collection("embeddings"); 

        // Generate embedding for the search query
        const queryEmbedding = await getEmbedding("Lion,cheetha,Tiger");

        // Define the sample vector search pipeline
        const pipeline = [
            {
                $vectorSearch: {
                    index: "vector_index",
                    queryVector: queryEmbedding,
                    path: "embedding",
                    exact: true,
                    limit:3
                }
            },
            {
                $project: {
                    _id: 0,
                    text: 1,
                    score: {
                        $meta: "vectorSearchScore"
                    }
                }
            }
        ];

        // run pipeline
        const result = await collection.aggregate(pipeline).toArray();
        result.sort((a,b)=>{
            a.score>b.score
        })
        // print results
        console.log(result)
        // for await (const doc of result) {
        //     console.dir(JSON.stringify(doc));
        // }
        } finally {
        await client.close();
    }
}
run().catch(console.dir);