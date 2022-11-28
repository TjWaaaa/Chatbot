-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Bob',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
