import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { getUserById, updateUser } from '../api';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: '',
    crm: '',
    email: '',
    birthDate: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(id);
        setUser(userData);
      } catch {
        setError('Erro ao carregar os dados do usuário.');
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, user);
      navigate('/admin');
    } catch {
      setError('Erro ao salvar os dados do usuário.');
    }
  };

  return (
    <div>
      <Header />
      <main className="container my-4">
        <h2>Editar Usuário</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome Completo</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>CRM</label>
            <input
              type="text"
              className="form-control"
              name="crm"
              value={user.crm}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Data de Nascimento</label>
            <input
              type="date"
              className="form-control"
              name="birthDate"
              value={user.birthDate}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">Salvar</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default EditUser;
