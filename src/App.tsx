import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import MindTuningPage from "./pages/mind-tuning/MindTuningPage";

// TODO: 각 페이지 구현 후 import 추가
// import MyPage from './pages/mypage/MyPage';
// import EditProfilePage from './pages/mypage/EditProfilePage';
// import GuidePage from './pages/guide/GuidePage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* auth */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* feature */}
                <Route path="/mind-tuning" element={<MindTuningPage />} />

                {/* fallback */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;