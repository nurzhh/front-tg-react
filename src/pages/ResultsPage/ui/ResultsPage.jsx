import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/shared/ui/Button/Button.jsx";

export const ResultsPage = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   try {
  //     const storedResults = localStorage.getItem("quizResults");

  //     if (!storedResults) {
  //       throw new Error("Результаты не найдены в localStorage");
  //     }

  //     const parsedResults = JSON.parse(storedResults);
  //     console.log("📌 Полученные данные из localStorage:", parsedResults);

  //     if (
  //       !parsedResults.direction ||
  //       !parsedResults.scores ||
  //       !parsedResults.analysis
  //     ) {
  //       throw new Error("Некорректная структура данных результатов");
  //     }

  //     setResult(parsedResults);
  //     console.log("✅ Данные успешно переданы в setResult");
  //   } catch (err) {
  //     setError(err.message || "Ошибка при загрузке результатов");
  //   }
  // }, []);
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
      <div className="results-container">
        <p className="error-message">{error}</p>
        <Button onClick={handleRetakeQuiz}>Пройти тест заново</Button>
      </div>
    );
  }

  if (!result) {
    return <div className="loading">Загрузка результатов...</div>;
  }

  // ✅ Логируем данные, чтобы убедиться, что они приходят корректно
  console.log("Result Data:", result);

  // 🔹 Подготавливаем данные для диаграммы
  const radarData = Object.entries(result.scores).map(([key, value]) => ({
    subject: getProfessionName(key),
    score: value,
    fullMark: 100, // Нормализация данных
  }));

  const sortedScores = Object.entries(result.scores).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="results-container">
      {/* 🔹 "Вы – {Направление}" */}
      <h1 className="result-title">
        Вы –{" "}
        <span className="highlight-green">
          {getProfessionName(result.direction)}
        </span>
      </h1>

      <div className="result-card">
        <p>Наиболее подходящая вам профессия:</p>
        <div className="profession">{result.direction}</div>
        <div className="percentage">
          {result.scores[result.direction.toLowerCase()]}%
        </div>
        <p>совместимости</p>
      </div>

      {/* 🔹 Диаграмма (Радар) */}
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={350}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="var(--color-gray)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "var(--color-text-light)", fontSize: 14 }}
            />
            <Radar
              name="Ваш результат"
              dataKey="score"
              stroke="var(--color-green-neon)"
              fill="var(--color-green-neon)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* 🔹 Анализ */}
      <div className="analysis-container">
        <h2 style={{ fontSize: 22, color: "white", marginBottom: 10 }}>
          Анализ результатов:
        </h2>
        <p>{result.analysis}</p>
      </div>

      <h2
        style={{
          fontSize: 22,
          color: "white",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        Все направления:
      </h2>
      {sortedScores.map(([key, value]) => (
        <div key={key} className="result-card">
          <div className="profession">{getProfessionName(key)}</div>
          <div className="percentage">{value}%</div>
        </div>
      ))}
      {/* 🔹 Кнопка */}
      <Button onClick={handleRetakeQuiz}>Пройти тест снова</Button>
    </div>
  );
};

export default ResultsPage;
