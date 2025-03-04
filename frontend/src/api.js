import axios from 'axios';

// Obtém a URL do backend do arquivo .env ou usa a padrão localhost:5001/api
const API_URL = process.env.REACT_APP_BACKEND_URL?.trim() || 'http://localhost:5001/api';

console.log("🔍 Chamando API em:", API_URL);

// 🛠 Funções de autenticação (Login e Cadastro)
export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, user);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao registrar usuário:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, user);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao fazer login:", error.response?.data?.message || error.message);
    throw error;
  }
};

// 🛠 Funções relacionadas a usuários (apenas administradores)
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao obter usuários:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao deletar usuário:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao atualizar usuário:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao obter usuário por ID:", error.response?.data?.message || error.message);
    throw error;
  }
};

// 🛠 Funções relacionadas aos passos da visita guiada
export const getStepsContent = async () => {
  try {
    const response = await axios.get(`${API_URL}/steps`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao carregar os passos:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const updateStepContent = async (step, content) => {
  try {
    const response = await axios.put(`${API_URL}/steps/${step}`, { content });
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao atualizar o passo:", error.response?.data?.message || error.message);
    throw error;
  }
};

export const getStepById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/steps/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao obter passo por ID:", error.response?.data?.message || error.message);
    throw error;
  }
};
