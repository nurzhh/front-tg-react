import { useEffect } from "react";
import { useTelegram } from "../shared/hooks/useTelegram";
import { Header } from "../widgets/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import { WelcomePage } from "@/pages/WelcomePage";
import { QuizPage } from "@/pages/QuizPage";
import { ResultsPage } from "@/pages/ResultsPage";
import "@/shared/styles/App.css";

function App() {
  const { tg } = useTelegram();
  const navigate = useNavigate();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  const startQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route index element={<WelcomePage onStartQuiz={startQuiz} />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;
