const express = require('express');
const router = express.Router();

// Simulação de banco de dados para testar a API
let steps = [
  { id: 1, title: "Passo 1", content: "Conteúdo do passo 1" },
  { id: 2, title: "Passo 2", content: "Conteúdo do passo 2" }
];

// Retorna todos os passos
router.get('/', (req, res) => {
  console.log("Rota /api/steps foi acessada.");
  res.json(steps);
});

module.exports = router;
