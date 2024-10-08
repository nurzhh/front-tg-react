import { useEffect } from "react";
import { useTelegram } from "../shared/hooks/useTelegram";
import { Header } from "../widgets/Header";
import { Route, Routes } from "react-router-dom";
import { ProductsList } from "../entities/ProductsList";
import { Form } from "../features/Form";
import "@/shared/styles/App.css";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route index element={<ProductsList />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
