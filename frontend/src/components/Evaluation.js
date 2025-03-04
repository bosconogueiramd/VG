import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';


const Evaluation = () => {
  const [questions, setQuestions] = useState([
    {
      question: "Questão 1. Tema: Boas práticas em regulação. Marque a alternativa correta.",
      options: [
        "a) Durante o ato de regulação médica, a função do médico regulador é aprovar as solicitações. Não cabe ao médico regulador priorizar a solicitação a partir da descrição de quadro clínico, em respeito a autonomia do médico solicitante.",
        "b) Ao detalhar dor, o médico solicitante deverá descrever o padrão e ritmo de dor, fornecendo elementos para que o regulador possa priorizar adequadamente a solicitação de consulta ou de exame.",
        "c) Ao descrever um quadro clínico como câncer, o médico regulador deverá priorizar a solicitação com a máxima prioridade possível, não importando a topografia do câncer e o estágio de tratamento.",
        "d) Sabendo que a rotina das UAPS (Postos de Saúde) é bastante movimentada, é aceitável o aproveitamento de um CID principal para todas as solicitações."
      ],
      correctAnswer: 1
    },
    {
      question: "Questão 5. Tema: Negação de Solicitações. Marque a alternativa correta.",
      options: [
        "a) O médico regulador nunca deve negar uma solicitação, pois todos os pedidos devem ser atendidos.",
        "b) Um pedido pode ser negado se o paciente desistiu ou se a solicitação foi feita por engano.",
        "c) Uma solicitação deve ser negada sempre que houver qualquer dúvida sobre as informações fornecidas.",
        "d) Ao negar uma solicitação, não é necessário justificar o motivo da negativa."
      ],
      correctAnswer: 1
    },
    {
      question: "Questão 6. Tema: Alteração de Fila. Marque a alternativa correta.",
      options: [
        "a) Uma solicitação inserida na fila errada deve ser automaticamente negada pelo médico regulador.",
        "b) O médico regulador pode alterar a solicitação para a fila correta e deve priorizá-la adequadamente.",
        "c) Quando uma solicitação é inserida na fila errada, deve ser devolvida ao estabelecimento solicitante para correção.",
        "d) As solicitações não podem ser alteradas de fila, mesmo que inseridas incorretamente."
      ],
      correctAnswer: 1
    },
    {
      question: "Questão 7. Tema: Devolução de Solicitações. Marque a alternativa correta.",
      options: [
        "a) O médico regulador nunca deve devolver uma solicitação ao estabelecimento solicitante, mesmo que as informações sejam insuficientes.",
        "b) É necessário justificar o motivo pelo qual a solicitação está sendo devolvida ao estabelecimento solicitante.",
        "c) As devoluções devem ser feitas somente no final do plantão.",
        "d) Não é necessário checar as devoluções no início e no fim de cada plantão."
      ],
      correctAnswer: 1
    },
    {
      question: "Questão 8. Tema: Priorização de Solicitações. Marque a alternativa correta.",
      options: [
        "a) Todas as solicitações de consulta ou exame devem ser priorizadas da mesma maneira, independentemente do quadro clínico.",
        "b) A priorização deve ser feita com base nas informações clínicas fornecidas, podendo variar de emergencial a baixa prioridade.",
        "c) O médico regulador deve priorizar todas as solicitações como alta prioridade para garantir atendimento rápido.",
        "d) As solicitações sem informações suficientes devem ser priorizadas como baixa prioridade."
      ],
      correctAnswer: 1
    },
    {
      question: "Questão 9. Tema: Ato de Regulação. Marque a alternativa correta.",
      options: [
        "a) Durante o plantão, o médico regulador deve iniciar a avaliação pelas solicitações mais antigas na fila.",
        "b) As solicitações de exames devem ser sempre autorizadas antes das solicitações de consultas.",
        "c) A prioridade do atendimento deve ser definida pelo coordenador médico e não pelo médico regulador.",
        "d) O médico regulador deve ignorar as devoluções ao regulador no início e fim de cada plantão."
      ],
      correctAnswer: 0
    },
    {
      question: "Questão 10. Tema: Boas Práticas em Regulação. Marque a alternativa correta.",
      options: [
        "a) O médico regulador deve buscar priorizar consultas e exames para pacientes de regiões distantes, de mais difícil acesso à saúde.",
        "b) As solicitações com informações clínicas detalhadas devem ser priorizadas mais rapidamente.",
        "c) A comunicação com os solicitantes deve ser evitada para não causar atrasos no processo de regulação.",
        "d) Todas as solicitações devem ser autorizadas sem priorização para evitar conflitos."
      ],
      correctAnswer: 1
    }
  ]);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswerChange = (questionIndex, answerIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Respostas enviadas:", selectedAnswers);
    navigate('/final-step');
  };

  return (
    <div>
      <Header />
      <main className="container my-4">
        <section id="evaluation">
          <h2>Avaliação</h2>
          <form onSubmit={handleSubmit}>
            {questions.map((q, index) => (
              <div key={index} className="form-group">
                <p><strong>{q.question}</strong></p>
                {q.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="form-check">
                    <input
                      type="radio"
                      id={`q${index}-o${optionIndex}`}
                      name={`question-${index}`}
                      value={optionIndex}
                      className="form-check-input"
                      onChange={() => handleAnswerChange(index, optionIndex)}
                      checked={selectedAnswers[index] === optionIndex}
                    />
                    <label htmlFor={`q${index}-o${optionIndex}`} className="form-check-label">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            ))}
            <button type="submit" className="btn btn-primary">Enviar Respostas</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Evaluation;
