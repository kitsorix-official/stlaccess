
import React, { useState } from 'react';
import {
  ArrowUpDown,
  Copy,
  Check,
  Percent,
  Ruler,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  Info,
  Droplet,
  Printer,
  Sliders,
  Box,
  Cpu,
  Activity,
} from 'lucide-react';
import { useScalerStore } from '@/lib/visualizer/useScalerStore';
import { useScaleEngine } from '@/hooks/visualizer/useScaleEngine';
import { ScaleCombobox } from './ScaleCombobox';
import { CustomStlUploader } from './CustomStlUploader';
import conversionsData from '@/data/visualizer/conversions.json';
import printBedsData from '@/data/visualizer/printBeds.json';

export const ControlPanel: React.FC = () => {
  const {
    sourceScaleId,
    targetScaleId,
    customSourceMm,
    customTargetMm,
    calculationMode,
    shrinkageRate,
    printBedId,
    customBed,
    setSourceScaleId,
    setTargetScaleId,
    swapScales,
    setCustomSourceMm,
    setCustomTargetMm,
    setCalculationMode,
    setShrinkageRate,
    setPrintBedId,
    setCustomBed,
  } = useScalerStore();

  const {
    sourceScale,
    targetScale,
    allScales,
    calculation,
    copiedKey,
    copyToClipboard,
  } = useScaleEngine();

  const [activeSlicerTab, setActiveSlicerTab] = useState<'chitubox' | 'lychee' | 'bambu' | 'prusa'>('chitubox');

  const shrinkagePresets = conversionsData.resinShrinkagePresets;

  // Spatial delta estimates calculations
  const volumeDeltaPercent = (calculation.volumeMultiplier - 1.0) * 100;
  const areaDeltaPercent = (Math.pow(calculation.scaleFactor, 2) - 1.0) * 100;
  const estimatedResinMl = (4.2 * calculation.volumeMultiplier).toFixed(1);
  const estimatedPrintTime = calculation.scaleFactor > 1.2 ? '~1h 45m' : calculation.scaleFactor < 0.8 ? '~45m' : '~1h 12m';

  return (
    <div className="w-full h-full flex flex-col bg-[#151619] border-l border-[#2A2A2E] text-[#E0E0E0] font-sans overflow-y-auto select-none divide-y divide-[#2A2A2E]">
      {/* 1. LIVE CALCULATION ENGINE HERO CARD */}
      <div className="p-4 sm:p-5 bg-[#111113] space-y-3">
        {/* Header Telemetry Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00FFC2] animate-pulse" />
            <span className="text-[10px] font-mono text-[#88888C] uppercase tracking-wider font-bold">
              Live Calculation Engine
            </span>
          </div>
          {calculation.isOverrideApplied && (
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40">
              OVERRIDE ACTIVE
            </span>
          )}
        </div>

        {/* Primary Scaling Hero Output Display */}
        <div className="bg-[#1D1E22] border border-[#333338] rounded-md p-4 space-y-3 shadow-lg">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight flex items-baseline">
                {calculation.scalePercentage.toFixed(2)}
                <span className="text-xl sm:text-2xl text-[#FF6321] font-sans ml-1 font-black">%</span>
              </div>
              <div className="text-[11px] text-[#88888C] font-mono mt-1 flex items-center gap-3">
                <span>Multiplier: <strong className="text-white font-mono">{calculation.scaleFactor.toFixed(4)}x</strong></span>
                <span>•</span>
                <span>Δ: <strong className="text-[#00FFC2] font-mono">{calculation.deltaMm >= 0 ? `+${calculation.deltaMm.toFixed(1)}` : calculation.deltaMm.toFixed(1)}mm</strong></span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-mono text-[#666666] uppercase block font-bold">TARGET APEX</span>
              <span className="text-base font-mono font-bold text-[#FF6321]">{calculation.targetHeightMm.toFixed(1)}mm</span>
            </div>
          </div>

          {/* Spatial Estimates Grid */}
          <div className="grid grid-cols-4 gap-2 pt-2.5 border-t border-[#2A2A2E] text-center font-mono">
            <div className="bg-[#151619] p-1.5 rounded border border-[#2A2A2E]">
              <span className="text-[#666666] block text-[8px] uppercase font-bold">Volume Δ</span>
              <span className="text-xs text-[#E0E0E0] font-bold">
                {volumeDeltaPercent >= 0 ? `+${volumeDeltaPercent.toFixed(1)}%` : `${volumeDeltaPercent.toFixed(1)}%`}
              </span>
            </div>
            <div className="bg-[#151619] p-1.5 rounded border border-[#2A2A2E]">
              <span className="text-[#666666] block text-[8px] uppercase font-bold">Area Δ</span>
              <span className="text-xs text-[#E0E0E0] font-bold">
                {areaDeltaPercent >= 0 ? `+${areaDeltaPercent.toFixed(1)}%` : `${areaDeltaPercent.toFixed(1)}%`}
              </span>
            </div>
            <div className="bg-[#151619] p-1.5 rounded border border-[#2A2A2E]">
              <span className="text-[#666666] block text-[8px] uppercase font-bold">Resin Vol</span>
              <span className="text-xs text-[#00FFC2] font-bold">{estimatedResinMl}ml</span>
            </div>
            <div className="bg-[#151619] p-1.5 rounded border border-[#2A2A2E]">
              <span className="text-[#666666] block text-[8px] uppercase font-bold">Print Time</span>
              <span className="text-xs text-[#FFB800] font-bold">{estimatedPrintTime}</span>
            </div>
          </div>

          {/* Master Copy Percentage CTA Button */}
          <button
            id="btn-copy-percentage"
            onClick={() => copyToClipboard(calculation.scalePercentage.toFixed(2), 'hero-percentage')}
            className={`w-full py-3.5 rounded-sm font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
              copiedKey === 'hero-percentage'
                ? 'bg-[#00FFC2] text-black ring-2 ring-[#00FFC2]'
                : 'bg-[#00FFC2] hover:bg-[#00FFC2]/90 text-black shadow-[#00FFC2]/20'
            }`}
          >
            {copiedKey === 'hero-percentage' ? (
              <>
                <Check className="w-4 h-4 text-black" />
                <span>PERCENTAGE COPIED TO CLIPBOARD</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPY PERCENTAGE</span>
                <span className="opacity-60 text-[10px] font-mono">[SLICER CTRL+C]</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. INPUT PARAMETERS (SOURCE & TARGET SCALES) */}
      <div className="p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[11px] font-bold text-[#88888C] uppercase tracking-[0.15em] flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-[#FF6321]" />
            Input Parameters
          </h2>
          <button
            id="btn-swap-scales"
            onClick={swapScales}
            className="flex items-center gap-1 text-[10px] font-mono text-[#00FFC2] hover:text-white px-2 py-0.5 rounded bg-[#1D1E22] hover:bg-[#2A2A2E] border border-[#333338] transition-colors cursor-pointer"
            title="Invert Source and Target Scales"
          >
            <ArrowUpDown className="w-3 h-3" />
            <span>INVERT</span>
          </button>
        </div>

        {/* Source Combobox */}
        <ScaleCombobox
          id="source-scale-select"
          label="Source Scale"
          badgeColor="sky"
          valueId={sourceScaleId}
          scales={allScales}
          onChange={setSourceScaleId}
          calculationMode={calculationMode}
        />

        {/* Custom Source Input if 'custom' is selected */}
        {sourceScaleId === 'custom' && (
          <div className="p-3 bg-[#1D1E22] border border-[#333338] rounded-md space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#88888C] uppercase font-bold">Custom Source Height:</span>
              <span className="text-white font-bold">{customSourceMm.toFixed(1)} mm</span>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              step="0.5"
              value={customSourceMm}
              onChange={(e) => setCustomSourceMm(parseFloat(e.target.value))}
              className="w-full accent-[#FF6321] cursor-pointer"
            />
          </div>
        )}

        {/* Target Combobox */}
        <ScaleCombobox
          id="target-scale-select"
          label="Target Scale"
          badgeColor="emerald"
          valueId={targetScaleId}
          scales={allScales}
          onChange={setTargetScaleId}
          calculationMode={calculationMode}
        />

        {/* Custom Target Input if 'custom' is selected */}
        {targetScaleId === 'custom' && (
          <div className="p-3 bg-[#1D1E22] border border-[#333338] rounded-md space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#88888C] uppercase font-bold">Custom Target Height:</span>
              <span className="text-white font-bold">{customTargetMm.toFixed(1)} mm</span>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              step="0.5"
              value={customTargetMm}
              onChange={(e) => setCustomTargetMm(parseFloat(e.target.value))}
              className="w-full accent-[#00FFC2] cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* 3. LOGIC ENGINE (EYE LEVEL vs HEAD TOP) */}
      <div className="p-4 sm:p-5 space-y-3">
        <h2 className="text-[11px] font-bold text-[#88888C] uppercase tracking-[0.15em] flex items-center gap-2">
          <Ruler className="w-3.5 h-3.5 text-[#FFB800]" />
          Logic Engine
        </h2>

        <div className="grid grid-cols-2 gap-1 p-1 bg-[#0A0A0B] rounded-lg border border-[#2A2A2E]">
          {/* Eye Level Button */}
          <button
            id="btn-mode-eye"
            onClick={() => setCalculationMode('eye')}
            className={`py-2 text-[10px] font-bold rounded uppercase transition-all cursor-pointer ${
              calculationMode === 'eye'
                ? 'bg-[#FF6321] text-black shadow-sm'
                : 'text-[#88888C] hover:text-white hover:bg-[#1D1E22]'
            }`}
          >
            Eye Level
          </button>

          {/* Head Top Button */}
          <button
            id="btn-mode-head"
            onClick={() => setCalculationMode('head')}
            className={`py-2 text-[10px] font-bold rounded uppercase transition-all cursor-pointer ${
              calculationMode === 'head'
                ? 'bg-[#FF6321] text-black shadow-sm'
                : 'text-[#88888C] hover:text-white hover:bg-[#1D1E22]'
            }`}
          >
            Head Top
          </button>
        </div>

        {/* 4. RESIN SHRINKAGE BAR */}
        <div className="p-3 bg-[#1D1E22] rounded border border-[#333338] space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] uppercase font-bold text-[#88888C] tracking-wide flex items-center gap-1.5">
              <Droplet className="w-3 h-3 text-[#FF6321]" />
              Resin Shrinkage
            </span>
            <span className="text-[11px] font-mono font-bold text-[#FF6321]">
              +{shrinkageRate.toFixed(1)}%
            </span>
          </div>

          <div className="w-full h-1.5 bg-[#0A0A0B] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FF6321] transition-all"
              style={{ width: `${Math.min(100, (shrinkageRate / 5.0) * 100)}%` }}
            />
          </div>

          <input
            type="range"
            min="0.0"
            max="5.0"
            step="0.1"
            value={shrinkageRate}
            onChange={(e) => setShrinkageRate(parseFloat(e.target.value))}
            className="w-full accent-[#FF6321] cursor-pointer mt-1"
          />

          <div className="flex flex-wrap gap-1 pt-1">
            {shrinkagePresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => setShrinkageRate(preset.value)}
                className={`text-[9px] font-mono px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                  shrinkageRate === preset.value
                    ? 'bg-[#FF6321] text-black border-[#FF6321] font-bold'
                    : 'bg-[#151619] border-[#333338] text-[#88888C] hover:text-white'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 5. SLICER SHORTCUTS */}
      <div className="p-4 sm:p-5 space-y-3">
        <h2 className="text-[11px] font-bold text-[#88888C] uppercase tracking-[0.15em] flex items-center gap-2">
          <Printer className="w-3.5 h-3.5 text-[#00FFC2]" />
          Slicer Integration
        </h2>

        {/* Tab Buttons */}
        <div className="grid grid-cols-4 gap-1 bg-[#0A0A0B] p-1 rounded-md border border-[#2A2A2E]">
          {[
            { id: 'chitubox', label: 'Chitubox' },
            { id: 'lychee', label: 'Lychee' },
            { id: 'bambu', label: 'Bambu' },
            { id: 'prusa', label: 'Prusa' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSlicerTab(tab.id as any)}
              className={`text-[10px] font-mono uppercase font-bold py-1.5 rounded transition-all cursor-pointer ${
                activeSlicerTab === tab.id
                  ? 'bg-[#1D1E22] text-[#00FFC2] border border-[#00FFC2]/40 shadow-sm'
                  : 'text-[#88888C] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Slicer Snippet Card */}
        <div className="bg-[#1D1E22] border border-[#333338] rounded-md p-3 flex items-center justify-between gap-2 font-mono">
          <div className="min-w-0">
            <span className="text-[#666666] block text-[9px] uppercase font-bold font-sans">
              Slicer Action Command
            </span>
            <span className="text-white text-xs font-bold truncate block">
              {activeSlicerTab === 'chitubox' && calculation.slicerNotes.chitubox}
              {activeSlicerTab === 'lychee' && calculation.slicerNotes.lychee}
              {activeSlicerTab === 'bambu' && calculation.slicerNotes.bambuStudio}
              {activeSlicerTab === 'prusa' && calculation.slicerNotes.curaPrusa}
            </span>
          </div>

          <button
            onClick={() => {
              const text =
                activeSlicerTab === 'chitubox'
                  ? calculation.scalePercentage.toFixed(2)
                  : activeSlicerTab === 'lychee'
                  ? calculation.scalePercentage.toFixed(2)
                  : activeSlicerTab === 'bambu'
                  ? calculation.scaleFactor.toFixed(4)
                  : calculation.scalePercentage.toFixed(2);
              copyToClipboard(text, `slicer-${activeSlicerTab}`);
            }}
            className="p-2 rounded bg-[#151619] hover:bg-[#2A2A2E] text-[#00FFC2] border border-[#333338] transition-colors shrink-0 cursor-pointer"
            title="Copy Slicer Value"
          >
            {copiedKey === `slicer-${activeSlicerTab}` ? (
              <Check className="w-4 h-4 text-[#00FFC2]" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* 6. CUSTOM STL UPLOADER */}
      <div className="p-4 sm:p-5">
        <CustomStlUploader />
      </div>

      {/* 7. BUILD ENVELOPE CONFIGURATION */}
      <div className="p-4 sm:p-5 space-y-3 pb-8">
        <h2 className="text-[11px] font-bold text-[#88888C] uppercase tracking-[0.15em] flex items-center gap-2">
          <Box className="w-3.5 h-3.5 text-[#FF6321]" />
          Print Bed Envelope
        </h2>

        <select
          value={printBedId}
          onChange={(e) => setPrintBedId(e.target.value)}
          className="w-full bg-[#1D1E22] border border-[#333338] text-[#E0E0E0] rounded-md px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#FF6321] cursor-pointer"
        >
          {printBedsData.map((bed) => (
            <option key={bed.id} value={bed.id}>
              {bed.name} {bed.width > 0 ? `(${bed.width}×${bed.depth}×${bed.height}mm)` : ''}
            </option>
          ))}
          <option value="custom">Custom Build Volume (User specified)</option>
        </select>

        {printBedId === 'custom' && (
          <div className="grid grid-cols-3 gap-2 text-[11px] font-mono">
            <div>
              <label className="text-[9px] uppercase text-[#88888C] block mb-1 font-bold">Width (X)</label>
              <input
                type="number"
                value={customBed.width}
                onChange={(e) => setCustomBed({ ...customBed, width: parseFloat(e.target.value) || 100 })}
                className="w-full bg-[#1D1E22] border border-[#333338] rounded px-2 py-1 text-white"
              />
            </div>
            <div>
              <label className="text-[9px] uppercase text-[#88888C] block mb-1 font-bold">Depth (Y)</label>
              <input
                type="number"
                value={customBed.depth}
                onChange={(e) => setCustomBed({ ...customBed, depth: parseFloat(e.target.value) || 100 })}
                className="w-full bg-[#1D1E22] border border-[#333338] rounded px-2 py-1 text-white"
              />
            </div>
            <div>
              <label className="text-[9px] uppercase text-[#88888C] block mb-1 font-bold">Height (Z)</label>
              <input
                type="number"
                value={customBed.height}
                onChange={(e) => setCustomBed({ ...customBed, height: parseFloat(e.target.value) || 100 })}
                className="w-full bg-[#1D1E22] border border-[#333338] rounded px-2 py-1 text-white"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
