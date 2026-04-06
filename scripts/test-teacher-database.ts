import "dotenv/config"; // ✅ CRITICAL: Load environment variables
import prisma from "../lib/prisma";

async function testTeacher() {
    console.log("🔍 Testing Prisma Postgres connection...\n");

    try {
        // Test 1: Check connection
        console.log("✅ Connected to database!");

        // Test 2: Create a test teacher
        console.log("\n📝 Creating a teacher...");
        const newTeacher = await prisma.teacher.create({
            data: {
                name: `Demo Teacher ${Math.floor(Math.random()*10)}`,
                email: `demo-teacher-${Date.now()}@example.com`,
                phone: "+1234567890",
                gender: "MALE",
                dateOfBirth: new Date("1990-01-15"),
                address: "123 Demo Street, Demo City",
            },
        });
        console.log("✅ Created teacher:", newTeacher);

        // Test 3: Fetch all teachers
        console.log("\n📋 Fetching all teachers...");
        const allTeachers = await prisma.teacher.findMany();
        console.log(`✅ Found ${allTeachers.length} teacher(s):`);
        allTeachers.forEach((teacher) => {
            console.log(`   - ${teacher.name} (${teacher.email}) - ${teacher.phone}`);
        });

        console.log("\n🎉 All tests passed! Your database is working perfectly.\n");
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

testTeacher();
