const express = require('express');
const User = require('../models/User'); // Certifique-se de que o modelo User está correto
const router = express.Router();

// Listar todos os usuários (sem exibir senha)
router.get('/', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Esconde a senha na resposta
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
});

// Criar usuário (registro)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Verificar se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }
        
        // Criar novo usuário
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
});

module.exports = router;
