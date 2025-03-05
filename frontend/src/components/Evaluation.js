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
      question: "Questão 2. Tema: Regulamentação SUS. Sobre a lei orgânica do SUS No. 8080 é correto afirmar:",
      options: [
        "a) Sendo universal, o SUS deve prover todo tipo de serviço médico com a mesma prioridade.",
        "b) Respeitando o princípio da equidade todos os pedidos devem ser acolhidos com a mesma priorização.",
        "c) Sendo integral, o SUS deve ofertar todo tipo de consulta e exame. O regulador deverá, pois, autorizar todas as solicitações que recebe, nunca negando solicitações.",
        "d) Atendendo a uma alta demanda por exames e consultas, as solicitações devem ser priorizadas de acordo com o quadro clínico, devendo o regulador reconhecer a prioridade a partir das informações descritas nos campos adequados de regulação."
      ],
      correctAnswer: 3
    },
    {
      question: "Questão 3. Tema: Ato de regulação. Marque a alternativa correta.",
      options: [
        "a) É considerada boa prática iniciar o plantão de regulação médica checando as solicitações devolvidas ao médico regulador.",
        "b) Durante a filtragem da Fila de Regulação, recomenda-se iniciar a pesquisa pelas solicitações mais recentes.",
        "c) Ao notar que uma solicitação de consulta ou de exame foi inserida no sistema de regulação por um profissional não médico, esse pedido deverá ser negado, pois apenas médicos podem solicitar exames ou consultas.",
        "d) Como regulador, não me cabe julgamento clínico, pois o ato de regulação é puramente algorítmico."
      ],
      correctAnswer: 0
    },
    {
      question: "Questão 4. Tema: Autorização de Solicitações. Marque a alternativa correta.",
      options: [
        "a) Se as informações de um pedido de consulta ou exame forem insuficientes, o médico regulador deve negar imediatamente a solicitação.",
        "b) É considerado uma boa prática devolver a solicitação ao estabelecimento solicitante para que as informações clínicas sejam complementadas, caso estejam insuficientes.",
        "c) Em nenhuma circunstância o médico regulador pode solicitar mais informações ao estabelecimento solicitante.",
        "d) Ao receber uma solicitação com informações insuficientes, o médico regulador deve priorizá-la automaticamente como baixa prioridade."
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
