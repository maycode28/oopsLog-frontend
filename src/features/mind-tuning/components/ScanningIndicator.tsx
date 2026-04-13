import type { ScanningIndicatorProps } from "../types/mindTuning.types";

export default function ScanningIndicator({ isLoading, title, message, gameTip }: ScanningIndicatorProps) {
  return (
    <>
      <div className="scan-title">{title ?? "나를 도와줄 동물들을<br /> 찾는 중..."}</div>
      <div className="scan-dots" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p className="subtitle">{message ?? (isLoading ? "AI가 감정 신호를 읽고 있어요" : "분석 완료")}</p>

      {gameTip ? (
        <div className="game-tip-card" aria-live="polite">
          <p className="game-tip-card__label">Game Tip</p>
          <p className="game-tip-card__body">{gameTip}</p>
        </div>
      ) : null}
    </>
  );
}
