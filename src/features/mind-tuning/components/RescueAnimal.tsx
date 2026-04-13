import { AnimatePresence, motion } from "framer-motion";

import type { RescueAnimalProps } from "../types/mindTuning.types";

function getBubbleText(step: RescueAnimalProps["state"]["step"], data: RescueAnimalProps["state"]["data"]) {
  switch (step) {
    case 0:
      return "...";
    case 1:
      return data.distortion ?? "완벽해야만 한다는 생각이 올라와요...";
    case 2:
      return data.distortion ?? "모든 게 내 잘못처럼 느껴져요...";
    case 3:
      return data.perspective ?? "지금 힘든 건 사실이지만, 내가 부족해서만은 아니에요.";
    case 4:
      return data.thanks ?? "들어줘서 고마워요. 마음이 조금 가벼워졌어요.";
    default:
      return "...";
  }
}

export default function RescueAnimal({ animal, state, sparkleSeed, onClick }: RescueAnimalProps) {
  const isClickable = state.step === 0 || state.step === 1;

  const animalMotion =
    state.step === 1
      ? {
          rotate: [0, -4, 4, -4, 0],
          y: [0, -2, 0],
        }
      : state.step === 2
        ? {
            scale: [1, 1.18, 0.95, 1],
          }
        : {
            rotate: 0,
            scale: 1,
            y: 0,
          };

  return (
    <motion.div
      className={`animal-card step-${state.step} ${isClickable ? "clickable" : ""}`}
      onClick={isClickable ? onClick : undefined}
      whileTap={isClickable ? { scale: 0.96 } : undefined}
      layout
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`bubble-${state.step}`}
          className={`animal-bubble bubble-step-${state.step}`}
          initial={{ opacity: 0, y: 8, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.95 }}
          transition={{ duration: 0.22 }}
        >
          {getBubbleText(state.step, state.data)}
        </motion.div>
      </AnimatePresence>

      <motion.div className={`animal-emoji animal-${animal.id}`} animate={animalMotion} transition={{ duration: 0.45 }}>
        {animal.emoji}
      </motion.div>

      <div className="animal-name">{animal.name}</div>

      <AnimatePresence>
        {state.step === 2 && (
          <motion.div
            key={`sparkle-${sparkleSeed}`}
            className="animal-sparkles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.span
              className="sparkle sparkle-1"
              initial={{ opacity: 0, scale: 0.4, y: 0 }}
              animate={{ opacity: 1, scale: 1.1, y: -18 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              ✨
            </motion.span>
            <motion.span
              className="sparkle sparkle-2"
              initial={{ opacity: 0, scale: 0.4, y: 0 }}
              animate={{ opacity: 1, scale: 1.1, y: -26 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              🌟
            </motion.span>
            <motion.span
              className="sparkle sparkle-3"
              initial={{ opacity: 0, scale: 0.4, y: 0 }}
              animate={{ opacity: 1, scale: 1.1, y: -14 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              💫
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
