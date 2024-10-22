/*
  Warnings:

  - You are about to alter the column `password` on the `photographer` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(60)`.

*/
-- AlterTable
ALTER TABLE "photographer" ALTER COLUMN "password" SET DATA TYPE VARCHAR(60);

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "phone_number" VARCHAR(12) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "inactivated_at" TIMESTAMP(3),

    CONSTRAINT "pk_client" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ui_client_001" ON "client"("email");
