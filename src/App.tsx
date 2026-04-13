import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import MindTuningPage from "./pages/mind-tuning/MindTuningPage";
import FailureDetailPage from "./pages/mypage/FailureDetailPage";
import MyPage from "./pages/mypage/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<MyPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route
              path="/mypage/failures/:failureId"
              element={<FailureDetailPage />}
            />
            <Route path="/mind-tuning" element={<MindTuningPage />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
