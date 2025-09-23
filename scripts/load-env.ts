// This script preloads the environment variables from .env.local
// to ensure they are available before any application code runs.
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
