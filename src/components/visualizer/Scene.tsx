
import React, { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import * as THREE from 'three';
import { useScalerStore } from '@/lib/visualizer/useScalerStore';
import type { CameraPreset } from '@/lib/visualizer/useScalerStore';
import { useScaleEngine } from '@/hooks/visualizer/useScaleEngine';
import { MeasurementGrid } from './MeasurementGrid';
import { MiniatureComparison } from './MiniatureComparison';
import { ReferenceObject } from './ReferenceObject';
import { PrintBedVolume } from './PrintBedVolume';
import { SnapshotHelper } from './SnapshotHelper';

// Suppress known Three.js r170+ / r185+ deprecation warnings triggered by internal ecosystem libraries
if (typeof window !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    const msg = typeof args[0] === 'string' ? args[0] : '';
    if (
      msg.includes('THREE.Clock: This module has been deprecated') ||
      msg.includes('THREE.WebGLShadowMap: PCFSoftShadowMap has been deprecated')
    ) {
      return;
    }
    originalWarn.apply(console, args);
  };
}

function CameraController({ preset }: { preset: CameraPreset }) {
  const controlsRef = useRef<OrbitControlsType>(null);

  useEffect(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;

    switch (preset) {
      case 'front':
        controls.object.position.set(0, 25, 110);
        controls.target.set(0, 18, 0);
        break;
      case 'side':
        controls.object.position.set(110, 25, 0);
        controls.target.set(0, 18, 0);
        break;
      case 'top':
        controls.object.position.set(0, 130, 0.1);
        controls.target.set(0, 0, 0);
        break;
      case 'isometric':
        controls.object.position.set(70, 60, 70);
        controls.target.set(0, 15, 0);
        break;
      case 'perspective':
      default:
        controls.object.position.set(0, 45, 95);
        controls.target.set(0, 18, 0);
        break;
    }
    controls.update();
  }, [preset]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 - 0.01} // Don't dip below ground
      minDistance={15}
      maxDistance={350}
      target={[0, 18, 0]}
    />
  );
}

function LightingRig({ theme }: { theme: 'studio' | 'cyberpunk' | 'blueprint' | 'warm' }) {
  const lighting = React.useMemo(() => {
    switch (theme) {
      case 'cyberpunk':
        return {
          ambientColor: '#2e1065',
          ambientIntensity: 0.8,
          keyColor: '#00ffff',
          keyIntensity: 2.2,
          fillColor: '#ff007f',
          fillIntensity: 2.0,
          rimColor: '#e879f9',
          rimIntensity: 1.8,
        };
      case 'blueprint':
        return {
          ambientColor: '#0c4a6e',
          ambientIntensity: 1.0,
          keyColor: '#38bdf8',
          keyIntensity: 2.0,
          fillColor: '#0284c7',
          fillIntensity: 1.2,
          rimColor: '#7dd3fc',
          rimIntensity: 1.4,
        };
      case 'warm':
        return {
          ambientColor: '#451a03',
          ambientIntensity: 0.9,
          keyColor: '#fbbf24',
          keyIntensity: 2.2,
          fillColor: '#d97706',
          fillIntensity: 1.5,
          rimColor: '#fde68a',
          rimIntensity: 1.5,
        };
      case 'studio':
      default:
        return {
          ambientColor: '#27272a',
          ambientIntensity: 1.1,
          keyColor: '#ffffff',
          keyIntensity: 2.4,
          fillColor: '#94a3b8',
          fillIntensity: 1.3,
          rimColor: '#cbd5e1',
          rimIntensity: 1.6,
        };
    }
  }, [theme]);

  return (
    <>
      <ambientLight color={lighting.ambientColor} intensity={lighting.ambientIntensity} />
      {/* Key Light */}
      <directionalLight
        position={[45, 90, 60]}
        intensity={lighting.keyIntensity}
        color={lighting.keyColor}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={10}
        shadow-camera-far={250}
        shadow-camera-left={-70}
        shadow-camera-right={70}
        shadow-camera-top={70}
        shadow-camera-bottom={-70}
        shadow-bias={-0.0001}
      />
      {/* Fill Light */}
      <directionalLight
        position={[-50, 40, -40]}
        intensity={lighting.fillIntensity}
        color={lighting.fillColor}
      />
      {/* Rim Light for edge definition */}
      <pointLight position={[0, 60, -60]} intensity={lighting.rimIntensity} color={lighting.rimColor} />
      {/* Front Floor Bounce */}
      <pointLight position={[0, 5, 40]} intensity={0.4} color="#ffffff" />
    </>
  );
}

export const Scene: React.FC = () => {
  const { lightingTheme, cameraPreset, referenceObject, printBedId, customBed } = useScalerStore();
  const { sourceScale, targetScale, calculation } = useScaleEngine();

  const bgColor = React.useMemo(() => {
    switch (lightingTheme) {
      case 'cyberpunk':
        return '#090514';
      case 'blueprint':
        return '#020b18';
      case 'warm':
        return '#140e0a';
      case 'studio':
      default:
        return '#09090b';
    }
  }, [lightingTheme]);

  return (
    <div id="spatial-scaler-canvas-container" className="w-full h-full relative select-none">
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
        gl={{
          preserveDrawingBuffer: true, // Required for screenshot snapshot export
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <color attach="background" args={[bgColor]} />
        <PerspectiveCamera makeDefault position={[0, 45, 95]} fov={38} near={0.5} far={800} />
        <CameraController preset={cameraPreset} />

        <LightingRig theme={lightingTheme} />

        <Suspense fallback={null}>
          <MeasurementGrid lightingTheme={lightingTheme} />
          
          <MiniatureComparison
            sourceScale={sourceScale}
            targetScale={targetScale}
            calculation={calculation}
          />

          <ReferenceObject type={referenceObject} position={[0, 0, 24]} />

          <PrintBedVolume printBedId={printBedId} customBed={customBed} />

          <SnapshotHelper />
        </Suspense>
      </Canvas>
    </div>
  );
};
