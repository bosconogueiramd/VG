const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// 🔹 Rota de cadastro de usuário
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, userType } = req.body;

    // 🔍 Verifica se o email já existe para evitar duplicação
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email já cadastrado." });
    }

    // 🔒 Hash da senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(password, 10);

    // 📌 Criando novo usuário
    const newUser = new User({ username, email, password: hashedPassword, userType });
    await newUser.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

// 🔹 Rota de login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Verifica se o usuário existe pelo **email** (não mais por `username`)
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado." });
    }

    // 🔒 Comparar senhas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta." });
    }

    // 🔑 Gerar token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ 
      token, 
      userType: user.userType, 
      user: { username: user.username } // 🔹 Adiciona o nome do usuário na resposta
    });
    
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

module.exports = router;
