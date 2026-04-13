import { AnimatePresence, motion } from "framer-motion";

import type { ScreenRescueProps } from "../types/mindTuning.types";
import { useRescueFlow } from "../hooks/useRescueFlow";
import RescueAnimal from "./RescueAnimal";

export default function ScreenRescue({ dir, aiData, onRestart }: ScreenRescueProps) {
  const { animals, animalStates, sparkleIds, score, scorePopups, rescuedCount, handleAnimalClick } =
    useRescueFlow(aiData);

  return (
    <motion.div
      key="rescue"
      initial={{ x: dir >= 0 ? 60 : -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: dir >= 0 ? -60 : 60, opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="screen rescue-screen"
    >
      <div className="score-bar">
        <span className="score-bar__brand">oopsLog 🌿</span>
        <span className="score-bar__score">{score} Score</span>
      </div>

      <div className="screen-inner rescue-inner">
        <h2 className="rescue-title">마음 구조 현장</h2>
        <p className="rescue-subtitle">동물의 말풍선을 눌러 구조를 시작해보세요</p>

        <div className="user-avatar">🧑</div>

        <div className="animal-grid">
          {animals.map((animal) => (
            <RescueAnimal
              key={animal.id}
              animal={animal}
              state={animalStates[animal.id]}
              sparkleSeed={sparkleIds[animal.id]}
              onClick={() => handleAnimalClick(animal.id)}
            />
          ))}
        </div>

        <p className="rescue-progress">
          {rescuedCount} / {animals.length} 구조 완료
        </p>

        <button className="primary-button" onClick={onRestart}>
          다시 시작
        </button>
      </div>

      <AnimatePresence>
        {scorePopups.map((popup) => (
          <motion.div
            key={popup.id}
            className="score-popup"
            initial={{ opacity: 0, y: 8, scale: 0.8 }}
            animate={{ opacity: 1, y: -16, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.9 }}
            transition={{ duration: 0.45 }}
          >
            +{popup.value} Score
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
