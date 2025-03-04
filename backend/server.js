const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// ✅ Importações de rotas antes de inicializar o app
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const stepRoutes = require('./routes/steps');
const certificateRoutes = require('./routes/certificate'); // 🔹 Corrigindo a ordem da importação

const app = express(); // ✅ Inicializando o app antes de usá-lo

// Middleware
app.use(express.json());

// Configuração do CORS para permitir requisições do frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Conectar ao banco de dados MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => {
    console.error("❌ Erro ao conectar ao MongoDB:", err);
    process.exit(1); // Encerra o processo se a conexão falhar
  });

// ✅ Definir rotas da API corretamente
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/steps', stepRoutes);
app.use('/api/certificate', certificateRoutes); // 🔹 Agora pode ser usado corretamente

// Rota padrão
app.get('/', (req, res) => {
  res.send('API do Visita Guiada está rodando!');
});

// Iniciar servidor
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
