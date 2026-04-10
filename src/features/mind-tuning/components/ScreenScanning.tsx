import { motion } from "framer-motion";

import type { ScreenScanningProps } from "../types/mindTuning.types";
import ScanningIndicator from "./ScanningIndicator";

export default function ScreenScanning({ dir, isLoading }: ScreenScanningProps) {
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
        <ScanningIndicator isLoading={isLoading} />
      </div>
    </motion.div>
  );
}
