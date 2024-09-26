import { useEffect } from "react";
import "./App.css";
import { useTelegram } from "./shared/hooks/useTelegram";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);
  return <div className="app">work</div>;
}

export default App;
