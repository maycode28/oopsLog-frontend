import { AnimatePresence } from 'framer-motion';
import ScreenConfession from '../../features/mind-tuning/components/ScreenConfession';
import ScreenRescue from '../../features/mind-tuning/components/ScreenRescue';
import ScreenScanning from '../../features/mind-tuning/components/ScreenScanning';
import { useMindTuning } from '../../features/mind-tuning/hooks/useMindTuning';
import '../../features/mind-tuning/styles/mind-tuning.css';

export default function MindTuningPage() {
  const { screen, aiData, errorMessage, isLoading, dir, loadingMode, currentGameTip, handleConfess, handleRestart } =
    useMindTuning();

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <AnimatePresence mode="wait" custom={dir}>
          {screen === 'confession' && (
            <ScreenConfession
              key="confession"
              dir={dir}
              errorMessage={errorMessage}
              isSubmitting={isLoading}
              onSubmit={handleConfess}
            />
          )}

          {screen === 'scanning' && (
            <ScreenScanning key="scanning" dir={dir} isLoading={isLoading} mode={loadingMode} gameTip={currentGameTip} />
          )}

          {screen === 'rescue' && (
            <ScreenRescue
              key={`rescue-${aiData?.title ?? 'empty'}-${aiData?.summary ?? 'empty'}`}
              dir={dir}
              aiData={aiData}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
