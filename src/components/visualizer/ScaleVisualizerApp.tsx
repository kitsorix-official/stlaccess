import React, { Suspense, useState } from 'react';
import { Scene } from './Scene';
import { ControlPanel } from '../ui-scaler/ControlPanel';
import { ViewportHUD } from '../ui-scaler/ViewportHUD';
import { ScaleGuideModal } from '../ui-scaler/ScaleGuideModal';
import { useDeepLinking } from '@/hooks/visualizer/useDeepLinking';
import { Loader2 } from 'lucide-react';

function LoadingScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0A0A0B] text-[#88888C] gap-3 font-mono">
      <Loader2 className="w-7 h-7 text-[#ff6b35] animate-spin" />
      <span className="text-xs uppercase tracking-wider">Initializing 3D Engine...</span>
    </div>
  );
}

export default function ScaleVisualizerApp() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  useDeepLinking();

  return (
    <div className="flex flex-col h-full w-full bg-[#0A0A0B] text-[#E0E0E0] overflow-hidden font-sans select-none">
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <section
          id="visualizer-viewport-section"
          aria-label="3D Miniature Comparison Canvas"
          className="flex-1 h-[45vh] lg:h-auto relative bg-[#0A0A0B] overflow-hidden"
        >
          <Suspense fallback={<LoadingScreen />}>
            <Scene />
          </Suspense>
          <ViewportHUD />
        </section>

        <aside
          id="control-sidebar-section"
          aria-label="Scale Engine Controls"
          className="w-full lg:w-[400px] xl:w-[440px] h-[55vh] lg:h-full shrink-0 z-20"
        >
          <ControlPanel />
        </aside>
      </main>

      <ScaleGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
    </div>
  );
}
