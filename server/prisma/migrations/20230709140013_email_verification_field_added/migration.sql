-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "completedDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email_verified_at" TIMESTAMP(3);
