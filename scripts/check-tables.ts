import "dotenv/config";
import prisma from "../lib/prisma";

async function checkDatabase() {
    console.log("🔍 Checking database tables...\n");

    try {
        // Try to query the Teacher table to see if it exists
        const teachers = await prisma.$queryRaw`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `;
        
        console.log("Tables in database:");
        console.log(teachers);
        
    } catch (error) {
        console.error("❌ Error:", error);
    }
}

checkDatabase();
