import axios from 'axios';

export const API_URL = process.env.REACT_APP_BACKEND_URL?.trim() || 'http://localhost:5001/api';

console.log("🔍 Chamando API em:", API_URL);

// 🛠 Funções de autenticação
export const registerUser = async (user) => axios.post(`${API_URL}/auth/register`, user);
export const loginUser = async (user) => axios.post(`${API_URL}/auth/login`, user);

// 🛠 Funções de usuários
export const getUsers = async () => axios.get(`${API_URL}/users`);
export const deleteUser = async (id) => axios.delete(`${API_URL}/users/${id}`);
export const updateUser = async (id, user) => axios.put(`${API_URL}/users/${id}`, user);
export const getUserById = async (id) => axios.get(`${API_URL}/users/${id}`);

// 🛠 Funções dos passos
export const getStepsContent = async () => axios.get(`${API_URL}/steps`);
export const getStepById = async (id) => axios.get(`${API_URL}/steps/${id}`);
export const updateStepContent = async (id, content) => axios.put(`${API_URL}/steps/${id}`, { content });

// 🛠 Função para gerar certificado em PDF
export const generateCertificate = async (name) => {
    try {
        const response = await axios.post(`${API_URL}/certificate/generate`, { name });
        return response.data.pdf_url;
    } catch (error) {
        console.error("❌ Erro ao gerar certificado:", error.message);
        throw error;
    }
};
