
import React from 'react';
import {
  Maximize2,
  Box,
  Eye,
  Grid,
  Sun,
  Shield,
  Truck,
  Disc,
  UploadCloud,
  Columns,
  Layers,
  Sparkles,
  HelpCircle,
  Compass,
} from 'lucide-react';
import {
  useScalerStore,
} from '@/lib/visualizer/useScalerStore';
import type {
  ModelType,
  ViewMode,
  CameraPreset,
  LightingTheme,
  ReferenceObjectType,
} from '@/lib/visualizer/useScalerStore';
import printBedsData from '@/data/visualizer/printBeds.json';

export const ViewportHUD: React.FC = () => {
  const {
    modelType,
    viewMode,
    cameraPreset,
    lightingTheme,
    referenceObject,
    printBedId,
    showMeasurements,
    showBoundingBox,
    wireframe,
    customStl,
    setModelType,
    setViewMode,
    setCameraPreset,
    setLightingTheme,
    setReferenceObject,
    setPrintBedId,
    toggleMeasurements,
    toggleBoundingBox,
    toggleWireframe,
  } = useScalerStore();

  const modelButtons: { type: ModelType; label: string; icon: any }[] = [
    { type: 'humanoid', label: 'Miniature', icon: Shield },
    { type: 'vehicle', label: 'Vehicle', icon: Truck },
    { type: 'cylinder', label: 'Column', icon: Disc },
    ...(customStl
      ? [{ type: 'custom_stl' as ModelType, label: 'Custom STL', icon: UploadCloud }]
      : []),
  ];

  const viewModeButtons: { mode: ViewMode; label: string; icon: any }[] = [
    { mode: 'side_by_side', label: 'Side-by-Side', icon: Columns },
    { mode: 'stacked', label: 'Stacked Ghost', icon: Layers },
    { mode: 'source_only', label: 'Source Only', icon: Box },
    { mode: 'target_only', label: 'Target Only', icon: Box },
  ];

  const cameraButtons: { preset: CameraPreset; label: string }[] = [
    { preset: 'perspective', label: '3D Orbit' },
    { preset: 'front', label: 'Front' },
    { preset: 'side', label: 'Side' },
    { preset: 'top', label: 'Top' },
    { preset: 'isometric', label: 'Iso' },
  ];

  const themes: { theme: LightingTheme; label: string }[] = [
    { theme: 'studio', label: 'Dark Studio' },
    { theme: 'cyberpunk', label: 'Cyber' },
    { theme: 'blueprint', label: 'Blueprint' },
    { theme: 'warm', label: 'Amber' },
  ];

  const refObjects: { type: ReferenceObjectType; label: string }[] = [
    { type: 'battery_aa', label: 'AA Battery (50.5mm)' },
    { type: 'd6_dice', label: '16mm D6 Dice' },
    { type: 'base28', label: '28.5mm Base' },
    { type: 'base32', label: '32mm Base' },
    { type: 'coin_quarter', label: 'Quarter Coin' },
    { type: 'none', label: 'No Reference Object' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none p-3 sm:p-4 flex flex-col justify-between z-10 select-none">
      {/* TOP HUD BAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        {/* 3D Model Selector Pills */}
        <div className="flex items-center gap-1 bg-[#111113]/90 backdrop-blur-md border border-[#2A2A2E] rounded-md p-1 shadow-2xl">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#666666] px-1.5 hidden sm:inline">
            Mesh:
          </span>
          {modelButtons.map((btn) => {
            const Icon = btn.icon;
            const active = modelType === btn.type;
            return (
              <button
                key={btn.type}
                onClick={() => setModelType(btn.type)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#FF6321] text-black shadow-sm'
                    : 'text-[#88888C] hover:text-white hover:bg-[#1D1E22]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* View Mode Pills (Side-by-Side vs Stacked Ghost) */}
        <div className="flex items-center gap-1 bg-[#111113]/90 backdrop-blur-md border border-[#2A2A2E] rounded-md p-1 shadow-2xl">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#666666] px-1.5 hidden sm:inline">
            Mode:
          </span>
          {viewModeButtons.map((btn) => {
            const Icon = btn.icon;
            const active = viewMode === btn.mode;
            return (
              <button
                key={btn.mode}
                onClick={() => setViewMode(btn.mode)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#00FFC2] text-black shadow-sm'
                    : 'text-[#88888C] hover:text-white hover:bg-[#1D1E22]'
                }`}
                title={btn.label}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{btn.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* FLOATING TOP-LEFT TELEMETRY WATERMARK */}
      <div className="pointer-events-none hidden md:block">
        <div className="bg-[#0A0A0B]/85 backdrop-blur-md border border-[#2A2A2E] px-3 py-1.5 rounded-sm inline-block font-mono text-[9px] text-[#88888C] space-y-0.5 shadow-2xl">
          <div className="text-white font-bold tracking-wider flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#FF6321] rounded-full inline-block" />
            3D SPATIAL ENGINE // ACTIVE MATRIX
          </div>
          <div>Left-Click: Orbit • Right-Click: Pan • Scroll: Zoom</div>
        </div>
      </div>

      {/* BOTTOM HUD BAR */}
      <div className="flex flex-wrap items-end justify-between gap-2 pointer-events-auto">
        {/* Bottom Left: Camera Presets & Theme */}
        <div className="flex flex-col gap-2">
          {/* Camera Angles */}
          <div className="flex items-center gap-1 bg-[#111113]/90 backdrop-blur-md border border-[#2A2A2E] rounded-md p-1 shadow-2xl">
            <span className="text-[9px] font-mono font-bold uppercase text-[#666666] px-1.5 flex items-center gap-1">
              <Compass className="w-3 h-3 text-[#FF6321]" /> View:
            </span>
            {cameraButtons.map((cam) => (
              <button
                key={cam.preset}
                onClick={() => setCameraPreset(cam.preset)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-all cursor-pointer ${
                  cameraPreset === cam.preset
                    ? 'bg-[#1D1E22] text-[#FF6321] border border-[#FF6321]/40 font-bold'
                    : 'text-[#88888C] hover:text-[#E0E0E0] hover:bg-[#1D1E22]'
                }`}
              >
                {cam.label}
              </button>
            ))}
          </div>

          {/* Lighting Environment Theme */}
          <div className="flex items-center gap-1 bg-[#111113]/90 backdrop-blur-md border border-[#2A2A2E] rounded-md px-2 py-1 shadow-2xl w-fit">
            <span className="text-[9px] font-mono font-bold uppercase text-[#666666] flex items-center gap-1 mr-1">
              <Sun className="w-3 h-3 text-[#FFB800]" /> Tone:
            </span>
            {themes.map((t) => (
              <button
                key={t.theme}
                onClick={() => setLightingTheme(t.theme)}
                className={`px-1.5 py-0.5 rounded text-[9px] font-mono uppercase transition-all cursor-pointer ${
                  lightingTheme === t.theme
                    ? 'bg-[#FF6321] text-black font-bold'
                    : 'text-[#88888C] hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Right: Quick Toggles & Overlays */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#111113]/90 backdrop-blur-md border border-[#2A2A2E] rounded-md p-1.5 shadow-2xl">
          {/* Measurements Laser Guide Toggle */}
          <button
            onClick={toggleMeasurements}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
              showMeasurements
                ? 'bg-[#1D1E22] text-[#00FFC2] border border-[#00FFC2]/40'
                : 'text-[#88888C] hover:text-[#E0E0E0] hover:bg-[#1D1E22]'
            }`}
            title="Toggle Laser Guidelines & Dimension Badges"
          >
            <Grid className="w-3 h-3" />
            <span>Laser</span>
          </button>

          {/* Wireframe Toggle */}
          <button
            onClick={toggleWireframe}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
              wireframe
                ? 'bg-[#1D1E22] text-[#FFB800] border border-[#FFB800]/40'
                : 'text-[#88888C] hover:text-[#E0E0E0] hover:bg-[#1D1E22]'
            }`}
            title="Toggle Wireframe Mesh"
          >
            <Box className="w-3 h-3" />
            <span>Wire</span>
          </button>

          {/* Reference Object Dropdown */}
          <select
            value={referenceObject}
            onChange={(e) => setReferenceObject(e.target.value as ReferenceObjectType)}
            className="bg-[#1D1E22] border border-[#333338] text-[#E0E0E0] rounded px-2 py-1 text-[10px] font-mono focus:outline-none focus:border-[#FF6321] cursor-pointer"
            title="Add Real World Scale Object"
          >
            {refObjects.map((ref) => (
              <option key={ref.type} value={ref.type}>
                Ref: {ref.label}
              </option>
            ))}
          </select>

          {/* 3D Print Bed Selector */}
          <select
            value={printBedId}
            onChange={(e) => setPrintBedId(e.target.value)}
            className="bg-[#1D1E22] border border-[#333338] text-[#E0E0E0] rounded px-2 py-1 text-[10px] font-mono focus:outline-none focus:border-[#FF6321] cursor-pointer"
            title="Visualize Against Real 3D Printer Volume"
          >
            {printBedsData.map((bed) => (
              <option key={bed.id} value={bed.id}>
                Bed: {bed.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
