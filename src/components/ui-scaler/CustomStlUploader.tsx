
import React, { useState, useRef } from 'react';
import { UploadCloud, FileCode, CheckCircle, Trash2, Layers, AlertCircle, RefreshCw } from 'lucide-react';
import { useScalerStore } from '@/lib/visualizer/useScalerStore';
import { parseStlBuffer } from '@/lib/visualizer/stlParser';

export const CustomStlUploader: React.FC = () => {
  const { customStl, setCustomStl, clearCustomStl } = useScalerStore();
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.stl')) {
      setErrorMsg('Please upload a valid .stl 3D model file.');
      return;
    }

    try {
      setIsLoading(true);
      setErrorMsg(null);
      const buffer = await file.arrayBuffer();
      const stlData = parseStlBuffer(buffer, file.name);
      setCustomStl(stlData);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to parse STL file. Please check file integrity.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full bg-[#1D1E22] border border-[#333338] rounded-md p-3.5 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#88888C] flex items-center gap-1.5 font-mono">
          <UploadCloud className="w-3.5 h-3.5 text-[#00FFC2]" />
          Custom STL Model
        </h4>
        {customStl && (
          <button
            onClick={clearCustomStl}
            className="text-[10px] font-mono text-[#FF6321] hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-3 h-3" /> REMOVE
          </button>
        )}
      </div>

      {customStl ? (
        <div className="bg-[#151619] border border-[#2A2A2E] rounded p-3 space-y-2 font-mono">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <FileCode className="w-4 h-4 text-[#00FFC2] shrink-0" />
              <span className="text-xs font-bold text-white truncate">
                {customStl.name}
              </span>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#0A0A0B] text-[#00FFC2] border border-[#333338] uppercase">
              Parsed 1:1
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-[#2A2A2E] text-[10px]">
            <div className="bg-[#0A0A0B] p-1.5 rounded border border-[#2A2A2E]">
              <span className="text-[#666666] block text-[8px] uppercase font-bold">Height</span>
              <span className="text-[#FF6321] font-bold">{customStl.bounds.height.toFixed(1)}mm</span>
            </div>
            <div className="bg-[#0A0A0B] p-1.5 rounded border border-[#2A2A2E]">
              <span className="text-[#666666] block text-[8px] uppercase font-bold">Footprint</span>
              <span className="text-[#E0E0E0] font-bold">
                {customStl.bounds.width.toFixed(1)}×{customStl.bounds.depth.toFixed(1)}
              </span>
            </div>
            <div className="bg-[#0A0A0B] p-1.5 rounded border border-[#2A2A2E]">
              <span className="text-[#666666] block text-[8px] uppercase font-bold">Triangles</span>
              <span className="text-[#E0E0E0] font-bold">{customStl.triangleCount.toLocaleString()}</span>
            </div>
            <div className="bg-[#0A0A0B] p-1.5 rounded border border-[#2A2A2E]">
              <span className="text-[#666666] block text-[8px] uppercase font-bold">Volume</span>
              <span className="text-[#00FFC2] font-bold">{customStl.bounds.volumeCm3.toFixed(2)}cm³</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border border-dashed rounded-md p-4 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-[#00FFC2] bg-[#00FFC2]/10'
              : 'border-[#333338] hover:border-[#FF6321] bg-[#151619] hover:bg-[#18191D]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".stl"
            onChange={handleFileChange}
            className="hidden"
          />

          {isLoading ? (
            <div className="flex flex-col items-center gap-1.5 text-xs text-[#00FFC2] py-1 font-mono">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Analyzing STL geometry & 1:1 ground bounds...</span>
            </div>
          ) : (
            <div className="space-y-1">
              <UploadCloud className="w-5 h-5 text-[#88888C] mx-auto" />
              <p className="text-xs font-bold text-white font-mono">
                Drop your <span className="text-[#FF6321]">.STL</span> file here, or browse
              </p>
              <p className="text-[10px] text-[#666666] font-mono">
                Auto-aligned to bottom ground (Y=0) • Computes real bounding volume
              </p>
            </div>
          )}
        </div>
      )}

      {errorMsg && (
        <div className="mt-2 text-[10px] text-[#FF6321] bg-[#FF6321]/10 border border-[#FF6321]/30 p-2 rounded flex items-center gap-1.5 font-mono">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {errorMsg}
        </div>
      )}
    </div>
  );
};
