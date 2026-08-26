
import React, { useMemo } from 'react';
import * as THREE from 'three';
import printBedsData from '@/data/visualizer/printBeds.json';

interface PrintBedVolumeProps {
  printBedId: string;
  customBed: { width: number; depth: number; height: number };
}

export const PrintBedVolume: React.FC<PrintBedVolumeProps> = ({ printBedId, customBed }) => {
  const bed = useMemo(() => {
    if (printBedId === 'none') return null;
    if (printBedId === 'custom') {
      return {
        id: 'custom',
        name: `Custom Bed (${customBed.width}×${customBed.depth}×${customBed.height}mm)`,
        width: customBed.width,
        depth: customBed.depth,
        height: customBed.height,
        type: 'Custom',
      };
    }
    return printBedsData.find((b) => b.id === printBedId) || null;
  }, [printBedId, customBed]);

  if (!bed || bed.width <= 0) return null;

  const { width, depth, height } = bed;

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Build Plate Ground Surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]} receiveShadow>
        <planeGeometry args={[width, depth]} />
        <meshStandardMaterial
          color="#18181b"
          roughness={0.7}
          metalness={0.3}
          depthWrite={false}
        />
      </mesh>

      {/* Build Plate Perimeter Border */}
      <lineSegments position={[0, 0.08, 0]}>
        <edgesGeometry
          args={[new THREE.BoxGeometry(width, 0.1, depth)]}
        />
        <lineBasicMaterial color="#3b82f6" linewidth={2} />
      </lineSegments>

      {/* 2. Full 3D Build Volume Boundary (Height is Y axis in 3D world) */}
      <group position={[0, height / 2, 0]}>
        {/* Wireframe Volume Box */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
          <lineBasicMaterial color="#38bdf8" opacity={0.35} transparent />
        </lineSegments>

        {/* Subtle Semi-Transparent Volume Envelope */}
        <mesh>
          <boxGeometry args={[width, height, depth]} />
          <meshBasicMaterial
            color="#0284c7"
            opacity={0.03}
            transparent
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Top Z-Max Ceiling Boundary Ring */}
      <lineSegments position={[0, height, 0]}>
        <edgesGeometry args={[new THREE.BoxGeometry(width, 0.1, depth)]} />
        <lineBasicMaterial color="#ef4444" opacity={0.5} transparent />
      </lineSegments>
    </group>
  );
};
