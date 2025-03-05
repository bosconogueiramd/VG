import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../api'; // ✅ Importação correta

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', email: '', userType: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${id}`);
        setUser(response.data);
      } catch (err) {
        setError('Erro ao carregar os dados do usuário.');
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/users/${id}`, user);
      navigate('/admin');
    } catch (err) {
      setError('Erro ao salvar os dados do usuário.');
    }
  };

  return (
    <div className="container my-4">
      <h2>Editar Usuário</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <button type="submit" className="btn btn-primary">Salvar</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
          Voltar
        </button>
      </form>
    </div>
  );
};

export default EditUser;
