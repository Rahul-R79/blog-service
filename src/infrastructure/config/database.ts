import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.SUPABASE_DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

export async function ConnectDB() {
    let retries = 0;
    while (retries < MAX_RETRIES) {
        try {
            await prisma.$connect();
            console.log('db is connected');
            return;
        } catch (err) {
            retries++;
            console.error(`Database connection failed (attempt ${retries}/${MAX_RETRIES}), retrying...`, err);
            if (retries >= MAX_RETRIES) {
                console.error('Could not connect to database after maximum retries', err);
                process.exit(1);
            }
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
    }
}
