import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ResultsPage = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedResults = localStorage.getItem("quizResults");
      if (storedResults) {
        const parsedResults = JSON.parse(storedResults);
        console.log("Parsed results:", parsedResults);

        if (parsedResults && typeof parsedResults === "object") {
          if (
            parsedResults.direction &&
            parsedResults.scores &&
            parsedResults.analysis
          ) {
            setResult(parsedResults);
          } else if (
            parsedResults.result &&
            typeof parsedResults.result === "object"
          ) {
            setResult(parsedResults.result);
          } else {
            throw new Error("Некорректная структура данных результатов");
          }
        } else {
          throw new Error("Не удалось распарсить результаты");
        }
      } else {
        throw new Error("Результаты не найдены в localStorage");
      }
    } catch (err) {
      console.error("Error in ResultsPage:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Произошла ошибка при загрузке результатов"
      );
    }
  }, []);

  console.log(error);
  console.log(result);

  const getProfessionName = (key) => {
    switch (key) {
      case "frontend":
        return "Frontend-разработчик";
      case "backend":
        return "Backend-разработчик";
      case "gamedev":
        return "Разработчик игр";
      case "design":
        return "Дизайнер";
      default:
        return key;
    }
  };

  const handleRetakeQuiz = () => {
    localStorage.removeItem("quizAnswers");
    localStorage.removeItem("quizResults");
    navigate("/");
  };

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={handleRetakeQuiz} className="start-button">
          Пройти тест заново
        </button>
      </div>
    );
  }

  if (!result) {
    return <div>Загрузка результатов...</div>;
  }

  const sortedScores = Object.entries(result.scores).sort(
    (a, b) => b[1] - a[1]
  );
// 
  return (
    <div className="results-page fade-in">
      <h1>Ваши результаты</h1>
      <div className="result-card">
        <p>Наиболее подходящая вам профессия:</p>
        <div className="profession">{result.direction}</div>
        <div className="percentage">
          {result.scores[result.direction.toLowerCase()]}%
        </div>
        <p>совместимости</p>
      </div>
      <div className="analysis-card">
        <h2>Анализ результатов:</h2>
        <p>{result.analysis}</p>
      </div>
      <h2>Все направления:</h2>
      {sortedScores.map(([key, value]) => (
        <div key={key} className="result-card">
          <div className="profession">{getProfessionName(key)}</div>
          <div className="percentage">{value}%</div>
        </div>
      ))}
      <button onClick={handleRetakeQuiz} className="start-button">
        Пройти тест снова
      </button>
    </div>
  );
};

export default ResultsPage;
