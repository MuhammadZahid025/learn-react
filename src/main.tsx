import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import { AppRoutes } from "./routes/index.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { TaskProvider } from "./context/TaskContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <AppRoutes />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
