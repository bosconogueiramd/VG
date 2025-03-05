import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api'; // ✅ Importação corrigida

const Admin = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("❌ Erro ao obter usuários:", error.response?.data?.message || error.message);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container my-4">
      <h2>Painel Administrativo</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.username} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
