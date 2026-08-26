
import React from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import type { ViewMode } from '@/lib/visualizer/useScalerStore';

interface MeasurementCalloutsProps {
  sourceHeightMm: number;
  targetHeightMm: number;
  sourceEyeMm: number;
  targetEyeMm: number;
  sourceScaleFactor: number;
  targetScaleFactor: number;
  viewMode: ViewMode;
  calculationMode: 'eye' | 'head';
  deltaMm: number;
  scalePercentage: number;
}

export const MeasurementCallouts: React.FC<MeasurementCalloutsProps> = ({
  sourceHeightMm,
  targetHeightMm,
  sourceEyeMm,
  targetEyeMm,
  sourceScaleFactor,
  targetScaleFactor,
  viewMode,
  calculationMode,
  deltaMm,
  scalePercentage,
}) => {
  const isSideBySide = viewMode === 'side_by_side';
  const isStacked = viewMode === 'stacked';
  const isSourceOnly = viewMode === 'source_only';
  const isTargetOnly = viewMode === 'target_only';

  const sourceX = isSideBySide ? -22 : 0;
  const targetX = isSideBySide ? 22 : 0;

  const actualSourceHead = sourceHeightMm * sourceScaleFactor;
  const actualTargetHead = targetHeightMm * targetScaleFactor;
  const actualSourceEye = sourceEyeMm * sourceScaleFactor;
  const actualTargetEye = targetEyeMm * targetScaleFactor;

  // Active key reference height
  const sourceActiveY = calculationMode === 'eye' ? actualSourceEye : actualSourceHead;
  const targetActiveY = calculationMode === 'eye' ? actualTargetEye : actualTargetHead;

  return (
    <group>
      {/* 1. SOURCE MODEL MEASUREMENTS (if visible) */}
      {!isTargetOnly && (
        <group position={[sourceX, 0, 0]}>
          {/* Vertical Leader Line (Left of source) */}
          <group position={[-16, 0, 0]}>
            {/* Base anchor tick */}
            <lineSegments>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([-2, 0, 0, 2, 0, 0, 0, 0, 0, 0, actualSourceHead, 0, -2, actualSourceHead, 0, 2, actualSourceHead, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#38bdf8" linewidth={2} />
            </lineSegments>

            {/* Eye Level Tick */}
            <lineSegments position={[0, actualSourceEye, 0]}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([-1.5, 0, 0, 1.5, 0, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#f59e0b" linewidth={2} />
            </lineSegments>

            {/* Source Height Badge */}
            <Html position={[-6, actualSourceHead / 2, 0]} center distanceFactor={140} zIndexRange={[10, 0]}>
              <div className="bg-[#111113]/95 backdrop-blur-md border border-[#333338] text-[#AAAAAA] font-mono text-[10px] px-2 py-1 rounded shadow-2xl whitespace-nowrap pointer-events-none select-none">
                <span className="font-bold text-white block">{actualSourceHead.toFixed(1)}mm</span>
                <span className="text-[9px] text-[#00FFC2]">
                  {calculationMode === 'eye' ? `Eye: ${actualSourceEye.toFixed(1)}mm` : 'Head Apex'}
                </span>
              </div>
            </Html>
          </group>
        </group>
      )}

      {/* 2. TARGET MODEL MEASUREMENTS (if visible) */}
      {!isSourceOnly && (
        <group position={[targetX, 0, 0]}>
          {/* Vertical Leader Line (Right of target) */}
          <group position={[16, 0, 0]}>
            {/* Base anchor tick */}
            <lineSegments>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([-2, 0, 0, 2, 0, 0, 0, 0, 0, 0, actualTargetHead, 0, -2, actualTargetHead, 0, 2, actualTargetHead, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#FF6321" linewidth={2} />
            </lineSegments>

            {/* Eye Level Tick */}
            <lineSegments position={[0, actualTargetEye, 0]}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[new Float32Array([-1.5, 0, 0, 1.5, 0, 0]), 3]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#00FFC2" linewidth={2} />
            </lineSegments>

            {/* Target Height Badge */}
            <Html position={[6, actualTargetHead / 2, 0]} center distanceFactor={140} zIndexRange={[10, 0]}>
              <div className="bg-[#111113]/95 backdrop-blur-md border border-[#FF6321]/50 text-[#FF6321] font-mono text-[10px] px-2 py-1 rounded shadow-2xl whitespace-nowrap pointer-events-none select-none">
                <span className="font-bold text-white block">{actualTargetHead.toFixed(1)}mm</span>
                <span className="text-[9px] text-[#FF8C5A]">
                  {calculationMode === 'eye' ? `Eye: ${actualTargetEye.toFixed(1)}mm` : 'Head Apex'}
                </span>
              </div>
            </Html>
          </group>
        </group>
      )}

      {/* 3. SIDE-BY-SIDE LASER GUIDE BRIDGES */}
      {isSideBySide && (
        <group>
          {/* Eye Level Laser Guide Bridge */}
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([sourceX, actualSourceEye, 0, targetX, actualTargetEye, 0]), 3]}
              />
            </bufferGeometry>
            <lineDashedMaterial
              color="#00FFC2"
              dashSize={1.5}
              gapSize={1.0}
              transparent
              opacity={0.7}
            />
          </lineSegments>

          {/* Top Head Apex Laser Guide Bridge */}
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([sourceX, actualSourceHead, 0, targetX, actualTargetHead, 0]), 3]}
              />
            </bufferGeometry>
            <lineDashedMaterial
              color="#FF6321"
              dashSize={2.0}
              gapSize={1.2}
              transparent
              opacity={0.6}
            />
          </lineSegments>

          {/* Center Delta Badge */}
          <Html
            position={[0, Math.max(actualSourceHead, actualTargetHead) + 6, 0]}
            center
            distanceFactor={140}
            zIndexRange={[10, 0]}
          >
            <div className="bg-[#0A0A0B]/95 backdrop-blur-md border border-[#333338] text-[#E0E0E0] font-mono text-xs px-2.5 py-1 rounded-sm shadow-2xl flex items-center gap-1.5 whitespace-nowrap pointer-events-none select-none">
              <span className="text-[11px] font-bold text-white">
                {scalePercentage.toFixed(2)}%
              </span>
              <span className="text-[10px] text-[#FF6321] font-bold">
                ({deltaMm >= 0 ? `+${deltaMm.toFixed(1)}mm` : `${deltaMm.toFixed(1)}mm`})
              </span>
            </div>
          </Html>
        </group>
      )}

      {/* 4. STACKED OVERLAY DELTA BRACKET */}
      {isStacked && (
        <group position={[14, 0, 0]}>
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0, sourceActiveY, 0, 0, targetActiveY, 0, -2, sourceActiveY, 0, 2, sourceActiveY, 0, -2, targetActiveY, 0, 2, targetActiveY, 0]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#FF6321" linewidth={2} />
          </lineSegments>

          <Html
            position={[6, (sourceActiveY + targetActiveY) / 2, 0]}
            center
            distanceFactor={140}
            zIndexRange={[10, 0]}
          >
            <div className="bg-[#0A0A0B]/95 backdrop-blur-md border border-[#FF6321]/60 text-[#FF6321] font-mono text-xs px-2 py-0.5 rounded shadow-lg whitespace-nowrap pointer-events-none select-none">
              Δ {Math.abs(deltaMm).toFixed(1)}mm
            </div>
          </Html>
        </group>
      )}
    </group>
  );
};
