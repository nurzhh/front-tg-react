import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { questions } from "@/shared/lib/questions";
import { Button } from "@/shared/ui/Button/Button.jsx";
// import cn from "classnames";

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedAnswers = localStorage.getItem("quizAnswers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const handleInputChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const handleNextQuestion = () => {
    if (currentAnswer.trim() !== "") {
      const newAnswers = [...answers, currentAnswer];
      setAnswers(newAnswers);
      localStorage.setItem("quizAnswers", JSON.stringify(newAnswers));
      setCurrentAnswer("");

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  const postQuiz = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/analyze",
        { answers },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res.data);
      localStorage.setItem("quizResults", JSON.stringify(res.data));
      navigate("/results", { state: { results: res.data } });
    } catch (error) {
      console.error("Ошибка запроса:", error.response?.data || error.message);
    }
  };

  const handleSubmit = () => {
    if (currentAnswer.trim() !== "") {
      const finalAnswers = [...answers, currentAnswer];
      setAnswers(finalAnswers);
      localStorage.setItem("quizAnswers", JSON.stringify(finalAnswers));
      postQuiz();
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
        value={currentAnswer}
        onChange={handleInputChange}
      />
      <div className="button-container">
        {currentQuestion < questions.length - 1 ? (
          <Button
            variant={currentAnswer ? "secondary" : "primary"}
            onClick={handleNextQuestion}
            disabled={currentAnswer.trim() === ""}
          >
            Далее
          </Button>
        ) : (
          <Button
              variant={currentAnswer ? "secondary" : "primary"}
              onClick={handleSubmit}
              disabled={currentAnswer.trim() === ""}
          >
            Отправить
          </Button>
        )}
      </div>
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
