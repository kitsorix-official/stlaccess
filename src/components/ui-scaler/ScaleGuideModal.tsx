
import React from 'react';
import { X, BookOpen, Ruler, HelpCircle, Check, Info } from 'lucide-react';
import scalesData from '@/data/visualizer/scales.json';
import conversionsData from '@/data/visualizer/conversions.json';

interface ScaleGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScaleGuideModal: React.FC<ScaleGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none">
      <div className="bg-[#151619] border border-[#2A2A2E] rounded-md max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-sans relative z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#2A2A2E] flex items-center justify-between bg-[#111113]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-[#FF6321] flex items-center justify-center text-black font-black italic text-xs">
              DOC
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Scale Conversion Matrix & Technical Equations
              </h2>
              <p className="text-[10px] text-[#88888C] font-mono uppercase tracking-widest">
                STLACCESS 3D Precision Spatial Standards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-[#1D1E22] text-[#88888C] hover:text-white hover:bg-[#2A2A2E] transition-colors cursor-pointer border border-[#333338]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-[#E0E0E0] text-xs">
          {/* Section 1: Eye-Level vs. Top of Head */}
          <div className="bg-[#1D1E22] border border-[#333338] rounded-md p-4 space-y-3">
            <h3 className="font-bold text-white flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <Ruler className="w-4 h-4 text-[#FF6321]" />
              1. Sole-to-Eye vs. Top-of-Head Logic
            </h3>
            <p className="text-[#AAAAAA] leading-relaxed">
              In miniature sculpting and historical tabletop wargaming, figures are traditionally defined by their <strong>Eye-Level height</strong> (from the sole of the foot to the eye line of a standard 1.80m / 6ft human). This standard exists because helmets, tall plumes, hats, and horns vary wildly across sculptors.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded bg-[#151619] border border-[#2A2A2E]">
                <span className="font-mono font-bold text-[#00FFC2] block mb-1 uppercase text-[11px]">
                  Eye-Level (Wargame Standard)
                </span>
                <p className="text-[11px] text-[#88888C]">
                  Measures sole-to-eye. Best when converting models with large crests, helmets, power armor, or heroic proportions.
                </p>
              </div>
              <div className="p-3 rounded bg-[#151619] border border-[#2A2A2E]">
                <span className="font-mono font-bold text-[#FF6321] block mb-1 uppercase text-[11px]">
                  Top of Head (Physical Apex)
                </span>
                <p className="text-[11px] text-[#88888C]">
                  Measures total physical height from feet to crown of skull. Best for vehicles, architectural terrain, and true-scale humans.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: Resin Shrinkage Compensation Formula */}
          <div className="bg-[#1D1E22] border border-[#333338] rounded-md p-4 space-y-3">
            <h3 className="font-bold text-white flex items-center gap-2 text-xs font-mono uppercase tracking-wider">
              <Info className="w-4 h-4 text-[#FFB800]" />
              2. Resin Shrinkage Compensation Formula
            </h3>
            <p className="text-[#AAAAAA] leading-relaxed">
              During UV post-curing and chemical cross-linking, photopolymer resins shrink by approximately <strong>0.8% to 2.5%</strong>. To guarantee that your cured physical print matches the intended scale exactly, the slicer scale factor is computed using the reciprocal shrinkage equation:
            </p>
            <div className="p-3 rounded bg-[#0A0A0B] font-mono text-center text-xs text-[#FFB800] border border-[#333338]">
              Final Scale Factor = (Target Height / Source Height) × [ 100 / (100 - Shrinkage%) ]
            </div>
          </div>

          {/* Section 3: Full Scale Matrix Table */}
          <div className="space-y-2">
            <h3 className="font-bold text-white text-xs font-mono uppercase tracking-wider">
              3. Complete Miniature Scales Matrix
            </h3>
            <div className="overflow-x-auto border border-[#2A2A2E] rounded-md">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-[#0A0A0B] text-[#88888C] border-b border-[#2A2A2E] text-[10px] uppercase">
                    <th className="p-2.5">Scale Name</th>
                    <th className="p-2.5">Ratio</th>
                    <th className="p-2.5">Eye Level</th>
                    <th className="p-2.5">Head Apex</th>
                    <th className="p-2.5">Popular Systems</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A2E]">
                  {scalesData.map((s) => (
                    <tr key={s.id} className="hover:bg-[#1D1E22] transition-colors">
                      <td className="p-2.5 font-bold text-white">{s.shortName}</td>
                      <td className="p-2.5 text-[#00FFC2]">{s.ratio}</td>
                      <td className="p-2.5 text-[#E0E0E0]">{s.eyeLevelMm}mm</td>
                      <td className="p-2.5 text-[#E0E0E0]">{s.topOfHeadMm}mm</td>
                      <td className="p-2.5 text-[#88888C] font-sans text-[11px]">{s.popularGames.slice(0, 2).join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2A2A2E] bg-[#111113] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-sm bg-[#00FFC2] hover:bg-[#00FFC2]/90 text-black text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
