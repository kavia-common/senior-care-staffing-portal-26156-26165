import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./state/auth";
import { ToastProvider } from "./components/ui/Toast";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          {/* Global theme toggle kept (as in template) but tucked away for dev/demo */}
          <button
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{
              position: "fixed",
              bottom: 12,
              left: 12,
              zIndex: 100,
              border: "1px solid var(--app-border)",
              background: "var(--app-surface)",
              color: "var(--color-text-primary)",
              borderRadius: 12,
              padding: "10px 12px",
              cursor: "pointer",
              boxShadow: "var(--shadow-2)",
            }}
          >
            Theme: {theme}
          </button>

          <AppRoutes />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
