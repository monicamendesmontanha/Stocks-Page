import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { StockPage } from "./StockPage";
import './styles.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <StrictMode>
    <StockPage />
  </StrictMode>,
);
