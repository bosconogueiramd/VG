const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

router.post("/generate", async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Nome é obrigatório para gerar o certificado." });
        }

        // Criar diretório de certificados se não existir
        const certificatesPath = path.join(__dirname, "..", "certificates");
        if (!fs.existsSync(certificatesPath)) {
            fs.mkdirSync(certificatesPath, { recursive: true });
        }

        // Criar o nome do arquivo do certificado
        const fileName = `certificado_${name.replace(/\s+/g, "_")}.pdf`;
        const filePath = path.join(certificatesPath, fileName);

        // Criar o PDF
        const doc = new PDFDocument({ size: "A4", margin: 50 });
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Adicionando título
        doc.fontSize(26).text("Certificado de Conclusão", { align: "center" });
        doc.moveDown();
        
        // Mensagem de certificação
        doc.fontSize(18).text(`Certificamos que`, { align: "center" });
        doc.fontSize(22).text(name, { align: "center", bold: true });
        doc.moveDown();
        doc.fontSize(18).text("Concluiu com êxito a visita guiada.", { align: "center" });
        doc.moveDown();

        // Data
        const dataAtual = new Date().toLocaleDateString("pt-BR");
        doc.fontSize(14).text(`Data: ${dataAtual}`, { align: "center" });

        // Finaliza o documento
        doc.end();

        // Retorna a URL do certificado gerado
        stream.on("finish", () => {
            return res.json({
                success: true,
                message: "✅ Certificado gerado com sucesso!",
                pdf_url: `http://localhost:5001/certificates/${fileName}` // Ajustado para acessar via frontend
            });
        });

    } catch (error) {
        console.error("❌ Erro ao gerar certificado:", error.message);
        return res.status(500).json({
            success: false,
            message: "Erro ao processar solicitação",
            error: error.message
        });
    }
});

module.exports = router;
