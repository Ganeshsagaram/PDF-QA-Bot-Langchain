
import { MongoClient } from 'mongodb';
import { ATLAS_URI } from './env-config.js';



async function check_indexes(){
    const client = new MongoClient(ATLAS_URI);
    var results=[]
    var mapped_results
    try{
        await client.connect();
        const database = await client.db("learning_vector_embedding_db");
        const collection = await database.collection("embeddings");
        const indexes = await collection.listSearchIndexes().toArray()
        results.push(indexes);
    }catch(err){
        console.log(err)
        
    }
    finally {
     await client.close();
   }
// console.log(results[0])

mapped_results=results[0].map(index => ({
  name: index.name,
  type: index.type,
  status: index.status,
  canQuery:index.queryable
}));
console.log(mapped_results)
}


check_indexes()

