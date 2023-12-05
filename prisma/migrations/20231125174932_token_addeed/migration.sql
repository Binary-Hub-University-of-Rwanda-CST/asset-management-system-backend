-- CreateTable
CREATE TABLE "ResetPasswordTokens" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "tokenUserEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResetPasswordTokens_pkey" PRIMARY KEY ("id")
);
