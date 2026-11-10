
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScalerStore } from '@/lib/visualizer/useScalerStore';
import { ModelFactory } from './ModelFactory';
import { MeasurementCallouts } from './MeasurementCallouts';
import type { ScaleCalculationResult, ScaleDefinition } from '@/lib/visualizer/scaleEngine';

interface MiniatureComparisonProps {
  sourceScale: ScaleDefinition;
  targetScale: ScaleDefinition;
  calculation: ScaleCalculationResult;
}

export const MiniatureComparison: React.FC<MiniatureComparisonProps> = ({
  sourceScale,
  targetScale,
  calculation,
}) => {
  const {
    modelType,
    viewMode,
    wireframe,
    customStl,
    showMeasurements,
    showBoundingBox,
    calculationMode,
  } = useScalerStore();

  const sourceGroupRef = useRef<THREE.Group>(null);
  const targetGroupRef = useRef<THREE.Group>(null);

  // Determine standard reference heights of the 3D procedural models
  // Humanoid model is authored with 32mm total height (28mm eye level)
  // Vehicle model is authored with 30mm height
  // Cylinder is authored with 32mm height
  const defaultAuthoredHeight = modelType === 'vehicle' ? 30.0 : 32.0;
  const defaultAuthoredEye = 28.0;

  // Compute physical scale ratios for Source and Target
  const sourceHeightMm = calculation.sourceHeightMm;
  const targetHeightMm = calculation.targetHeightMm;

  // Source base scale factor (so source model physically measures sourceHeightMm in scene units)
  const sourceBaseScale = customStl
    ? 1.0
    : calculationMode === 'eye'
    ? sourceScale.eyeLevelMm / defaultAuthoredEye
    : sourceScale.topOfHeadMm / defaultAuthoredHeight;

  // Target scale factor (mathematical scale factor applied to source)
  const targetActualScale = sourceBaseScale * calculation.scaleFactor;

  // Smooth lerp in useFrame for natural tactile responsiveness when adjusting sliders
  useFrame((_, delta) => {
    const lerpFactor = Math.min(1.0, delta * 12);

    if (sourceGroupRef.current) {
      const currentScale = sourceGroupRef.current.scale.x;
      const targetS = sourceBaseScale;
      const nextS = THREE.MathUtils.lerp(currentScale, targetS, lerpFactor);
      sourceGroupRef.current.scale.set(nextS, nextS, nextS);
    }

    if (targetGroupRef.current) {
      const currentScale = targetGroupRef.current.scale.x;
      const targetS = targetActualScale;
      const nextS = THREE.MathUtils.lerp(currentScale, targetS, lerpFactor);
      targetGroupRef.current.scale.set(nextS, nextS, nextS);
    }
  });

  const isSideBySide = viewMode === 'side_by_side';
  const isStacked = viewMode === 'stacked';
  const isSourceOnly = viewMode === 'source_only';
  const isTargetOnly = viewMode === 'target_only';

  const sourcePos: [number, number, number] = isSideBySide ? [-22, 0, 0] : [0, 0, 0];
  const targetPos: [number, number, number] = isSideBySide ? [22, 0, 0] : [0, 0, 0];

  return (
    <group>
      {/* 1. SOURCE MODEL (1:1 Original Base Scale) */}
      {!isTargetOnly && (
        <group position={sourcePos}>
          <group ref={sourceGroupRef} scale={[sourceBaseScale, sourceBaseScale, sourceBaseScale]}>
            <ModelFactory
              modelType={modelType}
              customStl={customStl}
              color={isStacked ? '#38bdf8' : '#38bdf8'}
              wireframe={wireframe}
              isGhost={isStacked}
              opacity={isStacked ? 0.4 : 1.0}
              showEyeIndicator={true}
            />

            {/* Bounding Box Wireframe */}
            {showBoundingBox && (
              <mesh position={[0, defaultAuthoredHeight / 2, 0]}>
                <boxGeometry args={[26, defaultAuthoredHeight, 26]} />
                <meshBasicMaterial color="#38bdf8" wireframe opacity={0.3} transparent />
              </mesh>
            )}
          </group>
        </group>
      )}

      {/* 2. TARGET MODEL (Scaled by ScaleFactor) */}
      {!isSourceOnly && (
        <group position={targetPos}>
          <group ref={targetGroupRef} scale={[targetActualScale, targetActualScale, targetActualScale]}>
            <ModelFactory
              modelType={modelType}
              customStl={customStl}
              color="#10b981"
              wireframe={wireframe}
              isGhost={false}
              opacity={1.0}
              showEyeIndicator={true}
            />

            {/* Bounding Box Wireframe */}
            {showBoundingBox && (
              <mesh position={[0, defaultAuthoredHeight / 2, 0]}>
                <boxGeometry args={[26, defaultAuthoredHeight, 26]} />
                <meshBasicMaterial color="#10b981" wireframe opacity={0.35} transparent />
              </mesh>
            )}
          </group>
        </group>
      )}

      {/* 3. MEASUREMENT CALLOUTS & LASER GUIDES */}
      {showMeasurements && (
        <MeasurementCallouts
          sourceHeightMm={sourceHeightMm}
          targetHeightMm={targetHeightMm}
          sourceEyeMm={sourceScale.eyeLevelMm}
          targetEyeMm={targetScale.eyeLevelMm}
          sourceScaleFactor={1.0}
          targetScaleFactor={calculation.scaleFactor}
          viewMode={viewMode}
          calculationMode={calculationMode}
          deltaMm={calculation.deltaMm}
          scalePercentage={calculation.scalePercentage}
        />
      )}
    </group>
  );
};
