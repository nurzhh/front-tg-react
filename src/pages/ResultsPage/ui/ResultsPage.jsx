import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/shared/ui/Button/Button.jsx";

export const ResultsPage = () => {
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const storedResults = localStorage.getItem("quizResults");

            if (!storedResults) {
                throw new Error("Результаты не найдены в localStorage");
            }

            const parsedResults = JSON.parse(storedResults);
            console.log("📌 Полученные данные из localStorage:", parsedResults);

            if (!parsedResults.direction || !parsedResults.scores || !parsedResults.analysis) {
                throw new Error("Некорректная структура данных результатов");
            }

            setResult(parsedResults);
            console.log("✅ Данные успешно переданы в setResult");
        } catch (err) {
            setError(err.message || "Ошибка при загрузке результатов");
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

    return (
        <div className="results-container">
            {/* 🔹 "Вы – {Направление}" */}
            <h1 className="result-title">
                Вы – <span className="highlight-green">{getProfessionName(result.direction)}</span>
            </h1>

            {/* 🔹 Диаграмма (Радар) */}
            <div className="chart-container">
                <ResponsiveContainer width="100%" height={350}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke="var(--color-gray)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--color-text-light)", fontSize: 14 }} />
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
                <h2>Анализ результатов:</h2>
                <p>{result.analysis}</p>
            </div>

            {/* 🔹 Кнопка */}
            <Button onClick={handleRetakeQuiz}>Пройти тест снова</Button>
        </div>
    );
};

export default ResultsPage;
