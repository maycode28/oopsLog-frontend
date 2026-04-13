import { motion } from "framer-motion";

import type { ScreenScanningProps } from "../types/mindTuning.types";
import ScanningIndicator from "./ScanningIndicator";

export default function ScreenScanning({ dir, isLoading, mode, gameTip }: ScreenScanningProps) {
  const title = mode === "restart" ? "구조 산책로를 다시 정리하는 중..." : "곤란한 동물 친구들을 찾는 중...";
  const message =
    mode === "restart"
      ? "다시 출발하기 전에 오늘의 마음 돌봄 팁을 챙겨드릴게요."
      : isLoading
        ? "이야기 속에서 도움이 필요한 친구들을 살펴보고 있어요."
        : "동물 친구들을 찾았어요. 이제 한 마리씩 도와주러 가요.";

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
