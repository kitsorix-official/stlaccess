
import React from 'react';
import * as THREE from 'three';

interface MeasurementGridProps {
  lightingTheme: 'studio' | 'cyberpunk' | 'blueprint' | 'warm';
}

export const MeasurementGrid: React.FC<MeasurementGridProps> = ({ lightingTheme }) => {
  const gridConfig = React.useMemo(() => {
    switch (lightingTheme) {
      case 'cyberpunk':
        return {
          cellColor: '#00ffff',
          sectionColor: '#ff007f',
          fadeDistance: 400,
          groundColor: '#0a0a14',
          ringColor: '#00ffff',
        };
      case 'blueprint':
        return {
          cellColor: '#1e40af',
          sectionColor: '#38bdf8',
          fadeDistance: 350,
          groundColor: '#030b1e',
          ringColor: '#38bdf8',
        };
      case 'warm':
        return {
          cellColor: '#d97706',
          sectionColor: '#b45309',
          fadeDistance: 350,
          groundColor: '#1c1917',
          ringColor: '#f59e0b',
        };
      case 'studio':
      default:
        return {
          cellColor: '#3f3f46',
          sectionColor: '#71717a',
          fadeDistance: 350,
          groundColor: '#09090b',
          ringColor: '#a1a1aa',
        };
    }
  }, [lightingTheme]);

  return (
    <group position={[0, -0.01, 0]}>
      {/* Subtle ground plane to catch shadows and depth */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial
          color={gridConfig.groundColor}
          roughness={0.9}
          metalness={0.1}
          depthWrite={true}
        />
      </mesh>

      {/* Primary 10mm Grid with 100mm sections */}
      <gridHelper
        args={[400, 40, new THREE.Color(gridConfig.sectionColor), new THREE.Color(gridConfig.cellColor)]}
        position={[0, 0.01, 0]}
      />

      {/* Fine 1mm sub-grid in the central 100x100mm area */}
      <gridHelper
        args={[100, 100, new THREE.Color(gridConfig.cellColor), new THREE.Color('#27272a')]}
        position={[0, 0.02, 0]}
      />

      {/* Standard Base Diameter Rings (25mm, 28.5mm, 32mm, 40mm, 50mm) */}
      {[25, 28.5, 32, 40, 50, 60].map((diameter) => (
        <mesh key={diameter} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <ringGeometry args={[(diameter / 2) - 0.25, (diameter / 2) + 0.25, 64]} />
          <meshBasicMaterial
            color={gridConfig.ringColor}
            opacity={0.22}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Central Origin Crosshair */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
        <ringGeometry args={[0, 1.5, 32]} />
        <meshBasicMaterial color="#3b82f6" opacity={0.8} transparent />
      </mesh>
    </group>
  );
};
