
import React from 'react';
import * as THREE from 'three';
import type { ReferenceObjectType } from '@/lib/visualizer/useScalerStore';

interface ReferenceObjectProps {
  type: ReferenceObjectType;
  position?: [number, number, number];
}

export const ReferenceObject: React.FC<ReferenceObjectProps> = ({
  type,
  position = [0, 0, 22],
}) => {
  if (type === 'none') return null;

  return (
    <group position={position}>
      {/* 1. Standard AA Battery (14.5mm diameter x 50.5mm height) */}
      {type === 'battery_aa' && (
        <group>
          {/* Main Cylindrical Body (14.5mm dia, 47mm height, Y: 0 to 47mm) */}
          <mesh position={[0, 23.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[7.25, 7.25, 47, 32]} />
            <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
          </mesh>
          {/* Copper Top Band (Y: 34 to 47mm) */}
          <mesh position={[0, 40.5, 0]}>
            <cylinderGeometry args={[7.27, 7.27, 13, 32]} />
            <meshStandardMaterial color="#d97706" roughness={0.25} metalness={0.85} />
          </mesh>
          {/* Positive Terminal Pip (5.5mm dia, 3.5mm height, reaches exactly 50.5mm) */}
          <mesh position={[0, 48.75, 0]} castShadow>
            <cylinderGeometry args={[2.75, 2.75, 3.5, 24]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Negative Flat Base Rim */}
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[7.0, 7.0, 0.4, 24]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.9} />
          </mesh>
          {/* AA Label Plaque */}
          <mesh position={[0, 24, 7.3]}>
            <planeGeometry args={[7, 12]} />
            <meshBasicMaterial color="#ffffff" opacity={0.85} transparent />
          </mesh>
        </group>
      )}

      {/* 2. Standard 16mm D6 Tabletop Gaming Dice */}
      {type === 'd6_dice' && (
        <group position={[0, 8, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[16, 16, 16]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.15} metalness={0.1} />
          </mesh>
          {/* Top Face (1 Pip) */}
          <mesh position={[0, 8.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[1.5, 16]} />
            <meshBasicMaterial color="#dc2626" />
          </mesh>
          {/* Front Face (6 Pips) */}
          {[-4, 4].map((x) =>
            [-5, 0, 5].map((y) => (
              <mesh key={`6_${x}_${y}`} position={[x, y, 8.05]}>
                <circleGeometry args={[1.2, 16]} />
                <meshBasicMaterial color="#0f172a" />
              </mesh>
            ))
          )}
        </group>
      )}

      {/* 3. Standard 28.5mm Wargaming Base */}
      {type === 'base28' && (
        <group position={[0, 0, 0]}>
          <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[13.25, 14.25, 3.0, 32]} />
            <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.2} />
          </mesh>
          <mesh position={[0, 3.05, 0]}>
            <cylinderGeometry args={[13.0, 13.0, 0.1, 32]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>
        </group>
      )}

      {/* 4. Standard 32mm Wargaming Base */}
      {type === 'base32' && (
        <group position={[0, 0, 0]}>
          <mesh position={[0, 1.75, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[15.0, 16.0, 3.5, 36]} />
            <meshStandardMaterial color="#334155" roughness={0.6} metalness={0.2} />
          </mesh>
          <mesh position={[0, 3.55, 0]}>
            <cylinderGeometry args={[14.8, 14.8, 0.1, 36]} />
            <meshStandardMaterial color="#1e293b" roughness={0.8} />
          </mesh>
        </group>
      )}

      {/* 5. US Quarter / 1-Euro Coin (24.26mm dia x 1.75mm height) */}
      {type === 'coin_quarter' && (
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0.875, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[12.13, 12.13, 1.75, 36]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Embossed Rim */}
          <mesh position={[0, 1.76, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[11.2, 12.1, 36]} />
            <meshBasicMaterial color="#cbd5e1" side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}
    </group>
  );
};
