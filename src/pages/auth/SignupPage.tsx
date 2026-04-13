import { useState, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { AuthField } from "../../features/auth/components/AuthField";
import { useAuth } from "../../features/auth/hooks/useAuth";
import type { SignupRequest } from "../../features/auth/types/auth.types";

const INITIAL_FORM: SignupRequest = {
  loginId: "",
  name: "",
  nickname: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
  password: "",
};

export default function SignupPage() {
  const { signup, isLoading, error } = useAuth();
  const [form, setForm] = useState<SignupRequest>(INITIAL_FORM);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showPwConfirm, setShowPwConfirm] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const set =
    (field: keyof SignupRequest) => (e: ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);

    if (form.password !== passwordConfirm) {
      setLocalError("비밀번호가 일치하지 않습니다.");
      return;
    }

    await signup(form);
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-primary-container to-white font-body text-on-surface">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-10 h-96 w-96 rounded-full bg-tertiary-container/30 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary-container/20 blur-[100px]" />
      </div>

      <div className="pointer-events-none absolute top-[12%] left-8 opacity-20 animate-[float_8s_ease-in-out_infinite]">
        <span className="material-symbols-outlined text-[96px] text-white">
          cloud
        </span>
      </div>
      <div className="pointer-events-none absolute bottom-24 right-6 opacity-20 animate-[float_10s_ease-in-out_infinite_3s]">
        <span className="material-symbols-outlined text-[80px] text-white">
          cloud
        </span>
      </div>

      <main className="px-4 pb-16 pt-24 flex justify-center">
        <section className="relative w-full max-w-xl">
          <div className="hidden md:flex absolute -right-14 -bottom-10 w-28 h-28 bg-secondary-container rounded-2xl items-center justify-center rotate-12 shadow-lg z-10">
            <span className="material-symbols-outlined text-5xl text-secondary">
              potted_plant
            </span>
          </div>
          <div className="hidden md:flex absolute -left-10 -top-8 w-20 h-20 bg-tertiary-container rounded-2xl items-center justify-center -rotate-12 shadow-lg z-10">
            <span
              className="material-symbols-outlined text-4xl text-on-tertiary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
          </div>

          <div className="bg-white/75 backdrop-blur-2xl rounded-2xl p-8 md:p-12 shadow-[0_8px_48px_0_rgba(45,47,44,0.08)] border border-white/50">
            <header className="mb-10 text-center">
              <div className="inline-flex p-4 rounded-full bg-secondary-container text-on-secondary-container mb-4">
                <span className="material-symbols-outlined text-4xl">
                  person_add
                </span>
              </div>
              <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">
                새로운 모험을 시작해요!
              </h2>
              <p className="mt-2 text-on-surface-variant font-medium text-sm">
                고유한 아이디를 만들고 우리 마을로 이사 오세요.
              </p>
            </header>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div className="md:col-span-2">
                <AuthField
                  id="loginId"
                  name="loginId"
                  label="패스포트 ID"
                  icon="id_card"
                  type="text"
                  placeholder="고유한 ID 선택"
                  value={form.loginId}
                  onChange={set("loginId")}
                  required
                  autoComplete="username"
                />
              </div>

              <AuthField
                id="name"
                name="name"
                label="실명"
                icon="badge"
                type="text"
                placeholder="섬 주민 이름"
                value={form.name}
                onChange={set("name")}
                required
              />

              <AuthField
                id="nickname"
                name="nickname"
                label="닉네임"
                icon="face"
                type="text"
                placeholder="뭐라고 불러드릴까요?"
                value={form.nickname}
                onChange={set("nickname")}
                required
              />

              <div className="md:col-span-2">
                <AuthField
                  id="email"
                  name="email"
                  label="이메일 주소"
                  icon="mail"
                  type="email"
                  placeholder="resident@oopslog.com"
                  value={form.email}
                  onChange={set("email")}
                  required
                  autoComplete="email"
                />
              </div>

              <AuthField
                id="phoneNumber"
                name="phoneNumber"
                label="전화번호"
                icon="phone_iphone"
                type="tel"
                placeholder="010-0000-0000"
                value={form.phoneNumber}
                onChange={set("phoneNumber")}
                required
                autoComplete="tel"
              />

              <AuthField
                id="birthDate"
                name="birthDate"
                label="생년월일"
                icon="calendar_month"
                type="date"
                value={form.birthDate}
                onChange={set("birthDate")}
                required
              />

              <div className="md:col-span-2 space-y-2">
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 font-headline font-bold text-sm text-primary px-1"
                >
                  <span className="material-symbols-outlined text-lg">
                    lock
                  </span>
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPw ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={set("password")}
                    required
                    autoComplete="new-password"
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

              <div className="md:col-span-2 space-y-2">
                <label
                  htmlFor="passwordConfirm"
                  className="flex items-center gap-2 font-headline font-bold text-sm text-primary px-1"
                >
                  <span className="material-symbols-outlined text-lg">
                    verified_user
                  </span>
                  비밀번호 확인
                </label>
                <div className="relative">
                  <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type={showPwConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                    autoComplete="new-password"
                    className="w-full h-14 px-5 pr-12 rounded-xl bg-surface-container-low border-2 border-transparent font-medium placeholder:text-outline/40 transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwConfirm((v) => !v)}
                    aria-label={
                      showPwConfirm ? "비밀번호 숨기기" : "비밀번호 보기"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPwConfirm ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {(error || localError) && (
                <div className="md:col-span-2">
                  <div className="rounded-xl border border-error/20 bg-error-container/30 px-4 py-3 text-sm text-error font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-base shrink-0">
                      warning
                    </span>
                    <p className="leading-5 break-words">
                      {localError ?? error}
                    </p>
                  </div>
                </div>
              )}

              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-16 bg-primary-container text-on-primary-container font-headline font-extrabold text-xl rounded-full shadow-[0_6px_0_0_#00557d] active:shadow-none active:translate-y-1.5 disabled:opacity-60 transition-all duration-150 flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <span className="material-symbols-outlined animate-spin text-2xl">
                      progress_activity
                    </span>
                  ) : (
                    <>
                      모험 시작하기!
                      <span className="material-symbols-outlined">sailing</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <footer className="mt-8 text-center">
              <p className="text-on-surface-variant font-medium text-sm">
                이미 계정이 있나요?{" "}
                <Link
                  to="/login"
                  className="text-primary font-bold hover:underline underline-offset-4"
                >
                  로그인
                </Link>
              </p>
            </footer>
          </div>
        </section>
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
