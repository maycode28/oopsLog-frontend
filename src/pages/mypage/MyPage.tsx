import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { mypageApi } from "../../features/mypage/api/mypageApi";
import type { FailureSummary } from "../../features/mypage/types/mypage.types";
import type { UserResponse } from "../../features/auth/types/auth.types";
import { getStoredUser } from "../../utils/session";

function Cloud({ className }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none select-none ${className}`}>
      <div className="relative">
        <div className="h-14 w-32 rounded-full bg-white/70" />
        <div className="absolute -top-5 left-5 h-14 w-14 rounded-full bg-white/70" />
        <div className="absolute -top-3 right-6 h-10 w-10 rounded-full bg-white/70" />
      </div>
    </div>
  );
}

const formatFullDate = (value: string | null) => {
  if (!value) {
    return "아직 입력되지 않았어요";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
};

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));

export default function MyPage() {
  const navigate = useNavigate();
  const { logout, isLoading: isLoggingOut } = useAuth();
  const [profile, setProfile] = useState<UserResponse | null>(null);
  const [failures, setFailures] = useState<FailureSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = getStoredUser();

    if (!storedUser) {
      navigate("/login", { replace: true });
      return;
    }

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [userProfile, failureList] = await Promise.all([
          mypageApi.getUserProfile(storedUser.userId),
          mypageApi.getFailures(storedUser.userId),
        ]);

        setProfile(userProfile);
        setFailures(failureList);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "마이페이지 정보를 불러오는 중 오류가 발생했습니다.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [navigate]);

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-primary-container/70 via-surface to-white font-body text-on-surface">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-16 top-0 h-80 w-80 rounded-full bg-tertiary-container/30 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-secondary-container/25 blur-[120px]" />
      </div>

      <Cloud className="right-[8%] top-[8%] animate-[float_7s_ease-in-out_infinite] opacity-80" />
      <Cloud className="-left-6 top-[42%] scale-125 animate-[float_9s_ease-in-out_infinite_1.5s] opacity-60" />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 md:px-6 lg:py-10">
        <section className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_28px_80px_-32px_rgba(23,97,139,0.45)] backdrop-blur-2xl md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5">
              <div className="space-y-3">
                <p className="inline-flex items-center gap-2 rounded-full bg-primary-container px-4 py-2 font-headline text-sm font-bold text-on-primary-container">
                  <span className="material-symbols-outlined text-base">
                    nest_eco_leaf
                  </span>
                  나의 마을 기록
                </p>
                <div>
                  <h1 className="font-headline text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                    {profile ? `${profile.nickname}님의 마이페이지` : "마이페이지"}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-on-surface-variant md:text-base">
                    지금까지 남긴 실패 기록과 나를 향한 다정한 해석을 한곳에서
                    돌아볼 수 있어요.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void logout()}
              disabled={isLoggingOut}
              className="inline-flex h-12 items-center justify-center gap-2 self-start rounded-full bg-surface-container px-5 font-headline text-sm font-bold text-primary transition hover:bg-primary hover:text-on-primary disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[20px]">
                logout
              </span>
              {isLoggingOut ? "나가는 중..." : "로그아웃"}
            </button>
          </div>
        </section>

        {error && (
          <section className="rounded-[1.75rem] border border-error/20 bg-error-container/25 px-5 py-4 text-sm font-medium text-error shadow-sm">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined shrink-0 text-lg">
                warning
              </span>
              <p>{error}</p>
            </div>
          </section>
        )}

        <section className="grid gap-6 lg:grid-cols-[1.1fr_1.6fr]">
          <article className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_20px_60px_-36px_rgba(45,47,44,0.45)] backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container">
                <span className="material-symbols-outlined text-2xl">
                  badge
                </span>
              </div>
              <div>
                <h2 className="font-headline text-xl font-extrabold text-primary">
                  내 정보
                </h2>
                <p className="text-sm text-on-surface-variant">
                  계정에 저장된 기본 프로필이에요.
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                <div className="h-20 animate-pulse rounded-2xl bg-surface-container" />
                <div className="h-20 animate-pulse rounded-2xl bg-surface-container" />
                <div className="h-20 animate-pulse rounded-2xl bg-surface-container" />
              </div>
            ) : profile ? (
              <div className="grid gap-3">
                {[
                  {
                    label: "이름",
                    value: profile.name,
                    icon: "id_card",
                  },
                  {
                    label: "닉네임",
                    value: profile.nickname,
                    icon: "face",
                  },
                  {
                    label: "가입일",
                    value: formatFullDate(profile.createdAt),
                    icon: "calendar_month",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.5rem] bg-surface px-4 py-4"
                  >
                    <div className="mb-2 flex items-center gap-2 text-sm font-bold text-primary">
                      <span className="material-symbols-outlined text-base">
                        {item.icon}
                      </span>
                      {item.label}
                    </div>
                    <p className="break-all text-sm font-medium leading-6 text-on-surface">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </article>

          <article className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_20px_60px_-36px_rgba(45,47,44,0.45)] backdrop-blur-xl">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tertiary-container text-on-tertiary-container">
                  <span className="material-symbols-outlined text-2xl">
                    auto_stories
                  </span>
                </div>
                <div>
                  <h2 className="font-headline text-xl font-extrabold text-primary">
                    실패 기록
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    항목을 누르면 상세 분석 페이지로 이동해요.
                  </p>
                </div>
              </div>

              <div className="shrink-0 whitespace-nowrap rounded-full bg-surface-container px-4 py-2 text-sm font-bold text-primary">
                총 {failures.length}개
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                <div className="h-28 animate-pulse rounded-[1.5rem] bg-surface-container" />
                <div className="h-28 animate-pulse rounded-[1.5rem] bg-surface-container" />
                <div className="h-28 animate-pulse rounded-[1.5rem] bg-surface-container" />
              </div>
            ) : failures.length > 0 ? (
              <div className="space-y-4">
                {failures.map((failure) => (
                  <Link
                    key={failure.failureId}
                    to={`/mypage/failures/${failure.failureId}`}
                    className="group block rounded-[1.75rem] border border-transparent bg-surface px-5 py-5 transition hover:-translate-y-0.5 hover:border-primary/20 hover:bg-white hover:shadow-[0_18px_36px_-24px_rgba(23,97,139,0.45)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="line-clamp-1 min-w-0 font-headline text-lg font-extrabold text-primary">
                            {failure.title ?? "제목 없는 실패 기록"}
                          </h3>
                          <div className="shrink-0 whitespace-nowrap text-xs font-semibold text-on-surface-variant">
                            {formatDateTime(failure.createdAt)}
                          </div>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-on-surface-variant">
                          {failure.content}
                        </p>
                      </div>

                      <span className="material-symbols-outlined mt-1 shrink-0 text-primary transition group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.75rem] bg-surface px-6 py-10 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-primary">
                  <span className="material-symbols-outlined text-3xl">
                    sentiment_calm
                  </span>
                </div>
                <h3 className="font-headline text-lg font-extrabold text-primary">
                  아직 기록된 실패가 없어요
                </h3>
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                  첫 번째 기록이 쌓이면 이곳에서 하나씩 돌아볼 수 있어요.
                </p>
              </div>
            )}
          </article>
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
