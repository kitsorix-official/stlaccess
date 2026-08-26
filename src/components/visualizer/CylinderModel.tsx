
import React, { useMemo } from 'react';
import * as THREE from 'three';

interface CylinderModelProps {
  color?: string;
  wireframe?: boolean;
  opacity?: number;
  transparent?: boolean;
  isGhost?: boolean;
}

/**
 * Precision Calibration Column / Gauge Cylinder
 * Standard base reference: 20mm diameter x 32mm height (with 28mm eye level notch)
 * Anchored at Y=0.
 */
export const CylinderModel: React.FC<CylinderModelProps> = ({
  color = '#8b5cf6',
  wireframe = false,
  opacity = 1.0,
  transparent = false,
  isGhost = false,
}) => {
  const materialProps = useMemo(() => ({
    color: new THREE.Color(color),
    wireframe,
    transparent: transparent || opacity < 1.0 || isGhost,
    opacity: isGhost ? 0.45 : opacity,
    roughness: isGhost ? 0.9 : 0.3,
    metalness: isGhost ? 0.0 : 0.6,
  }), [color, wireframe, transparent, opacity, isGhost]);

  return (
    <group>
      {/* Main Cylinder Column (20mm diameter, 32mm height, centered in Y from 0 to 32) */}
      <mesh position={[0, 16.0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[10, 10, 32.0, 36]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>

      {/* Calibration Height Rings every 5mm */}
      {[5, 10, 15, 20, 25, 30].map((h) => (
        <mesh key={h} position={[0, h, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[10.05, 10.3, 36]} />
          <meshBasicMaterial
            color={isGhost ? color : '#e2e8f0'}
            opacity={isGhost ? 0.3 : 0.8}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Special 28mm Eye-Level Gold Gauge Ring */}
      <mesh position={[0, 28.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[10.1, 10.6, 36]} />
        <meshBasicMaterial
          color="#f59e0b"
          opacity={isGhost ? 0.3 : 0.95}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top 32mm Crown Inset */}
      <mesh position={[0, 32.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[9.5, 32]} />
        <meshBasicMaterial color="#38bdf8" opacity={0.6} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Center Laser Pointer Pin */}
      <mesh position={[0, 32.5, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1.0, 12]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.9} />
      </mesh>
    </group>
  );
};
