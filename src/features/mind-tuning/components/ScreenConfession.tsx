import { motion } from "framer-motion";

import type { ScreenConfessionProps } from "../types/mindTuning.types";
import ConfessionForm from "./ConfessionForm";

export default function ScreenConfession({ dir, onSubmit }: ScreenConfessionProps) {
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
        <div className="leaf-icon">🌿</div>
        <h1>마음 고백</h1>
        <p className="subtitle">
          오늘 마음에 무거움이 있다면 여기에 털어놓아 주세요.
          <br />
          작은 숲속 친구들이 함께 들어줄게요.
        </p>

        <ConfessionForm onSubmit={onSubmit} />
      </div>
    </motion.div>
  );
}
