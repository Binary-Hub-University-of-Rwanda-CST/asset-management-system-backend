/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_code` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_img` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_martial_status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_names` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_nationality` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_nid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_phone` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `martial_status` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `names` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nid` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_user_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "user_code",
DROP COLUMN "user_email",
DROP COLUMN "user_gender",
DROP COLUMN "user_id",
DROP COLUMN "user_img",
DROP COLUMN "user_martial_status",
DROP COLUMN "user_names",
DROP COLUMN "user_nationality",
DROP COLUMN "user_nid",
DROP COLUMN "user_password",
DROP COLUMN "user_phone",
ADD COLUMN     "code" TEXT,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "img" TEXT,
ADD COLUMN     "martial_status" TEXT NOT NULL,
ADD COLUMN     "names" TEXT NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "nid" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
