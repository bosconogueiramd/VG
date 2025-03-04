import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/style2.css';
import './styles/styles.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Criando a instância root
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Erro: Elemento 'root' não encontrado. Verifique se há um <div id='root'></div> no index.html.");
}
