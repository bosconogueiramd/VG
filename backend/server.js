const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// 🔍 Verificando variáveis de ambiente:
console.log("🔍 Verificando variáveis de ambiente:");
console.log("PORT:", process.env.PORT || "❌ NÃO DEFINIDO");
console.log("MONGO_URI:", process.env.MONGO_URI ? "✅ OK" : "❌ NÃO DEFINIDO");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ OK" : "❌ NÃO DEFINIDO");
console.log("FRONTEND_URL:", process.env.FRONTEND_URL ? "✅ OK" : "❌ NÃO DEFINIDO");

if (!process.env.PORT || !process.env.MONGO_URI || !process.env.JWT_SECRET || !process.env.FRONTEND_URL) {
  console.error("❌ ERRO: Algumas variáveis de ambiente não estão definidas! Verifique seu .env");
  process.exit(1);
}

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const stepRoutes = require('./routes/steps');
const certificateRoutes = require('./routes/certificate'); // 🔹 Corrigida a referência correta do certificado

const app = express();

app.use(express.json());
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

// 🔹 Criar diretório 'certificates' caso não exista
const certificatesPath = path.join(__dirname, 'certificates');
if (!fs.existsSync(certificatesPath)) {
  fs.mkdirSync(certificatesPath, { recursive: true });
}

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/steps', stepRoutes);
app.use('/api/certificate', certificateRoutes);
app.use('/certificates', express.static(certificatesPath));

app.get('/', (req, res) => {
  res.send('API do Visita Guiada está rodando!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
