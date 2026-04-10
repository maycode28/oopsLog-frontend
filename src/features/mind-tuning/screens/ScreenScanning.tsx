import { motion } from "framer-motion";

type Props = {
  dir: number;
  isLoading: boolean;
};

export default function ScreenScanning({ dir, isLoading }: Props) {
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
        <div className="scan-title">숲속을 찾는 중...</div>
        <div className="scan-dots">
          <span />
          <span />
          <span />
        </div>
        <p>{isLoading ? "AI가 감정 신호를 읽고 있어요" : "분석 완료"}</p>
      </div>
    </motion.div>
  );
}
