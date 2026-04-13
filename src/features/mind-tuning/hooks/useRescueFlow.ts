import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  RESCUE_ANIMALS,
  RESCUE_PHASE_DELAY,
  SCORE_POPUP_DURATION,
} from "../constants/app";
import type { AIResult, AnimalId, AnimalStateMap, ScorePopup } from "../types/mindTuning.types";

const getRescueAnimals = (aiData: AIResult | null) => {
  const count = aiData?.animals.length ?? 0;

  return Array.from({ length: count }, (_, index) => {
    const template = RESCUE_ANIMALS[index % RESCUE_ANIMALS.length];

    return {
      ...template,
      id: `animal-${index}`,
    };
  });
};

const toAnimalStateMap = (aiData: AIResult | null): AnimalStateMap =>
  getRescueAnimals(aiData).reduce<AnimalStateMap>((acc, animal, index) => {
    acc[animal.id] = {
      step: 1,
      isBackVisible: false,
      data: aiData?.animals?.[index] ?? {},
    };

    return acc;
  }, {});

export function useRescueFlow(aiData: AIResult | null) {
  const animals = useMemo(() => getRescueAnimals(aiData), [aiData]);
  const [animalStates, setAnimalStates] = useState<AnimalStateMap>(() => toAnimalStateMap(aiData));
  const [scorePopups, setScorePopups] = useState<ScorePopup[]>([]);

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

      if (current.step !== 1) {
        if (current.step === 4) {
          setAnimalStates((prev) => ({
            ...prev,
            [id]: {
              ...prev[id],
              isBackVisible: !prev[id].isBackVisible,
            },
          }));
        }
        return;
      }

      setAnimalStates((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          step: 2,
        },
      }));

      schedule(() => {
        setAnimalStates((prev) => ({
          ...prev,
          [id]: {
            ...prev[id],
            step: 4,
            isBackVisible: true,
          },
        }));

        showScorePopup(10);
      }, RESCUE_PHASE_DELAY);
    },
    [animalStates, schedule, showScorePopup],
  );

  const rescuedCount = useMemo(
    () => animals.filter((animal) => animalStates[animal.id]?.step === 4).length,
    [animals, animalStates],
  );

  const totalScore = useMemo(
    () => rescuedCount * 10,
    [rescuedCount],
  );

  return {
    animals,
    animalStates,
    score: totalScore,
    scorePopups,
    rescuedCount,
    handleAnimalClick,
  };
}
