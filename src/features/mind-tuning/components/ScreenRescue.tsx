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
      <div className="score-bar">
        <button
          type="button"
          className="header-icon-button"
          aria-label="뒤로가기"
          onClick={() => window.history.back()}
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="score-bar__center">
          <span className="score-bar__brand">oopsLog</span>
          <span className="score-bar__score">{score} Score</span>
        </div>

        <button
          type="button"
          className="header-icon-button"
          aria-label="마이페이지로 이동"
          onClick={() => navigate('/mypage')}
        >
          <span className="material-symbols-outlined">account_circle</span>
        </button>
      </div>

      <div className="screen-inner rescue-inner">
        <h2 className="rescue-title">{aiData?.title ?? '마음 구조 현장'}</h2>

        <div className="analysis-panel" aria-live="polite">
          <h3>상황 속 객관적 사실</h3>
          <ul className="facts-list">
            {(aiData?.facts?.length ? aiData.facts : ['분석된 사실 데이터가 없습니다.']).map((fact, index) => (
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

        <p className="rescue-progress">
          {rescuedCount} / {animals.length} 교정 완료
        </p>

        {isGameClear ? (
          <div className="rescue-result-panel" aria-live="polite">
            <p className="rescue-result-score">{score} Score</p>
            <p className="rescue-result-message">
              {aiData?.analysisMessage ?? aiData?.summary ?? '모든 왜곡 사고 카드를 정리했습니다.'}
            </p>
          </div>
        ) : null}

        <button className="primary-button" onClick={onRestart}>
          다시 보기
        </button>
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
              +{popup.value} Score
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
