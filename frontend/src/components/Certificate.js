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

        // 🔑 Configurações do DocSpring
        const API_KEY = process.env.DOCSPRING_API_KEY;
        const TEMPLATE_ID = process.env.DOCSPRING_TEMPLATE_ID;
        const DOCSPRING_URL = `https://api.docspring.com/api/v1/templates/${TEMPLATE_ID}/submissions`;

        // 📄 Enviar os dados para geração do certificado
        const response = await axios.post(
            DOCSPRING_URL,
            {
                data: { nome_completo: name }, // ⚠️ Certifique-se de que o campo do template do DocSpring corresponde
                test: false // Defina como `false` se estiver usando produção
            },
            {
                auth: { username: API_KEY, password: '' },
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const submissionId = response.data.id;

        console.log("🔄 Aguardando processamento do certificado...");

        // 🔄 Aguardar o processamento do DocSpring
        setTimeout(async () => {
            try {
                const submissionResponse = await axios.get(`${DOCSPRING_URL}/${submissionId}`, {
                    auth: { username: API_KEY, password: '' }
                });

                console.log("✅ Certificado gerado:", submissionResponse.data.download_url);
                res.json({ pdf_url: submissionResponse.data.download_url });
            } catch (error) {
                console.error("❌ Erro ao obter certificado:", error);
                res.status(500).json({ message: "Erro ao gerar certificado." });
            }
        }, 10000); // ⚠️ Aguarde 10 segundos antes de buscar o PDF

    } catch (error) {
        console.error("❌ Erro ao processar certificado:", error);
        res.status(500).json({ message: "Erro ao processar solicitação." });
    }
});

module.exports = router;
