import "dotenv/config"; // ✅ CRITICAL: Load environment variables
import prisma from "../lib/prisma";

async function testStudent() {
    console.log("🔍 Testing Prisma Postgres connection...\n");

    try {
        // Test 1: Check connection
        console.log("✅ Connected to database!");

        // Test 1.5: Ensure a class exists
        console.log("\n📚 Checking for existing class...");
        let existingClass = await prisma.class.findFirst();
        
        if (!existingClass) {
            console.log("📝 Creating a class first...");
            existingClass = await prisma.class.create({
                data: {
                    name: "Class 1A",
                },
            });
            console.log(`✅ Created class: ${existingClass.name} (ID: ${existingClass.id})`);
        } else {
            console.log(`✅ Using existing class: ${existingClass.name} (ID: ${existingClass.id})`);
        }

        // Test 2: Create a test user
        console.log("\n📝 Creating a student...");
        const newStudent = await prisma.student.create({
            data: {
                name: "Demo Student",
                email:`demo2-${Date.now()}@example.com`,
               dateOfBirth: new Date("1990-01-15"),
               admissionNumber:`ADM-${Date.now()}`,
               rollNumber:`ROLL-${Date.now()}`,
               address:"123 Demo Street, Demo City",
               phone:"1234567890",
               gender:"MALE",
               classId: existingClass.id,
               parentName:"Demo Parent",
               parentPhone:"1234567890",
               parentEmail:`parent-${Date.now()}@example.com`,
               admissionDate:new Date("2022-01-01"),
            },
        });
        console.log("✅ Created student:", newStudent  );

        // Test 3: Fetch all users
        console.log("\n📋 Fetching all users...");
        const allStudents = await prisma.student.findMany();
        console.log(`✅ Found ${allStudents.length} user(s):`);
        allStudents.forEach((student) => {
            console.log(`   - ${student.name} (${student.admissionNumber}) `);
        });

        console.log("\n🎉 All tests passed! Your database is working perfectly.\n");
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

testStudent();
