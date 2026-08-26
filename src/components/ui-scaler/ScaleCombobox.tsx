
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronDown, Search, Check, Sparkles, Ruler } from 'lucide-react';
import type { ScaleDefinition } from '@/lib/visualizer/scaleEngine';

interface ScaleComboboxProps {
  id: string;
  label: string;
  badgeColor?: 'sky' | 'emerald';
  valueId: string;
  scales: ScaleDefinition[];
  onChange: (id: string) => void;
  calculationMode: 'eye' | 'head';
}

export const ScaleCombobox: React.FC<ScaleComboboxProps> = ({
  id,
  label,
  badgeColor = 'sky',
  valueId,
  scales,
  onChange,
  calculationMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedScale = useMemo(() => {
    return scales.find((s) => s.id === valueId) || scales[0];
  }, [scales, valueId]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredScales = useMemo(() => {
    if (!searchQuery.trim()) return scales;
    const query = searchQuery.toLowerCase();
    return scales.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.ratio.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query) ||
        s.popularGames.some((g) => g.toLowerCase().includes(query))
    );
  }, [scales, searchQuery]);

  // Group by category
  const groupedScales = useMemo(() => {
    const map = new Map<string, ScaleDefinition[]>();
    filteredScales.forEach((s) => {
      const list = map.get(s.category) || [];
      list.push(s);
      map.set(s.category, list);
    });
    return Array.from(map.entries());
  }, [filteredScales]);

  const activeHeight =
    calculationMode === 'eye' ? selectedScale.eyeLevelMm : selectedScale.topOfHeadMm;

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Label and Height Summary Tag */}
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-wider text-[#88888C] flex items-center gap-1.5 font-mono">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              badgeColor === 'sky' ? 'bg-[#FF6321]' : 'bg-[#00FFC2]'
            }`}
          />
          {label}
        </label>
        <span className="text-[10px] font-mono text-[#88888C]">
          {selectedScale.id === 'custom' ? (
            <span className="text-[#FFB800] font-bold">User Custom</span>
          ) : (
            <>
              {calculationMode === 'eye' ? 'Eye:' : 'Head:'}{' '}
              <strong className="text-white">{activeHeight.toFixed(1)}mm</strong> ({selectedScale.ratio})
            </>
          )}
        </span>
      </div>

      {/* Main Trigger Button */}
      <button
        id={id}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#1D1E22] border ${
          isOpen
            ? 'border-[#FF6321] outline outline-1 outline-[#FF6321]'
            : 'border-[#333338] hover:border-[#FF6321]/50'
        } rounded-md px-3 py-2 text-left flex items-center justify-between gap-2 transition-all cursor-pointer shadow-sm`}
      >
        <div className="min-w-0 flex-1">
          <div className="text-xs font-mono font-bold text-white truncate">
            {selectedScale.shortName}
          </div>
          <div className="text-[10px] text-[#88888C] truncate font-sans">
            {selectedScale.popularGames.slice(0, 2).join(' • ')}
          </div>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#88888C] transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-[#151619] border border-[#2A2A2E] rounded-md shadow-2xl z-50 overflow-hidden max-h-80 flex flex-col backdrop-blur-xl">
          {/* Search Box */}
          <div className="p-2 border-b border-[#2A2A2E] sticky top-0 bg-[#111113] z-10">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#88888C] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scale (e.g. 28mm, Bolt Action, 1:100)..."
                className="w-full bg-[#0A0A0B] border border-[#333338] rounded pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#666666] font-mono focus:outline-none focus:border-[#FF6321]"
                autoFocus
              />
            </div>
          </div>

          {/* Grouped Scale List */}
          <div className="overflow-y-auto flex-1 p-1 divide-y divide-[#2A2A2E]">
            {groupedScales.length === 0 ? (
              <div className="p-4 text-center text-xs text-[#88888C] font-mono">
                No matching scales found.
              </div>
            ) : (
              groupedScales.map(([category, items]) => (
                <div key={category} className="py-1">
                  <div className="px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-[#666666] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-[#FF6321] rounded-sm inline-block" />
                    {category}
                  </div>
                  {items.map((scale) => {
                    const isSelected = scale.id === valueId;
                    const scaleHeight =
                      calculationMode === 'eye' ? scale.eyeLevelMm : scale.topOfHeadMm;

                    return (
                      <button
                        key={scale.id}
                        type="button"
                        onClick={() => {
                          onChange(scale.id);
                          setIsOpen(false);
                          setSearchQuery('');
                        }}
                        className={`w-full px-2.5 py-2 rounded text-left flex items-start justify-between gap-2 text-xs transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#1D1E22] border-l-2 border-[#FF6321] text-white'
                            : 'hover:bg-[#1D1E22] text-[#AAAAAA] hover:text-white'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="font-mono font-bold text-white flex items-center gap-1.5">
                            {scale.shortName}
                            {scale.ratio !== 'Custom' && (
                              <span className="text-[9px] px-1 py-0.2 rounded bg-[#0A0A0B] text-[#00FFC2] font-mono border border-[#333338]">
                                {scale.ratio}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-[#88888C] truncate mt-0.5 font-sans">
                            {scale.popularGames.join(', ')}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-mono font-bold text-[#E0E0E0]">
                            {scale.id === 'custom' ? 'Custom' : `${scaleHeight.toFixed(1)}mm`}
                          </div>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-[#00FFC2] ml-auto mt-0.5" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
