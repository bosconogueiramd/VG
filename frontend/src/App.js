import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Intro from './components/Intro';
import Register from './components/Register';
import Login from './components/Login';  // ✅ Importando a tela de login
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import Admin from './components/Admin';
import EditStep from './components/EditStep';
import EditUser from './components/EditUser';
import Evaluation from './components/Evaluation';
import Certificate from './components/Certificate';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/login" element={<Login />} />  {/* ✅ Rota do login */}
      <Route path="/register" element={<Register />} />  {/* ✅ Rota de cadastro */}
      <Route path="/step1" element={<Step1 />} />
      <Route path="/step2" element={<Step2 />} />
      <Route path="/step3" element={<Step3 />} />
      <Route path="/step4" element={<Step4 />} />
      <Route path="/step5" element={<Step5 />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/edit-step/:id" element={<EditStep />} />
      <Route path="/edit-user/:id" element={<EditUser />} />
      <Route path="/evaluation" element={<Evaluation />} />
      <Route path="/certificate" element={<Certificate />} />
    </Routes>
  );
};

export default App;
