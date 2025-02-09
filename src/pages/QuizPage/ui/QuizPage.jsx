import React from "react";
// import { useTelegram } from "@/shared/hooks/useTelegram";
import {questions} from "@/shared/lib/questions";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const professions = {
    frontend: {keywords: ["визуальные", "дизайн", "интерфейсы"], score: 0},
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
    const [answers, setAnswers] = React.useState([
        "работать с данными",
        "в команде",
        "функциональность",
        "люблю решать сложные логические задачи",
        "люблю изучать новые языки программирования",
        "долгосрочные проекты",
        "интересует оптимизация производительности систем",
        "люблю анализировать большие объемы данных",
        "не нравится создавать пользовательский интерфейс",
        "интересует кибербезопасность"
    ]);
    // const { tg } = useTelegram();
    const navigate = useNavigate();

    const postQuiz = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/analyze",
                { answers },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );
            console.log(res.data);
        } catch (error) {
            console.error("Ошибка запроса:", error.response?.data || error.message);
        }
    };


    const handleSend = () => {
        postQuiz();
    }

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
            navigate("/results", {state: {professions}});
        }
    };
    return (
        <div className="quiz-page fade-in">
            <h2>
                Вопрос {currentQuestion + 1} из {questions.length}
            </h2>
            <div>
                <button onClick={handleSend}>Check</button>
            </div>
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
