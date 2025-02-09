import { useLocation, useNavigate } from "react-router-dom"

export const ResultsPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { professions } = location.state

  const totalScore = Object.values(professions).reduce((sum, prof) => sum + prof.score, 0)
  const sortedProfessions = Object.entries(professions).sort((a, b) => b[1].score - a[1].score)
  const topProfession = sortedProfessions[0]

  const getProfessionName = (key) => {
    switch (key) {
      case "frontend":
        return "Frontend-разработчик"
      case "backend":
        return "Backend-разработчик"
      case "dataScience":
        return "Специалист по анализу данных"
      case "security":
        return "Специалист по кибербезопасности"
      default:
        return key
    }
  }

  return (
    <div className="results-page fade-in">
      <h1>Ваши результаты</h1>
      <div className="result-card">
        <p>Наиболее подходящая вам профессия:</p>
        <div className="profession">{getProfessionName(topProfession[0])}</div>
        <div className="percentage">{Math.round((topProfession[1].score / totalScore) * 100)}%</div>
        <p>совместимости</p>
      </div>
      <h2>Другие профессии:</h2>
      {sortedProfessions.slice(1).map(([key, value]) => (
        <div key={key} className="result-card">
          <div className="profession">{getProfessionName(key)}</div>
          <div className="percentage">{Math.round((value.score / totalScore) * 100)}%</div>
        </div>
      ))}
      <button onClick={() => navigate("/")} className="start-button">
        Пройти тест снова
      </button>
    </div>
  )
}

