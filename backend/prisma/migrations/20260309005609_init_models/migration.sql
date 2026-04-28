-- CreateTable
CREATE TABLE "Utilizador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Receita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "calorias" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Ingrediente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "calorias" INTEGER
);

-- CreateTable
CREATE TABLE "IngredienteReceita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantidade" REAL NOT NULL,
    "unidade" TEXT NOT NULL,
    "receitaId" INTEGER NOT NULL,
    "ingredienteId" INTEGER NOT NULL,
    CONSTRAINT "IngredienteReceita_receitaId_fkey" FOREIGN KEY ("receitaId") REFERENCES "Receita" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IngredienteReceita_ingredienteId_fkey" FOREIGN KEY ("ingredienteId") REFERENCES "Ingrediente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilizador_email_key" ON "Utilizador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Ingrediente_nome_key" ON "Ingrediente"("nome");
