import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserSession } from "../../features/auth/utils/session";
import { mypageApi } from "../../features/mypage/api/mypageApi";
import type { FailureDetail } from "../../features/mypage/types/mypage.types";
import { translateDistortionLabel } from "../../utils/distortion";

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

const formatDetailDate = (value: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));

export default function FailureDetailPage() {
  const navigate = useNavigate();
  const { failureId } = useParams();
  const [detail, setDetail] = useState<FailureDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = getUserSession();
    const parsedFailureId = Number(failureId);

    if (!storedUser) {
      setIsLoading(false);
      setError("로그인 정보를 확인할 수 없습니다. 다시 로그인해 주세요.");
      return;
    }

    if (!Number.isFinite(parsedFailureId)) {
      navigate("/mypage", { replace: true });
      return;
    }

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await mypageApi.getFailureDetail(
          storedUser.userId,
          parsedFailureId,
        );
        setDetail(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "실패 상세 정보를 불러오는 중 오류가 발생했습니다.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [failureId, navigate]);

  return (
    <div className="relative min-h-[calc(100dvh-var(--app-header-height))] overflow-hidden bg-gradient-to-b from-primary-container to-white font-body text-on-surface">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-10 h-96 w-96 rounded-full bg-tertiary-container/30 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary-container/20 blur-[100px]" />
      </div>

      <Cloud className="left-[8%] top-[8%] animate-[float_7s_ease-in-out_infinite] opacity-80" />
      <Cloud className="right-0 top-[40%] scale-125 animate-[float_10s_ease-in-out_infinite_1s] opacity-60" />

      <main className="relative z-10 mx-auto flex min-h-[calc(100dvh-var(--app-header-height))] w-full max-w-5xl flex-col gap-6 px-4 py-8 md:px-6 lg:py-10">
        <section className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_28px_80px_-32px_rgba(23,97,139,0.45)] backdrop-blur-2xl md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <div>
                <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary-container px-4 py-2 font-headline text-sm font-bold text-on-primary-container">
                  <span className="material-symbols-outlined text-base">
                    psychiatry
                  </span>
                  실패 상세 분석
                </p>
                <h1 className="font-headline text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                  {isLoading
                    ? "기록을 불러오는 중이에요"
                    : detail?.title ?? "제목 없는 실패 기록"}
                </h1>
                <p className="mt-2 text-sm font-medium leading-6 text-on-surface-variant md:text-base">
                  남겨둔 감정과 분석 메시지를 천천히 다시 읽어볼 수 있어요.
                </p>
              </div>
            </div>

            {detail && (
              <div className="rounded-[1.5rem] bg-surface px-5 py-4 text-sm">
                <div className="mb-1 font-headline font-extrabold text-primary">
                  작성 시각
                </div>
                <div className="font-medium text-on-surface-variant">
                  {formatDetailDate(detail.createdAt)}
                </div>
              </div>
            )}
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

        {isLoading ? (
          <section className="grid gap-6">
            <div className="h-40 animate-pulse rounded-[2rem] bg-white/70" />
            <div className="h-56 animate-pulse rounded-[2rem] bg-white/70" />
            <div className="h-64 animate-pulse rounded-[2rem] bg-white/70" />
          </section>
        ) : detail ? (
          <>
            <section className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_20px_60px_-36px_rgba(45,47,44,0.45)] backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-on-primary">
                  <span className="material-symbols-outlined text-2xl">
                    lightbulb
                  </span>
                </div>
                <div>
                  <h2 className="font-headline text-xl font-extrabold text-primary">
                    분석 한마디
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    기록에서 읽힌 현재 마음의 흐름이에요.
                  </p>
                </div>
              </div>

              <p className="rounded-[1.5rem] bg-primary-container/40 px-5 py-5 text-base font-medium leading-8 text-on-primary-container">
                {detail.analysisMessage}
              </p>
            </section>

            <section className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_20px_60px_-36px_rgba(45,47,44,0.45)] backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-container text-on-secondary-container">
                  <span className="material-symbols-outlined text-2xl">
                    menu_book
                  </span>
                </div>
                <div>
                  <h2 className="font-headline text-xl font-extrabold text-primary">
                    내가 남긴 기록
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    그때의 생각과 감정을 그대로 담은 문장이에요.
                  </p>
                </div>
              </div>

              <p className="rounded-[1.5rem] bg-surface px-5 py-5 text-sm leading-7 text-on-surface">
                {detail.content}
              </p>
            </section>

            <section className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_20px_60px_-36px_rgba(45,47,44,0.45)] backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-tertiary-container text-on-tertiary-container">
                  <span className="material-symbols-outlined text-2xl">
                    style
                  </span>
                </div>
                <div>
                  <h2 className="font-headline text-xl font-extrabold text-primary">
                    인지 왜곡 카드
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    자동으로 떠오른 생각을 다른 시선으로 다시 볼 수 있어요.
                  </p>
                </div>
              </div>

              {detail.distortionCards.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {detail.distortionCards.map((card) => (
                    <article
                      key={`${detail.failureId}-${card.label}`}
                      className="rounded-[1.75rem] bg-surface px-5 py-5"
                    >
                      <div className="mb-4 inline-flex rounded-full bg-primary-container px-3 py-1.5 text-sm font-extrabold text-on-primary-container">
                        {translateDistortionLabel(card.label)}
                      </div>
                      <div className="space-y-4">
                        <div>
                          <div className="mb-1 text-xs font-bold tracking-[0.18em] text-error">
                            왜곡된 생각
                          </div>
                          <p className="text-sm leading-6 text-on-surface-variant">
                            {card.mistakenText}
                          </p>
                        </div>
                        <div>
                          <div className="mb-1 text-xs font-bold tracking-[0.18em] text-secondary">
                            다시 바라본 생각
                          </div>
                          <p className="text-sm leading-6 text-on-surface">
                            {card.reframedText}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="rounded-[1.75rem] bg-surface px-6 py-10 text-center">
                  <p className="text-sm leading-6 text-on-surface-variant">
                    아직 생성된 왜곡 카드가 없어요.
                  </p>
                </div>
              )}
            </section>

            <section className="rounded-[2rem] border border-white/60 bg-white/75 p-6 shadow-[0_20px_60px_-36px_rgba(45,47,44,0.45)] backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-high text-primary">
                  <span className="material-symbols-outlined text-2xl">
                    fact_check
                  </span>
                </div>
                <div>
                  <h2 className="font-headline text-xl font-extrabold text-primary">
                    객관적 사실
                  </h2>
                  <p className="text-sm text-on-surface-variant">
                    감정을 덜어내고 기록 속 사실만 차분하게 정리한 내용이에요.
                  </p>
                </div>
              </div>

              {detail.facts.length > 0 ? (
                <ul className="space-y-3">
                  {detail.facts.map((fact, index) => (
                    <li
                      key={`${detail.failureId}-fact-${index}`}
                      className="rounded-[1.5rem] bg-surface px-5 py-4 text-sm leading-6 text-on-surface"
                    >
                      {fact}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-[1.75rem] bg-surface px-6 py-10 text-center">
                  <p className="text-sm leading-6 text-on-surface-variant">
                    이번 기록에는 별도 사실 체크 항목이 없어요.
                  </p>
                </div>
              )}
            </section>
          </>
        ) : null}
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
