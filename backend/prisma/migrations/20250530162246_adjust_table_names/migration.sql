/*
  Warnings:

  - You are about to drop the `Simulation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Simulation" DROP CONSTRAINT "Simulation_studentId_fkey";

-- DropTable
DROP TABLE "Simulation";

-- DropTable
DROP TABLE "Student";

-- CreateTable
CREATE TABLE "student" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "simulation" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "quantidade_parcelas" INTEGER NOT NULL,
    "juros_ao_mes" DOUBLE PRECISION NOT NULL,
    "valor_parcela_mensal" DOUBLE PRECISION NOT NULL,
    "data_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "simulation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "student_email_key" ON "student"("email");

-- CreateIndex
CREATE INDEX "simulation_studentId_idx" ON "simulation"("studentId");

-- AddForeignKey
ALTER TABLE "simulation" ADD CONSTRAINT "simulation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
