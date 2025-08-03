
import { pipeline } from '@xenova/transformers';

// Function to generate embeddings for a given data source
// const data="Avatar: A marine is dispatched to the moon Pandora on a unique mission"

export default async function getEmbedding(data) {
    const embedder = await pipeline(
        'feature-extraction', 
        'Xenova/nomic-embed-text-v1');
    // console.log(embedder)
    const results = await embedder(data, { pooling: 'mean', normalize: true });
    // console.log(results.data)
    return Array.from(results.data);
}

// getEmbedding(data);
