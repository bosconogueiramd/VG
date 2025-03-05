import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const FinalStep = () => {
  const [name, setName] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_BACKEND_URL?.trim() || 'http://localhost:5001/api';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setName(JSON.parse(storedUser).name);
    } else {
      setError('Nome do usuário não encontrado.');
    }
  }, []);

  const handleGenerateCertificate = async () => {
    if (!name.trim()) {
      alert('Erro: Nome do usuário não encontrado.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/certificate/generate`, { name });
      setDownloadUrl(response.data.pdf_url);
    } catch (error) {
      console.error("❌ Erro ao gerar certificado:", error.response?.data?.message || error.message);
      setError('Erro ao gerar o certificado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="container my-4">
        <h2>Parabéns! 🎉</h2>
        <p>Você concluiu a visita guiada com sucesso.</p>

        {!downloadUrl ? (
          <div>
            <button onClick={handleGenerateCertificate} className="btn btn-primary" disabled={loading}>
              {loading ? 'Gerando Certificado...' : 'Gerar Certificado'}
            </button>
            {error && <p className="text-danger mt-3">{error}</p>}
          </div>
        ) : (
          <div>
            <p>Seu certificado foi gerado com sucesso! 🎓</p>
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="btn btn-success">
              Baixar Certificado
            </a>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FinalStep;
