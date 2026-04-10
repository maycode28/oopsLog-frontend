import { AnimatePresence } from "framer-motion";
import ScreenConfession from "../../features/mind-tuning/components/ScreenConfession";
import ScreenScanning from "../../features/mind-tuning/components/ScreenScanning";
import ScreenRescue from "../../features/mind-tuning/components/ScreenRescue";
import { useMindTuning } from "../../features/mind-tuning/hooks/useMindTuning";
import "../../features/mind-tuning/styles/mind-tuning.css";

export default function MindTuningPage() {
    const {
        screen,
        aiData,
        isLoading,
        dir,
        handleConfess,
        handleRestart,
    } = useMindTuning();

    return (
        <div className="app-shell">
            <div className="phone-frame">
                <AnimatePresence mode="wait" custom={dir}>
                    {screen === "confession" && (
                        <ScreenConfession
                            key="confession"
                            dir={dir}
                            onSubmit={handleConfess}
                        />
                    )}

                    {screen === "scanning" && (
                        <ScreenScanning
                            key="scanning"
                            dir={dir}
                            isLoading={isLoading}
                        />
                    )}

                    {screen === "rescue" && (
                        <ScreenRescue
                            key={`rescue-${aiData?.title ?? "empty"}-${aiData?.summary ?? "empty"}`}
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
