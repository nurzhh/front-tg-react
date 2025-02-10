import { useEffect } from "react";
import { useTelegram } from "../shared/hooks/useTelegram";
import { Route, Routes, useNavigate } from "react-router-dom";
import { WelcomePage } from "@/pages/WelcomePage";
import { QuizPage } from "@/pages/QuizPage";
import { ResultsPage } from "@/pages/ResultsPage";
import {AboutPage} from "@/pages/AboutPage";
import {CalendarPage} from "@/pages/CalendarPage";
import "@/shared/styles/App.css";
// import {NotFoundPage} from "@/pages/NotFound/index.js";

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
      <Routes>
        <Route index element={<WelcomePage onStartQuiz={startQuiz} />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/schedule" element={<CalendarPage />} />
        <Route path="/*" element={<h1>Not Fround</h1>}/>
      </Routes>
    </div>
  );
}

export default App;


