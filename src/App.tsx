import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MindTuningPage from "./pages/mind-tuning/MindTuningPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/mind-tuning" element={<MindTuningPage />} />
        <Route path="*" element={<Navigate to="/mind-tuning" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
