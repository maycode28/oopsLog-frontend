import { useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';

import { fetchAIData } from '../api/ai';
import { GAME_TIPS, RESTART_LOADING_DELAY, SCANNING_DELAY, SCREEN_ORDER } from '../constants/app';
import type { AIResult, GameTip, LoadingMode, ScreenName, UseMindTuningReturn } from '../types/mindTuning.types';

export function useMindTuning(): UseMindTuningReturn {
  const [screen, setScreen] = useState<ScreenName>('confession');
  const [aiData, setAiData] = useState<AIResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dir, setDir] = useState(1);
  const [loadingMode, setLoadingMode] = useState<LoadingMode>('analysis');
  const [currentGameTip, setCurrentGameTip] = useState<GameTip | null>(null);

  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimeoutRef = (timerRef: MutableRefObject<ReturnType<typeof setTimeout> | null>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const clearAllTimers = () => {
    clearTimeoutRef(transitionTimerRef);
    clearTimeoutRef(restartTimerRef);
  };

  const getDir = (current: ScreenName, next: ScreenName) => {
    const curIndex = SCREEN_ORDER.indexOf(current);
    const nextIndex = SCREEN_ORDER.indexOf(next);
    return nextIndex >= curIndex ? 1 : -1;
  };

  const getRandomGameTip = () => GAME_TIPS[Math.floor(Math.random() * GAME_TIPS.length)];

  const handleConfess = async (text: string) => {
    clearAllTimers();

    setErrorMessage(null);
    setCurrentGameTip(null);
    setLoadingMode('analysis');
    setIsLoading(true);
    setAiData(null);
    setDir(getDir(screen, 'scanning'));
    setScreen('scanning');

    try {
      const data = await fetchAIData(text);
      setAiData(data);
    } catch (error) {
      console.error('AI 분석 로딩 실패:', error);
      setAiData(null);
      setErrorMessage(error instanceof Error ? error.message : '분석 중 오류가 발생했습니다.');
      setDir(getDir('scanning', 'confession'));
      setScreen('confession');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    clearAllTimers();
    setErrorMessage(null);
    setLoadingMode('restart');
    setCurrentGameTip(getRandomGameTip());
    setIsLoading(true);
    setDir(getDir('rescue', 'scanning'));
    setScreen('scanning');

    restartTimerRef.current = setTimeout(() => {
      setDir(-1);
      setAiData(null);
      setErrorMessage(null);
      setCurrentGameTip(null);
      setIsLoading(false);
      setLoadingMode('analysis');
      setScreen('confession');
      restartTimerRef.current = null;
    }, RESTART_LOADING_DELAY);
  };

  useEffect(() => {
    if (screen !== 'scanning' || loadingMode !== 'analysis' || !aiData) {
      clearTimeoutRef(transitionTimerRef);
      return;
    }

    transitionTimerRef.current = setTimeout(() => {
      setDir(1);
      setScreen('rescue');
      transitionTimerRef.current = null;
    }, SCANNING_DELAY);

    return () => clearTimeoutRef(transitionTimerRef);
  }, [screen, loadingMode, aiData]);

  useEffect(() => clearAllTimers, []);

  return {
    screen,
    aiData,
    errorMessage,
    isLoading,
    dir,
    loadingMode,
    currentGameTip,
    handleConfess,
    handleRestart,
  };
}
