import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import ScreenConfession from "./features/mind-tuning/screens/ScreenConfession";
import ScreenScanning from "./features/mind-tuning/screens/ScreenScanning";
import ScreenRescue from "./features/mind-tuning/screens/ScreenRescue";
import { SCREEN_ORDER, type ScreenName } from "./features/mind-tuning/constants/app";
import { FALLBACK_DATA, fetchAIData, type AIResult } from "./features/mind-tuning/api/ai";

export default function App() {
  const [screen, setScreen] = useState<ScreenName>("confession");
  const [aiData, setAiData] = useState<AIResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dirRef = useRef<number>(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getDir = (next: ScreenName) => {
    const cur = SCREEN_ORDER.indexOf(screen);
    const dest = SCREEN_ORDER.indexOf(next);
    return dest >= cur ? 1 : -1;
  };

  const handleConfess = async (text: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setIsLoading(true);
    setAiData(null);
    dirRef.current = getDir("scanning");
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

  useEffect(() => {
    if (screen === "scanning" && aiData) {
      timerRef.current = setTimeout(() => {
        dirRef.current = 1;
        setScreen("rescue");
      }, 500);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [screen, aiData]);

  const handleRestart = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    dirRef.current = -1;
    setAiData(null);
    setIsLoading(false);
    setScreen("confession");
  };

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <AnimatePresence mode="wait" custom={dirRef.current}>
          {screen === "confession" && (
            <ScreenConfession key="confession" dir={dirRef.current} onSubmit={handleConfess} />
          )}

          {screen === "scanning" && (
            <ScreenScanning key="scanning" dir={dirRef.current} isLoading={isLoading} />
          )}

          {screen === "rescue" && (
            <ScreenRescue
              key="rescue"
              dir={dirRef.current}
              aiData={aiData}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
