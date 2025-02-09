import React from "react";
// import { useTelegram } from "@/shared/hooks/useTelegram";
import { questions } from "@/shared/lib/questions";
import { useNavigate } from "react-router-dom";

const professions = {
  frontend: { keywords: ["визуальные", "дизайн", "интерфейсы"], score: 0 },
  backend: {
    keywords: ["данные", "функциональность", "оптимизация"],
    score: 0,
  },
  dataScience: {
    keywords: ["данные", "анализировать", "большие объемы"],
    score: 0,
  },
  security: {
    keywords: ["кибербезопасность", "защита", "безопасность"],
    score: 0,
  },
};

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  // const { tg } = useTelegram();
  const navigate = useNavigate();

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Оценка ответа
    Object.keys(professions).forEach((profession) => {
      professions[profession].score += professions[profession].keywords.some(
        (keyword) => answer.toLowerCase().includes(keyword)
      )
        ? 1
        : 0;
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Переход к результатам
      navigate("/results", { state: { professions } });
    }
  };
  return (
    <div className="quiz-page fade-in">
      <h2>
        Вопрос {currentQuestion + 1} из {questions.length}
      </h2>
      <p>{questions[currentQuestion]}</p>
      <input
        type="text"
        placeholder="Введите ваш ответ"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleAnswer(e.target.value);
            e.target.value = "";
          }
        }}
      />
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default QuizPage;
