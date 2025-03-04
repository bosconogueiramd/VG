import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import '../styles/certificate.css';

const Certificate = () => {
  const [name, setName] = useState('');
  const [certificateUrl, setCertificateUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001';

  const handleGenerateCertificate = async () => {
    if (!name.trim()) {
      alert('Por favor, insira seu nome antes de gerar o certificado.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/certificate/generate`, { name });
      setCertificateUrl(response.data.pdf_url);
    } catch (error) {
      console.error("Erro ao gerar certificado:", error);
      alert('Erro ao gerar certificado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="container my-4">
        {!certificateUrl ? (
          <div className="form-container">
            <h2>Gerar Certificado</h2>
            <p>Por favor, insira seu nome para que ele apareça no certificado:</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome completo"
              className="form-control my-3"
            />
            <button onClick={handleGenerateCertificate} className="btn btn-primary" disabled={loading}>
              {loading ? "Gerando..." : "Gerar Certificado"}
            </button>
          </div>
        ) : (
          <div className="certificate">
            <h2>Certificado Gerado com Sucesso!</h2>
            <p>
              Certificamos que <strong>{name}</strong> concluiu a Visita Guiada em Regulação Médica com sucesso.
            </p>
            <p>
              <a href={certificateUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success">
                Baixar Certificado
              </a>
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Certificate;
