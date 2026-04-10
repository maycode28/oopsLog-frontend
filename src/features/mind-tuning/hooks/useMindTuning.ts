import { useEffect, useRef, useState } from "react";

import { FALLBACK_DATA, fetchAIData } from "../api/ai";
import { SCANNING_DELAY, SCREEN_ORDER } from "../constants/app";
import type { AIResult, ScreenName, UseMindTuningReturn } from "../types/mindTuning.types";

export function useMindTuning(): UseMindTuningReturn {
  const [screen, setScreen] = useState<ScreenName>("confession");
  const [aiData, setAiData] = useState<AIResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dir, setDir] = useState(1);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const getDir = (current: ScreenName, next: ScreenName) => {
    const curIndex = SCREEN_ORDER.indexOf(current);
    const nextIndex = SCREEN_ORDER.indexOf(next);
    return nextIndex >= curIndex ? 1 : -1;
  };

  const handleConfess = async (text: string) => {
    clearTimer();

    setIsLoading(true);
    setAiData(null);
    setDir(getDir(screen, "scanning"));
    setScreen("scanning");

    try {
      const data = await fetchAIData(text);
      setAiData(data);
    } catch (error) {
      console.error("AI 데이터 로딩 실패:", error);
      setAiData(FALLBACK_DATA);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    clearTimer();
    setDir(-1);
    setAiData(null);
    setIsLoading(false);
    setScreen("confession");
  };

  useEffect(() => {
    if (screen === "scanning" && aiData) {
      timerRef.current = setTimeout(() => {
        setDir(1);
        setScreen("rescue");
      }, SCANNING_DELAY);
    }

    return clearTimer;
  }, [screen, aiData]);

  return {
    screen,
    aiData,
    isLoading,
    dir,
    handleConfess,
    handleRestart,
  };
}
