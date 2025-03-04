import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Define a URL da API corretamente
  const API_URL = process.env.REACT_APP_BACKEND_URL?.trim() || 'http://localhost:5001/api';

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });

      if (response.data.token) {
        // Verifica se o localStorage está disponível antes de salvar o token
        if (typeof window !== "undefined" && typeof localStorage !== 'undefined') {
          localStorage.setItem('authToken', response.data.token);
        }
        navigate('/step1'); // Redirecionar para o primeiro passo da visita guiada
      }
    } catch (error) {
      console.error("❌ Erro ao fazer login:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Credenciais inválidas ou erro ao tentar fazer login.');
    }
  };

  return (
    <div>
      <Header />
      <main className="container my-4">
        <section id="login">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          {error && <p className="text-danger mt-3">{error}</p>}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
