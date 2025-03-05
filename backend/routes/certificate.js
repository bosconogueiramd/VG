const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

// 🔹 Definição das variáveis de ambiente
const DOCSPRING_API_KEY = process.env.DOCSPRING_API_KEY;
const DOCSPRING_TEMPLATE_ID = process.env.DOCSPRING_TEMPLATE_ID;

// 🔹 Verifica se as variáveis de ambiente estão corretamente carregadas
if (!DOCSPRING_API_KEY || !DOCSPRING_TEMPLATE_ID) {
    console.error("❌ ERRO: Variáveis de ambiente não definidas! Verifique seu .env");
    process.exit(1);
}

router.post("/generate", async (req, res) => {
    try {
        const { name, date } = req.body;

        // 🔹 Garante que os valores obrigatórios sejam fornecidos
        const nomeCompleto = name || "Nome Padrão";
        const dataEmissao = date || new Date().toISOString().split("T")[0]; // Formato YYYY-MM-DD

        const requestData = {
            data: {
                name: nomeCompleto,
                person: { name: nomeCompleto }, // 🔹 Objeto obrigatório no schema
                names: [nomeCompleto], // 🔹 Array obrigatório no schema
                date: dataEmissao, // 🔹 Data no formato correto
                image: { url: "https://seusite.com/logo.png" }, // 🔹 URL da imagem conforme esperado
                nome_completo: nomeCompleto,
                data_emissao: dataEmissao
            },
            test: false
        };

        console.log("📤 Enviando dados para DocSpring:", JSON.stringify(requestData, null, 2));

        const response = await axios.post(
            `https://api.docspring.com/api/v1/templates/${DOCSPRING_TEMPLATE_ID}/submissions`,
            requestData,
            {
                auth: { username: DOCSPRING_API_KEY, password: "" },
                headers: { "Content-Type": "application/json" }
            }
        );

        return res.json({
            success: true,
            message: "✅ Certificado gerado com sucesso!",
            submission_id: response.data.id
        });

    } catch (error) {
        console.error("❌ Erro ao gerar certificado:", error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: "Erro ao processar solicitação",
            error: error.response?.data || error.message
        });
    }
});

module.exports = router;
