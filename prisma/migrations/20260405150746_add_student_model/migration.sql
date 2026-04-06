/*
  Warnings:

  - You are about to drop the `_FeeToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FeeToStudent" DROP CONSTRAINT "_FeeToStudent_A_fkey";

-- DropForeignKey
ALTER TABLE "_FeeToStudent" DROP CONSTRAINT "_FeeToStudent_B_fkey";

-- AlterTable
ALTER TABLE "Fee" ADD COLUMN     "studentId" INTEGER;

-- DropTable
DROP TABLE "_FeeToStudent";

-- AddForeignKey
ALTER TABLE "Fee" ADD CONSTRAINT "Fee_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
