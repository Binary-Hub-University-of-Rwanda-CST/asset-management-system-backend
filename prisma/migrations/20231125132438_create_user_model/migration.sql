/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_martial_status` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_names` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_nationality` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_nid` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "user_code" TEXT,
ADD COLUMN     "user_email" TEXT NOT NULL,
ADD COLUMN     "user_gender" TEXT NOT NULL,
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD COLUMN     "user_img" TEXT,
ADD COLUMN     "user_martial_status" TEXT NOT NULL,
ADD COLUMN     "user_names" TEXT NOT NULL,
ADD COLUMN     "user_nationality" TEXT NOT NULL,
ADD COLUMN     "user_nid" TEXT NOT NULL,
ADD COLUMN     "user_password" TEXT NOT NULL,
ADD COLUMN     "user_phone" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");
