import { Link, useLocation, useNavigate } from "react-router-dom";
import OopsLogWordmark from "./OopsLogWordmark";

const canGoBack = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return (window.history.state?.idx ?? 0) > 0;
};

export default function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (canGoBack()) {
      navigate(-1);
      return;
    }

    navigate("/mypage");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/78 backdrop-blur-xl">
      <div
        className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6"
        style={{ height: "var(--app-header-height)" }}
      >
          <button
            type="button"
            aria-label="뒤로가기"
            onClick={handleBack}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-container text-primary transition hover:-translate-y-0.5 hover:bg-primary hover:text-on-primary"
          >
            <span className="material-symbols-outlined text-[22px]">
              arrow_back
            </span>
          </button>

          <Link
            to="/mind-tuning"
            aria-label="입력 페이지로 이동"
            className="flex min-w-0 items-center justify-center px-3"
          >
            <OopsLogWordmark />
          </Link>

          <button
            type="button"
            aria-label="마이페이지로 이동"
            onClick={() => navigate("/mypage")}
            className={`flex h-11 w-11 items-center justify-center rounded-2xl transition hover:-translate-y-0.5 ${
              location.pathname.startsWith("/mypage")
                ? "bg-primary text-on-primary"
                : "bg-surface-container text-primary hover:bg-primary hover:text-on-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">
              account_circle
            </span>
          </button>
      </div>
    </header>
  );
}
