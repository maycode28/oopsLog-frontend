import { motion } from "framer-motion";

import type { ScreenConfessionProps } from "../types/mindTuning.types";
import ConfessionForm from "./ConfessionForm";

export default function ScreenConfession({ dir, errorMessage, isSubmitting, onSubmit }: ScreenConfessionProps) {
  return (
    <motion.div
      key="confession"
      initial={{ x: dir >= 0 ? 60 : -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: dir >= 0 ? -60 : 60, opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="screen confession-screen"
    >
      <div className="screen-inner confession-inner">
        <h1>곤란한 동물 찾기</h1>
        <p className="subtitle">
          오늘 있었던 일을 천천히 들려주세요.<br />
          마음속에서 길을 잃은 동물 친구들을 찾아서<br />
          안전하게 진정시켜 볼게요.
        </p>

        <ConfessionForm onSubmit={onSubmit} errorMessage={errorMessage} isSubmitting={isSubmitting} />
      </div>
    </motion.div>
  );
}
