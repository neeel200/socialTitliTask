
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
const queryCLient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryCLient}>
    <App />
  </QueryClientProvider>
);
