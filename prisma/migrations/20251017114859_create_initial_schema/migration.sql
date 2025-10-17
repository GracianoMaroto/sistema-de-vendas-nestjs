-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN', 'GERENTE', 'VENDEDOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Roles" NOT NULL DEFAULT 'VENDEDOR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "itensRecebidos" TEXT NOT NULL,
    "descricaoServico" TEXT NOT NULL,
    "dataEntrega" TEXT NOT NULL,
    "totalFinal" TEXT NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "statusPagamento" TEXT NOT NULL,
    "statusServico" TEXT NOT NULL,
    "vendedorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venda" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "CPF" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "descricaoVenda" TEXT NOT NULL,
    "dataEntrega" TEXT NOT NULL,
    "totalFinal" TEXT NOT NULL,
    "formaPagamento" TEXT NOT NULL,
    "statusPagamento" TEXT NOT NULL,
    "statusVenda" TEXT NOT NULL,
    "vendedorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Servico" ADD CONSTRAINT "Servico_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venda" ADD CONSTRAINT "Venda_vendedorId_fkey" FOREIGN KEY ("vendedorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
