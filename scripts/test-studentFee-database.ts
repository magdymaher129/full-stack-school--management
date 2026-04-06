import "dotenv/config";
import prisma from "../lib/prisma";

async function testStudentFee() {
    console.log("🔍 Testing Prisma Student-Fee Relationship...\n");

    try {
        console.log("✅ Connected to database!");



       

        // 2. Create a test fee
    //     console.log("\n📝 Creating a fee...");
    //     const fee = await prisma.fee.create({
    //         data: {
    //             name: "Tuition Fee Q1",
    //             description: "Primary tuition fee for first quarter",
    //             amount: 1500.00,
    //         },
    //     });
    //     console.log("✅ Created fee:", fee.name);

    //     // 3. Link student to fee via StudentFee (The many-to-many join table)
    //     console.log("\n📝 Linking student to fee...");
    // }
    // catch(error){
    //     console.log(error);
    // }
        const studentFee = await prisma.studentFee.create({
            data: {
                studentId:2,
                feeId: 1,
                status: "PENDING",
            },
        });
        console.log("✅ Linked student to fee with status:", studentFee.status);

        // 4. Fetch student with fees
        console.log("\n📋 Fetching student with linked fees...");
        const studentWithFees = await prisma.student.findUnique({
            where: { id: 2 },
            include: {
                fees: {
                    include: {
                        fee: true
                    }
                }
            }
        });

        if (studentWithFees) {
            console.log(`✅ Student: ${studentWithFees.name}`);
            studentWithFees.fees.forEach(sf => {
                console.log(`   - Fee: ${sf.fee.name} (Amount: ${sf.fee.amount}, Status: ${sf.status})`);
            });
        }

        // 5. Fetch fee with students
        console.log("\n📋 Fetching fee with linked students...");
        const feeWithStudents = await prisma.fee.findUnique({
            where: { id: 1 },
            include: {
                students: {
                    include: {
                        student: true
                    }
                }
            }
        });

        if (feeWithStudents) {
            console.log(`✅ Fee: ${feeWithStudents.name}`);
            feeWithStudents.students.forEach(sf => {
                console.log(`   - Student: ${sf.student.name} (Status: ${sf.status})`);
            });
        }

        console.log("\n🎉 Many-to-many relationship tests passed!\n");
    } catch (error) {
        console.error("❌ Error:", error);
        process.exit(1);
    }
}

 testStudentFee();
