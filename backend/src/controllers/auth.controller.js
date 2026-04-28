import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

// 🔐 REGISTAR UTILIZADOR
export async function register(req, res) {
  try {
    const { nome, email, senha } = req.body;

    // Verificar se já existe
    const existingUser = await prisma.utilizador.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email já está em uso."
      });
    }

    // Hash da password
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Criar utilizador
    const user = await prisma.utilizador.create({
      data: {
        nome,
        email,
        senha: hashedPassword
      }
    });

    res.status(201).json({
      message: "Utilizador registado com sucesso.",
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Erro no registo:", error);
    res.status(500).json({ message: "Erro no registo." });
  }
}

// 🔐 LOGIN
export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    // Verificar utilizador
    const user = await prisma.utilizador.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({
        message: "Credenciais inválidas."
      });
    }

    // Comparar password
    const isValidPassword = await bcrypt.compare(senha, user.senha);

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Credenciais inválidas."
      });
    }

    // Criar token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email
      },
      "segredo_super_secreto", // ⚠️ depois colocar no .env
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login realizado com sucesso.",
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro no login." });
  }
}