
import React, { useMemo } from 'react';
import * as THREE from 'three';

interface VehicleModelProps {
  color?: string;
  wireframe?: boolean;
  opacity?: number;
  transparent?: boolean;
  isGhost?: boolean;
}

/**
 * Tactical Armored Vehicle (Tank/APC)
 * Anchored at Y=0 (Tracks touch the ground grid).
 * Base reference: 58mm length x 36mm width x 30mm height to turret cupola.
 */
export const VehicleModel: React.FC<VehicleModelProps> = ({
  color = '#10b981',
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
    roughness: isGhost ? 0.9 : 0.4,
    metalness: isGhost ? 0.0 : 0.5,
  }), [color, wireframe, transparent, opacity, isGhost]);

  const trackColor = isGhost ? color : '#1e293b';
  const accentColor = isGhost ? color : '#f59e0b';
  const barrelColor = isGhost ? color : '#334155';

  return (
    <group>
      {/* 1. Left Track Pod (Y: 0 to 11mm) */}
      <group position={[-15, 0, 0]}>
        {/* Main Tread Band */}
        <mesh position={[0, 5.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.5, 11, 54]} />
          <meshStandardMaterial color={trackColor} roughness={0.7} metalness={0.4} wireframe={wireframe} />
        </mesh>
        {/* Track Armor Skirt */}
        <mesh position={[-1.5, 7.5, 0]} castShadow>
          <boxGeometry args={[3.8, 7.0, 50]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Road Wheels */}
        {[-18, -9, 0, 9, 18].map((zPos, idx) => (
          <mesh key={idx} position={[3.4, 4.5, zPos]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[3.8, 3.8, 1.2, 16]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* 2. Right Track Pod (Y: 0 to 11mm) */}
      <group position={[15, 0, 0]}>
        {/* Main Tread Band */}
        <mesh position={[0, 5.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[6.5, 11, 54]} />
          <meshStandardMaterial color={trackColor} roughness={0.7} metalness={0.4} wireframe={wireframe} />
        </mesh>
        {/* Track Armor Skirt */}
        <mesh position={[1.5, 7.5, 0]} castShadow>
          <boxGeometry args={[3.8, 7.0, 50]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Road Wheels */}
        {[-18, -9, 0, 9, 18].map((zPos, idx) => (
          <mesh key={idx} position={[-3.4, 4.5, zPos]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[3.8, 3.8, 1.2, 16]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
        ))}
      </group>

      {/* 3. Lower & Central Hull Chassis (Y: 4mm to 16mm) */}
      <group position={[0, 0, 0]}>
        {/* Main Chassis Box */}
        <mesh position={[0, 10.0, 0]} castShadow receiveShadow>
          <boxGeometry args={[23.5, 10.0, 50]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Sloped Front Glacis Plate */}
        <mesh position={[0, 10.5, 23.5]} rotation={[0.4, 0, 0]} castShadow>
          <boxGeometry args={[23.5, 9.0, 4.0]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Driver Visor Port */}
        <mesh position={[-5, 14.2, 23.0]}>
          <boxGeometry args={[3.8, 1.2, 1.2]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={isGhost ? 0.1 : 0.6} />
        </mesh>
        {/* Hull Machine Gun */}
        <mesh position={[5, 12.0, 26.5]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 6.0, 10]} />
          <meshStandardMaterial color={barrelColor} metalness={0.9} />
        </mesh>
      </group>

      {/* 4. Rotating Turret Assembly (Y: 15mm to 30mm) */}
      <group position={[0, 16.0, -2.0]}>
        {/* Turret Ring Base */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[10, 10.5, 1.2, 24]} />
          <meshStandardMaterial {...materialProps} roughness={0.3} />
        </mesh>
        {/* Angular Main Turret Bunker */}
        <mesh position={[0, 5.0, 0]} castShadow>
          <boxGeometry args={[18, 8.5, 24]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Commander's Hatch / Cupola (Peak height reaches 30.0mm) */}
        <mesh position={[-4.5, 10.0, -3.0]} castShadow>
          <cylinderGeometry args={[3.2, 3.2, 2.4, 16]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        <mesh position={[-4.5, 11.3, -3.0]}>
          <cylinderGeometry args={[2.8, 2.8, 0.4, 16]} />
          <meshStandardMaterial color={accentColor} metalness={0.7} />
        </mesh>

        {/* Heavy Battle Cannon Barrel */}
        <group position={[0, 5.0, 12.0]}>
          {/* Mantlet */}
          <mesh castShadow>
            <boxGeometry args={[7.0, 5.5, 4.5]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          {/* Main Barrel */}
          <mesh position={[0, 0, 16.0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[1.5, 1.8, 30.0, 16]} />
            <meshStandardMaterial color={barrelColor} metalness={0.85} roughness={0.2} />
          </mesh>
          {/* Muzzle Brake */}
          <mesh position={[0, 0, 31.5]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[2.2, 2.0, 3.5, 16]} />
            <meshStandardMaterial color={barrelColor} metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Turret Rear Storage Stowage Rack */}
        <mesh position={[0, 4.5, -12.5]} castShadow>
          <boxGeometry args={[16, 5.0, 3.5]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
};
