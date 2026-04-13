import { useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthField } from "../../features/auth/components/AuthField";
import { useAuth } from "../../features/auth/hooks/useAuth";

function Cloud({ className }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none select-none ${className}`}>
      <div className="relative">
        <div className="w-32 h-14 bg-white/70 rounded-full" />
        <div className="absolute -top-5 left-5 w-14 h-14 bg-white/70 rounded-full" />
        <div className="absolute -top-3 right-6 w-10 h-10 bg-white/70 rounded-full" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  const location = useLocation();
  const { login, isLoading, error } = useAuth();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const showSignupCompleted =
    typeof location.state === "object" &&
    location.state !== null &&
    "signupCompleted" in location.state &&
    location.state.signupCompleted === true;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({ loginId, password });
  };

  return (
    <div className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary-container to-white font-body">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-10 w-96 h-96 bg-tertiary-container/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary-container/20 blur-[100px] rounded-full" />
      </div>

      <Cloud className="top-[6%] right-[10%] animate-[float_7s_ease-in-out_infinite] opacity-80" />
      <Cloud className="top-[38%] -left-4 animate-[float_9s_ease-in-out_infinite_2s] opacity-60 scale-125" />

      <main className="relative z-10 w-full max-w-[420px] mx-auto px-5 py-12 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
            <span className="material-symbols-outlined text-4xl text-primary">
              hiking
            </span>
          </div>

          <h1 className="font-headline font-extrabold text-3xl text-primary tracking-tight">
            다시, 내 기록으로 돌아오기
          </h1>

          <p className="text-on-surface-variant font-medium text-sm px-6">
            로그인하고 실패 기록과 마음 정리를 이어서 확인해 보세요.
          </p>
        </div>

        <div className="w-full bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-[0_32px_64px_-16px_rgba(23,97,139,0.12)] flex flex-col gap-5">
          {showSignupCompleted && (
            <div className="rounded-xl border border-primary/10 bg-primary-container/45 px-4 py-3 text-sm text-on-primary-container font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-base shrink-0">
                check_circle
              </span>
              <p>가입이 완료됐어요. 이제 로그인해서 시작해 보세요.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <AuthField
              id="loginId"
              name="loginId"
              label="아이디"
              icon="person"
              type="text"
              placeholder="아이디를 입력하세요"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              required
              autoComplete="username"
            />

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="flex items-center gap-2 font-headline font-bold text-sm text-primary px-1"
              >
                <span className="material-symbols-outlined text-lg">lock</span>
                비밀번호
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  aria-invalid={!!error}
                  className="w-full h-14 px-5 pr-12 rounded-xl bg-surface-container-low border-2 border-transparent font-medium placeholder:text-outline/40 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPw ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex justify-end -mt-2">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="cursor-not-allowed text-primary-dim/70 text-sm font-semibold"
              >
                계정 찾기 기능은 준비 중입니다
              </button>
            </div>

            {error && (
              <div className="rounded-xl border border-error/20 bg-error-container/30 px-4 py-3 text-sm text-error font-medium flex items-center gap-2">
                <span className="material-symbols-outlined text-base shrink-0">
                  warning
                </span>
                <p className="leading-5 break-words">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-primary hover:bg-primary-dim disabled:opacity-60 text-on-primary font-headline font-bold text-base rounded-full shadow-[0_6px_0_0_#00557d] active:shadow-none active:translate-y-1.5 transition-all duration-150 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="material-symbols-outlined animate-spin text-xl">
                  progress_activity
                </span>
              ) : (
                <>
                  로그인
                  <span className="material-symbols-outlined">login</span>
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-on-surface-variant font-medium text-sm">
          아직 계정이 없으신가요?{" "}
          <Link
            to="/signup"
            className="font-bold text-primary hover:underline underline-offset-4"
          >
            회원가입하기
          </Link>
        </p>
      </main>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
