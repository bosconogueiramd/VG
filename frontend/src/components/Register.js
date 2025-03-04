import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');  // ✅ Adicionando campo email
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Ajustando a URL da API corretamente
  const API_URL = process.env.REACT_APP_BACKEND_URL?.replace(/\/$/, '') || 'http://localhost:5001';

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      console.log("📤 Enviando dados:", { username, email, password, userType }); // Debugging
      const response = await axios.post(`${API_URL}/auth/register`, { username, email, password, userType });

      if (response.data.message === 'Usuário cadastrado com sucesso!') {
        navigate('/login'); // Redirecionar após cadastro
      }
    } catch (error) {
      console.error("❌ Erro ao cadastrar usuário:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Erro ao cadastrar usuário. Verifique os dados.');
    }
  };

  return (
    <div>
      <Header />
      <main className="container my-4">
        <section id="register">
          <h2>Cadastrar novo usuário</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Nome de usuário</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label> {/* ✅ Campo de email adicionado */}
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
            <div className="form-group">
              <label htmlFor="userType">Tipo de usuário</label>
              <select
                id="userType"
                className="form-control"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="user">Usuário</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Cadastrar</button>
          </form>
          {error && <p className="text-danger">{error}</p>}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
