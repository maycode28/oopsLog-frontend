import { motion } from "framer-motion";
import type { AIResult } from "../api/ai";

type Props = {
  dir: number;
  aiData: AIResult | null;
  onRestart: () => void;
};

export default function ScreenRescue({ dir, aiData, onRestart }: Props) {
  return (
    <motion.div
      key="rescue"
      initial={{ x: dir >= 0 ? 60 : -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: dir >= 0 ? -60 : 60, opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="screen rescue-screen"
    >
      <div className="screen-inner rescue-inner">
        <h2>구조 완료</h2>

        <div className="animal-grid">
          {(aiData?.animals ?? []).map((animal, index) => (
            <div className="animal-card" key={`${animal.distortion}-${index}`}>
              <div className="animal-icon">{index === 0 ? "🦊" : index === 1 ? "🐻" : "🦉"}</div>
              <div className="animal-copy">
                <strong>{animal.distortion}</strong>
                <span>{animal.perspective}</span>
                <em>{animal.thanks}</em>
              </div>
            </div>
          ))}
        </div>

        <button className="primary-button" onClick={onRestart}>
          다시 시작
        </button>
      </div>
    </motion.div>
  );
}
