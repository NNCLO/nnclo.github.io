"use client";
import { useMediaQuery } from "./showcase/hooks";
import MobileLoaderSection from "./showcase/MobileLoaderSection";
import JourneyOpening from "./showcase/JourneyOpening";
import MaxSection from "./showcase/MaxSection";
import ArcJourney from "./showcase/ArcJourney";
import CinematicTimeline from "./showcase/CinematicTimeline";
import CinematicCardFrame from "./showcase/CinematicCardFrame";

export function Showcase() {
  const isMobile = useMediaQuery(768);

  return (
    <section
      className="mb-[30px]"
      data-s="showcase"
      aria-labelledby="showcase-title"
    >
      {/* Global keyframes (bisa dipindah ke global CSS) */}
      <style>{`
        @keyframes arcCursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes arcSparkle {
          0%, 100% { opacity: 0; transform: scale(0) translateY(0px); }
          25%      { opacity: 0.5; }
          50%      { opacity: 0.8; transform: scale(1) translateY(-4px); }
          75%      { opacity: 0.3; }
        }
        @keyframes arcLinePulse {
          0%, 100% { opacity: 0.35; }
          50%      { opacity: 0.7; }
        }
      `}</style>

      {isMobile && <MobileLoaderSection />}

      <div className="relative">
        <CinematicTimeline stations={3} />

        <CinematicCardFrame step="01" title="Journey">
          <JourneyOpening />
        </CinematicCardFrame>

        <CinematicCardFrame step="02" title="Max">
          <MaxSection />
        </CinematicCardFrame>

        <CinematicCardFrame step="03" title="Arc">
          <ArcJourney />
        </CinematicCardFrame>
      </div>
    </section>
  );
}
