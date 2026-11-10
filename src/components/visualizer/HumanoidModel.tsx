
import React, { useMemo } from 'react';
import * as THREE from 'three';

interface HumanoidModelProps {
  color?: string;
  wireframe?: boolean;
  opacity?: number;
  transparent?: boolean;
  isGhost?: boolean;
  showEyeIndicator?: boolean;
}

/**
 * Standard Humanoid Miniature (Base height reference: 32mm top of head, 28mm eye level)
 * Anchored perfectly at Y=0 so scaling from (0,0,0) scales strictly upward and outward.
 */
export const HumanoidModel: React.FC<HumanoidModelProps> = ({
  color = '#38bdf8',
  wireframe = false,
  opacity = 1.0,
  transparent = false,
  isGhost = false,
  showEyeIndicator = true,
}) => {
  const materialProps = useMemo(() => ({
    color: new THREE.Color(color),
    wireframe,
    transparent: transparent || opacity < 1.0 || isGhost,
    opacity: isGhost ? 0.45 : opacity,
    roughness: isGhost ? 0.9 : 0.35,
    metalness: isGhost ? 0.0 : 0.45,
  }), [color, wireframe, transparent, opacity, isGhost]);

  const accentColor = isGhost ? color : '#f59e0b';
  const visorColor = isGhost ? color : '#06b6d4';

  return (
    <group>
      {/* 1. Miniature Base (Beveled wargaming base 25mm diameter, 3mm height) */}
      <group position={[0, 0, 0]}>
        {/* Base Bevel */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[11.5, 12.5, 3.0, 32]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Base Top Rim Inset */}
        <mesh position={[0, 3.05, 0]}>
          <cylinderGeometry args={[11.2, 11.2, 0.1, 32]} />
          <meshStandardMaterial {...materialProps} roughness={0.7} />
        </mesh>
      </group>

      {/* 2. Tactical Boots & Lower Legs (Y: 3mm to 10mm) */}
      <group position={[0, 0, 0]}>
        {/* Left Boot & Greave */}
        <mesh position={[-2.4, 6.5, 0.4]} castShadow>
          <cylinderGeometry args={[1.3, 1.6, 6.5, 12]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Left Foot Plate */}
        <mesh position={[-2.4, 4.0, 1.6]} castShadow>
          <boxGeometry args={[2.2, 2.0, 3.8]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>

        {/* Right Boot & Greave */}
        <mesh position={[2.4, 6.5, -0.4]} castShadow>
          <cylinderGeometry args={[1.3, 1.6, 6.5, 12]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Right Foot Plate */}
        <mesh position={[2.4, 4.0, 0.8]} castShadow>
          <boxGeometry args={[2.2, 2.0, 3.8]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      </group>

      {/* 3. Thighs & Hip Belt (Y: 9.5mm to 15.5mm) */}
      <group position={[0, 0, 0]}>
        {/* Hip/Pelvis Armor */}
        <mesh position={[0, 13.0, 0]} castShadow>
          <boxGeometry args={[6.8, 3.2, 4.2]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Buckle / Crest */}
        <mesh position={[0, 13.0, 2.2]}>
          <boxGeometry args={[2.0, 2.0, 0.6]} />
          <meshStandardMaterial color={accentColor} roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Left Thigh Plate */}
        <mesh position={[-2.4, 11.2, 0.2]} rotation={[0.08, 0, -0.08]} castShadow>
          <cylinderGeometry args={[1.6, 1.4, 4.5, 12]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Right Thigh Plate */}
        <mesh position={[2.4, 11.2, -0.2]} rotation={[-0.08, 0, 0.08]} castShadow>
          <cylinderGeometry args={[1.6, 1.4, 4.5, 12]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
      </group>

      {/* 4. Torso & Chest Armor (Y: 15mm to 23mm) */}
      <group position={[0, 0, 0]}>
        {/* Armored Abdomen */}
        <mesh position={[0, 16.5, 0]} castShadow>
          <cylinderGeometry args={[3.2, 3.0, 4.0, 16]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Heavy Chestplate */}
        <mesh position={[0, 20.0, 0.4]} castShadow>
          <boxGeometry args={[7.8, 5.0, 5.4]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Chest Aquila / Center Insignia */}
        <mesh position={[0, 20.2, 3.2]}>
          <boxGeometry args={[4.2, 1.8, 0.6]} />
          <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Backpack / Power Pack */}
        <mesh position={[0, 20.5, -3.2]} castShadow>
          <boxGeometry args={[6.5, 7.0, 3.2]} />
          <meshStandardMaterial {...materialProps} roughness={0.5} />
        </mesh>
        {/* Backpack Vents */}
        <mesh position={[-2.4, 23.5, -3.2]}>
          <sphereGeometry args={[1.1, 12, 12]} />
          <meshStandardMaterial color={accentColor} metalness={0.7} />
        </mesh>
        <mesh position={[2.4, 23.5, -3.2]}>
          <sphereGeometry args={[1.1, 12, 12]} />
          <meshStandardMaterial color={accentColor} metalness={0.7} />
        </mesh>
      </group>

      {/* 5. Pauldrons & Arms with Wargaming Rifle (Y: 18mm to 24mm) */}
      <group position={[0, 0, 0]}>
        {/* Left Shoulder Pauldron */}
        <mesh position={[-4.8, 22.0, 0]} rotation={[0, 0, 0.2]} castShadow>
          <sphereGeometry args={[2.5, 16, 16]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Left Arm */}
        <mesh position={[-4.4, 18.2, 1.8]} rotation={[0.4, 0.3, -0.2]} castShadow>
          <cylinderGeometry args={[1.2, 1.1, 5.5, 10]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>

        {/* Right Shoulder Pauldron */}
        <mesh position={[4.8, 22.0, 0]} rotation={[0, 0, -0.2]} castShadow>
          <sphereGeometry args={[2.5, 16, 16]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Right Arm */}
        <mesh position={[4.2, 18.5, 1.5]} rotation={[0.5, -0.4, 0.2]} castShadow>
          <cylinderGeometry args={[1.2, 1.1, 5.5, 10]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>

        {/* Tactical Bolter / Carbine Rifle */}
        <group position={[0.5, 17.5, 4.8]} rotation={[0.1, 0.1, 0]}>
          {/* Main Receiver */}
          <mesh castShadow>
            <boxGeometry args={[2.2, 2.8, 8.5]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Rifle Barrel */}
          <mesh position={[0, 0.6, 5.0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.55, 0.55, 2.8, 12]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Magazine */}
          <mesh position={[0, -2.0, 0.5]}>
            <boxGeometry args={[1.4, 2.5, 2.2]} />
            <meshStandardMaterial color="#0f172a" metalness={0.5} />
          </mesh>
        </group>
      </group>

      {/* 6. Armored Helmet & Head (Y: 24mm to 32mm Apex) */}
      <group position={[0, 0, 0]}>
        {/* Neck Gorget */}
        <mesh position={[0, 24.0, 0.5]}>
          <cylinderGeometry args={[1.9, 2.3, 1.8, 14]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Helmet Main Skull Dome */}
        <mesh position={[0, 28.0, 0.4]} castShadow>
          <sphereGeometry args={[2.6, 20, 20]} />
          <meshStandardMaterial {...materialProps} />
        </mesh>
        {/* Helmet Crest/Mohawk (Top apex reaches 32.0mm) */}
        <mesh position={[0, 31.0, 0.3]} castShadow>
          <boxGeometry args={[0.9, 1.8, 4.0]} />
          <meshStandardMaterial color={accentColor} roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Eye Visor Lens (Calibrated precisely at Y = 28.0mm Eye-Level) */}
        <mesh position={[0, 28.0, 2.65]}>
          <boxGeometry args={[2.8, 0.85, 0.4]} />
          <meshStandardMaterial
            color={visorColor}
            emissive={visorColor}
            emissiveIntensity={isGhost ? 0.2 : 0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Tactical Helmet Respirator / Filter Faceplate */}
        <mesh position={[0, 26.3, 2.2]}>
          <cylinderGeometry args={[1.2, 1.4, 1.5, 12]} />
          <meshStandardMaterial color="#475569" metalness={0.8} />
        </mesh>
      </group>

      {/* 7. Optional Visual Eye-Level & Apex Marker Ring for Measurement clarity */}
      {showEyeIndicator && !isGhost && (
        <group>
          {/* Subtle glowing ring at exact 28mm eye level */}
          <mesh position={[0, 28.0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[4.2, 4.4, 32]} />
            <meshBasicMaterial color="#38bdf8" opacity={0.3} transparent side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}
    </group>
  );
};
