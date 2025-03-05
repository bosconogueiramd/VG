const express = require("express");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

const router = express.Router();

// 🔹 Rota para gerar o certificado
router.post("/generate", async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Nome é obrigatório para gerar o certificado." });
        }

        // 🔹 Criar um nome de arquivo único para o certificado
        const fileName = `certificado_${Date.now()}.pdf`;
        const filePath = path.join(__dirname, "../certificates", fileName);

        // 🔹 Criar a pasta 'certificates' se não existir
        const certificatesPath = path.join(__dirname, "../certificates");
        if (!fs.existsSync(certificatesPath)) {
            fs.mkdirSync(certificatesPath, { recursive: true });
        }

        // 🔹 Criar e escrever o PDF
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // 🎓 Criando o layout do certificado
        doc.image(path.join(__dirname, "../assets/certificate_bg.png"), 0, 0, { width: 600 }); // Fundo (opcional)
        doc.fontSize(26).text("Certificado de Conclusão", { align: "center" });
        doc.moveDown();
        doc.fontSize(18).text(`Este certificado é concedido a:`, { align: "center" });
        doc.moveDown();
        doc.fontSize(22).text(name, { align: "center", bold: true });
        doc.moveDown();
        doc.fontSize(16).text("Por ter concluído a Visita Guiada com sucesso!", { align: "center" });
        doc.moveDown();
        doc.fontSize(12).text(`Emitido em: ${new Date().toLocaleDateString()}`, { align: "center" });

        doc.end();

        stream.on("finish", () => {
            const pdfUrl = `http://localhost:5001/certificates/${fileName}`;
            res.json({ pdf_url: pdfUrl });
        });

    } catch (error) {
        console.error("❌ Erro ao gerar certificado:", error);
        res.status(500).json({ message: "Erro ao processar solicitação." });
    }
});

// 🔹 Servir os arquivos gerados
router.use("/certificates", express.static(path.join(__dirname, "../certificates")));

module.exports = router;
