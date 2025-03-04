const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// 🔹 Rota para gerar certificado
router.post('/generate', async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Nome é obrigatório para gerar o certificado." });
        }

        // 🔑 Configurações da API DocSpring
        const API_KEY = process.env.DOCSPRING_API_KEY;
        const TEMPLATE_ID = process.env.DOCSPRING_TEMPLATE_ID;
        const DOCSPRING_URL = `https://api.docspring.com/api/v1/templates/${TEMPLATE_ID}/submissions`;

        // 📄 Dados do certificado a serem preenchidos no modelo do DocSpring
        const payload = {
            data: { name },
            test: true // Define como "true" se estiver em ambiente de testes
        };

        // 🔍 Enviar a requisição para o DocSpring
        const response = await axios.post(DOCSPRING_URL, payload, {
            auth: { username: API_KEY, password: '' },
            headers: { 'Content-Type': 'application/json' }
        });

        const submissionId = response.data.id;

        // 🔄 Espera um tempo para o DocSpring processar o PDF
        setTimeout(async () => {
            try {
                const submissionResponse = await axios.get(`${DOCSPRING_URL}/${submissionId}`, {
                    auth: { username: API_KEY, password: '' }
                });

                // Retorna o link do PDF gerado
                res.json({ pdf_url: submissionResponse.data.download_url });
            } catch (error) {
                console.error("Erro ao obter certificado:", error);
                res.status(500).json({ message: "Erro ao gerar certificado." });
            }
        }, 5000); // Espera 5 segundos antes de buscar o PDF

    } catch (error) {
        console.error("Erro ao gerar certificado:", error);
        res.status(500).json({ message: "Erro ao processar solicitação." });
    }
});

module.exports = router;
