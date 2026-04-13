import { motion } from "framer-motion";

import type { ScreenScanningProps } from "../types/mindTuning.types";
import ScanningIndicator from "./ScanningIndicator";

export default function ScreenScanning({ dir, isLoading, mode, gameTip }: ScreenScanningProps) {
  const title = mode === "restart" ? "숲속 구조대를 다시 준비하는 중..." : "나를 도와줄 동물들을 찾는 중...";
  const message =
    mode === "restart"
      ? "처음 화면으로 돌아가기 전에 오늘의 마음 구조 팁을 전해드릴게요."
      : isLoading
        ? "AI가 감정 신호를 읽고 있어요"
        : "분석이 끝나서 구조 화면으로 이동하고 있어요";

  return (
    <motion.div
      key="scanning"
      initial={{ x: dir >= 0 ? 60 : -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: dir >= 0 ? -60 : 60, opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="screen scanning-screen"
    >
      <div className="moon" />
      <div className="scan-beam" />

      <div className="screen-inner scanning-inner">
        <ScanningIndicator isLoading={isLoading} title={title} message={message} gameTip={gameTip} />
      </div>
    </motion.div>
  );
}
