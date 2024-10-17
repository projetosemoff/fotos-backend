-- CreateTable
CREATE TABLE "photographer" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(250) NOT NULL,
    "password" VARCHAR(300) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "inactivated_at" TIMESTAMP(3),

    CONSTRAINT "pk_photographer" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ui_photographer_001" ON "photographer"("email");
