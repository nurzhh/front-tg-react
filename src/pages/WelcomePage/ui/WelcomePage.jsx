const WelcomePage = ({ onStartQuiz }) => {
  return (
    <div className="welcome-page">
      <h1>Привет!</h1>
      <p className="text-red-500">Это тест на профориентацию в сфере IT</p>
      <button onClick={onStartQuiz} className="start-button">
        Пройти тест
      </button>
    </div>
  );
};

export default WelcomePage;
