import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  RESCUE_ANIMALS,
  RESCUE_COMPLETE_DELAY,
  RESCUE_PHASE_DELAY,
  SCORE_POPUP_DURATION,
} from "../constants/app";
import type { AIResult, AnimalId, AnimalStateMap, ScorePopup } from "../types/mindTuning.types";

const toAnimalStateMap = (aiData: AIResult | null): AnimalStateMap => ({
  turtle: {
    step: 0,
    data: aiData?.animals?.[0] ?? {},
  },
  squirrel: {
    step: 0,
    data: aiData?.animals?.[1] ?? {},
  },
  bird: {
    step: 0,
    data: aiData?.animals?.[2] ?? {},
  },
});

export function useRescueFlow(aiData: AIResult | null) {
  const [animalStates, setAnimalStates] = useState<AnimalStateMap>(() => toAnimalStateMap(aiData));
  const [score, setScore] = useState(0);
  const [scorePopups, setScorePopups] = useState<ScorePopup[]>([]);
  const [sparkleIds, setSparkleIds] = useState<Record<AnimalId, number>>({
    turtle: 0,
    squirrel: 0,
    bird: 0,
  });

  const timeoutsRef = useRef<number[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    timeoutsRef.current = [];
  }, []);

  const schedule = useCallback((callback: () => void, delay: number) => {
    const id = window.setTimeout(callback, delay);
    timeoutsRef.current.push(id);
    return id;
  }, []);

  useEffect(() => clearTimeouts, [clearTimeouts]);

  const showScorePopup = useCallback(
    (value: number) => {
      const id = Date.now();
      setScorePopups((prev) => [...prev, { id, value }]);

      schedule(() => {
        setScorePopups((prev) => prev.filter((item) => item.id !== id));
      }, SCORE_POPUP_DURATION);
    },
    [schedule],
  );

  const handleAnimalClick = useCallback(
    (id: AnimalId) => {
      const current = animalStates[id];
      if (!current) {
        return;
      }

      if (current.step === 0) {
        setAnimalStates((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            step: 1,
          },
        }));
        return;
      }

      if (current.step !== 1) {
        return;
      }

      setAnimalStates((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          step: 2,
        },
      }));

      setSparkleIds((prev) => ({ ...prev, [id]: Date.now() }));

      schedule(() => {
        setAnimalStates((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            step: 3,
          },
        }));

        schedule(() => {
          setAnimalStates((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              step: 4,
            },
          }));

          setScore((prev) => prev + 10);
          showScorePopup(10);
        }, RESCUE_COMPLETE_DELAY);
      }, RESCUE_PHASE_DELAY);
    },
    [animalStates, schedule, showScorePopup],
  );

  const rescuedCount = useMemo(
    () => Object.values(animalStates).filter((animal) => animal.step === 4).length,
    [animalStates],
  );

  return {
    animals: RESCUE_ANIMALS,
    animalStates,
    sparkleIds,
    score,
    scorePopups,
    rescuedCount,
    handleAnimalClick,
  };
}
