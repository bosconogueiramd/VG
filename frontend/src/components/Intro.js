import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import { API_URL } from '../api'; // ✅ Importação corrigida

const Intro = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchSteps = useCallback(async () => {
    try {
      console.log("🔍 Chamando API em:", `${API_URL}/steps`);
      await axios.get(`${API_URL}/steps`);
    } catch (error) {
      console.error("❌ Erro ao carregar os passos:", error);
      setError("Erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSteps();
  }, [fetchSteps]);

  return (
    <div>
      <Header />
      <main className="container my-4">
        <section id="hero" className="d-flex align-items-center">
          <img
            src={`${process.env.PUBLIC_URL}/imagens/callToAction.png`}
            alt="Demonstração da Ferramenta"
            className="hero-image img-fluid"
          />
          <div className="hero-content">
            <h2>Bem-vindo ao Visita Guiada</h2>
            <p>A visita guiada é uma ferramenta intuitiva e educativa de treinamento em regulação médica ambulatorial.</p>
            <div className="mt-4">
              <button onClick={() => navigate('/login')} className="btn btn-primary mx-2">
                Fazer Login
              </button>
              <button onClick={() => navigate('/register')} className="btn btn-success mx-2">
                Cadastre-se
              </button>
            </div>
          </div>
        </section>
        {loading && <p>Carregando as etapas...</p>}
        {error && <p className="text-danger">{error}</p>}
      </main>
      <Footer />
    </div>
  );
};

export default Intro;
