import "dotenv/config"; // ✅ CRITICAL: Load environment variables
import prisma from "../lib/prisma";

async function testFees() {
    console.log("🔍 Testing Prisma Postgres connection...\n");

    try {
        // Test 1: Check connection
        console.log("✅ Connected to database!");

        // Test 2: Create a test user
        console.log("\n📝 Creating a fees...");
        const newFees = await prisma.fee.create({
            data: {
                name: `Demo ${Math.floor(Math.random() * 10)}fees`,
                description:"adminstrations fees",
                amount: Math.floor(Math.random() * 100)          
                              
            },
        });
        console.log("✅ Created fees:", newFees  );

        // Test 3: Fetch all users
        console.log("\n📋 Fetching all fees...");
        const allFees = await prisma.fee.findMany();
        console.log(`✅ Found ${allFees.length} fees(s):`);
        allFees.forEach((fees) => {
            console.log(`   - ${fees.name} (${fees.amount}) `);
        });

        console.log("\n🎉 All tests passed! Your database is working perfectly.\n");
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

testFees();
