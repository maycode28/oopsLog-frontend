import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useRescueFlow } from '../hooks/useRescueFlow';
import type { ScreenRescueProps } from '../types/mindTuning.types';
import RescueAnimal from './RescueAnimal';

export default function ScreenRescue({ dir, aiData, onRestart }: ScreenRescueProps) {
  const navigate = useNavigate();
  const { animals, animalStates, score, scorePopups, rescuedCount, handleAnimalClick } = useRescueFlow(aiData);
  const isGameClear = rescuedCount === animals.length && animals.length > 0;

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
        <h2 className="rescue-title">{aiData?.title ?? '동물 친구들을 만나고 있어요'}</h2>

        <div className="analysis-panel" aria-live="polite">
          <h3>상황 단서</h3>
          <ul className="facts-list">
            {(aiData?.facts?.length ? aiData.facts : ['아직 정리된 단서가 없어요.']).map((fact, index) => (
              <li key={`${fact}-${index}`}>
                <span className="facts-list__icon" aria-hidden="true">
                  🌿
                </span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="user-avatar">🪴</div>

        <p className="rescue-intro">카드를 뒤집어 곤경에 처한 동물들을 도와주세요.</p>

        <div className="animal-grid">
          {animals.map((animal) => (
            <RescueAnimal
              key={animal.id}
              animal={animal}
              state={animalStates[animal.id]}
              onClick={() => handleAnimalClick(animal.id)}
            />
          ))}
        </div>

        <p className="rescue-helper">카드는 다시 눌러 앞뒤를 볼 수 있어요.</p>

        <p className="rescue-progress">
          {rescuedCount} / {animals.length}마리 만났어요
        </p>

        {isGameClear ? (
          <div className="rescue-result-panel" aria-live="polite">
            <p className="rescue-result-score">총 {score}점</p>
            <p className="rescue-result-message">
              {aiData?.analysisMessage ?? aiData?.summary ?? '동물 친구들을 모두 만났어요. 이제 마을에서 다시 볼 수 있어요.'}
            </p>
          </div>
        ) : null}

        <button className="primary-button" onClick={onRestart}>
          다른 이야기 쓰기
        </button>

        {isGameClear ? (
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate('/mypage')}
          >
            마을에서 보기
          </button>
        ) : null}
      </div>

      <div className="score-popup-layer">
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
              +{popup.value}점
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
