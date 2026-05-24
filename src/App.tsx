import { Toaster } from "react-hot-toast";
import AppInitializer from "./pages/AppInitializer";
import AppRoutes from "./routes/AppRoutes";
import "./styles/Theme.css";
import { useState } from "react";

function App() {
  const [currentMode, setCurrentMode] = useState("light");

  const handleThemeMode = () => {
    const mode = currentMode === "dark" ? "light" : "dark";
    setCurrentMode(mode);
  };
  return (
    <>
      <AppInitializer />
      <Toaster position="top-right" />
      <div
        className={`app-layout ${currentMode === "dark" ? "dark-theme" : ""}`}
      >
        <div className="theme-toggle-wrapper">
          <button className="theme-toggle-btn" onClick={handleThemeMode}>
            <div className={`toggle-switch ${currentMode}`}>
              <div className="toggle-circle">
                {currentMode === "dark" ? "🌙" : "☀️"}
              </div>
            </div>
          </button>
        </div>

        <div className="app-content">
          <AppRoutes />
        </div>
      </div>
    </>
  );
}

export default App;
