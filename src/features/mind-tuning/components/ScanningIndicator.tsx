import type { ScanningIndicatorProps } from "../types/mindTuning.types";

export default function ScanningIndicator({ isLoading, title, message, gameTip }: ScanningIndicatorProps) {
  return (
    <>
      <div className="scan-title">{title ?? "곤란한 동물 친구들을<br /> 찾는 중..."}</div>
      <div className="scan-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="subtitle">{message ?? (isLoading ? "도움이 필요한 동물 친구들을 살펴보고 있어요." : "구조 준비 완료")}</p>

      {gameTip ? (
        <div className="game-tip-card" aria-live="polite">
          <p className="game-tip-card__label">Mind Tip</p>
          <p className="game-tip-card__body">{gameTip}</p>
        </div>
      ) : null}
    </>
  );
}
