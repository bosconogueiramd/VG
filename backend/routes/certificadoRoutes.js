const express = require('express');
const axios = require('axios');
require('dotenv').config();

const router = express.Router();

// Rota para gerar certificado
router.post('/generate-certificate', async (req, res) => {
    try {
        const { nome, evento, data } = req.body;

        // Verificar se todos os campos foram fornecidos
        if (!nome || !evento || !data) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
        }

        // Configurar a autenticação Basic Auth corretamente
        const auth = Buffer.from(`${process.env.DOCSPRING_API_KEY}`).toString('base64');

        const response = await axios.post(
            'https://api.docspring.com/api/v1/submissions',
            {
                template_id: process.env.DOCSPRING_TEMPLATE_ID,
                data: {
                    name: nome,  // Certifique-se de que os campos são os mesmos definidos no template do DocSpring
                    event: evento,
                    date: data
                },
                test: true  // Use "false" para produção, "true" para testes
            },
            {
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Verifica se a API retornou um link de download válido
        if (response.data && response.data.submission && response.data.submission.download_url) {
            return res.json({
                message: "Certificado gerado com sucesso!",
                certificado_url: response.data.submission.download_url
            });
        } else {
            throw new Error("A API do DocSpring não retornou um link de download válido.");
        }
    } catch (error) {
        console.error("Erro ao gerar certificado:", error.response?.data || error.message);
        res.status(500).json({ 
            message: "Erro ao gerar certificado.",
            error: error.response?.data || error.message
        });
    }
});

module.exports = router;
