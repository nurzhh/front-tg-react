import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./AppRoute";
import "@/shared/styles/index.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
