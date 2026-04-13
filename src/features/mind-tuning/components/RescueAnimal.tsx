import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useEffect, useRef } from 'react';

import type { RescueAnimalProps } from '../types/mindTuning.types';

export default function RescueAnimal({ animal, state, onClick }: RescueAnimalProps) {
  const isClickable = state.step === 1;
  const isFlipped = state.step >= 4;
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const previousFlippedRef = useRef(isFlipped);

  useEffect(() => {
    const didFlip = isFlipped && !previousFlippedRef.current;
    previousFlippedRef.current = isFlipped;

    if (!didFlip || !bubbleRef.current) {
      return;
    }

    const rect = bubbleRef.current.getBoundingClientRect();
    const origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };

    confetti({
      particleCount: 28,
      spread: 72,
      startVelocity: 28,
      decay: 0.92,
      scalar: 0.8,
      colors: ['#90cdfd', '#abf771', '#ffffff', '#17618b'],
      origin,
      zIndex: 30,
    });

    confetti({
      particleCount: 18,
      spread: 110,
      startVelocity: 22,
      decay: 0.94,
      scalar: 0.6,
      colors: ['#90cdfd', '#abf771', '#ffffff'],
      origin,
      zIndex: 30,
    });
  }, [isFlipped]);

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
      className={`animal-card step-${state.step} ${isClickable ? 'clickable' : ''}`}
      onClick={isClickable ? onClick : undefined}
      whileTap={isClickable ? { scale: 0.96 } : undefined}
      layout
    >
      <motion.div
        className="animal-bubble-scene"
        ref={bubbleRef}
        initial={false}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: state.step === 2 ? [1, 1.04, 1] : 1,
        }}
        transition={{
          rotateY: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 0.32 },
        }}
      >
        <div className="animal-bubble-face animal-bubble-front bubble-step-1">
          <div className="animal-bubble__content">
            {state.data.label ? <div className="animal-tag">{state.data.label}</div> : null}
            <p>{state.data.distortion ?? ''}</p>
          </div>
        </div>

        <div className="animal-bubble-face animal-bubble-back bubble-step-4">
          <div className="animal-bubble__content">
            {state.data.label ? <div className="animal-tag animal-tag--success">{state.data.label}</div> : null}
            <p>{state.data.perspective ?? ''}</p>
          </div>
        </div>
      </motion.div>

      <motion.div className={`animal-emoji animal-${animal.id}`} animate={animalMotion} transition={{ duration: 0.45 }}>
        {animal.emoji}
      </motion.div>

      <div className="animal-name">{animal.name}</div>

    </motion.div>
  );
}
