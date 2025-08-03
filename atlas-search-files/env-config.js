// config/env-config.js
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from parent directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });


// Export env vars as constants or object
export  const ATLAS_URI = process.env.ATLAS_URI;

// console.log(ATLAS_URI);
