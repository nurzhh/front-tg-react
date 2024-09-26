import { useEffect } from "react";
import "@/shared/styles/App.css";
import { useTelegram } from "./shared/hooks/useTelegram";
import { Header } from "./widgets/Header";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);
  return (
    <div className="app">
      <Header />
    </div>
  );
}

export default App;
