import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const Intro = () => {
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001/api';

  const fetchSteps = useCallback(async () => {
    try {
      console.log("🔍 Chamando API em:", `${API_URL}/steps`);
      const response = await axios.get(`${API_URL}/steps`);
      setSteps(response.data);
    } catch (error) {
      console.error("❌ Erro ao carregar os passos:", error);
      setError("Erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

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

        <section id="beneficios">
          <h2>Por que utilizar a visita guiada?</h2>
          <ul>
            <li>Ambiente seguro de treinamento</li>
            <li>Acelera a curva de aprendizado</li>
            <li>Sua primeira validação antes de iniciar oficialmente seu trabalho de regulação médica.</li>
          </ul>
        </section>

        <section id="prova-social">
          <h2>Fala regulador!</h2>
          <blockquote>
            "A Visita Guiada foi desenvolvida a partir de uma visão do médico regulador. Ao notar que é necessário padronizar para melhor regular, a Visita Guiada foi idealizada e desenvolvida de médico para médico."
            <cite>- Dr. João Bosco</cite>
          </blockquote>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Intro;
