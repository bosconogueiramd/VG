const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ✅ Importação de rotas
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const stepRoutes = require('./routes/steps');
const certificateRoutes = require('./routes/certificate'); // Rota de certificado

const app = express(); // ✅ Inicializando o Express antes do uso

// 🔹 Middleware
app.use(express.json());

// 🔹 Configuração do CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// 🔹 Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    process.exit(1);
  });

// 🔹 Definir Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/steps', stepRoutes);
app.use('/api/certificate', certificateRoutes); // 🔹 Agora funcionando corretamente

// 🔹 Rota padrão
app.get('/', (req, res) => {
  res.send('API do Visita Guiada está rodando!');
});

// 🔹 Iniciar Servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
