import type { ScanningIndicatorProps } from "../types/mindTuning.types";

export default function ScanningIndicator({ isLoading, message }: ScanningIndicatorProps) {
    return (
        <>
            <div className="scan-title">나를 도와줄 동물들을 찾는 중...</div>
            <div className="scan-dots">
                <span />
                <span />
                <span />
            </div>
            <p className="subtitle">
                {message ?? (isLoading ? "AI가 감정 신호를 읽고 있어요" : "분석 완료")}
            </p>
        </>
    );
}