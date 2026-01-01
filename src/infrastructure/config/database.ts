import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.SUPABASE_DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

export async function ConnectDB() {
    try {
        await prisma.$connect();
        console.log('db is connected');
    } catch (err) {
        console.error('database connection failed');
        process.exit(1);
    }
}
