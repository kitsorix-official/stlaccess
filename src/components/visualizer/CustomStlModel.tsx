
import React, { useMemo } from 'react';
import * as THREE from 'three';

interface CustomStlModelProps {
  geometry: THREE.BufferGeometry;
  color?: string;
  wireframe?: boolean;
  opacity?: number;
  transparent?: boolean;
  isGhost?: boolean;
}

export const CustomStlModel: React.FC<CustomStlModelProps> = ({
  geometry,
  color = '#ec4899',
  wireframe = false,
  opacity = 1.0,
  transparent = false,
  isGhost = false,
}) => {
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      wireframe,
      transparent: transparent || opacity < 1.0 || isGhost,
      opacity: isGhost ? 0.45 : opacity,
      roughness: isGhost ? 0.9 : 0.35,
      metalness: isGhost ? 0.0 : 0.4,
      side: THREE.DoubleSide,
    });
  }, [color, wireframe, transparent, opacity, isGhost]);

  return (
    <mesh geometry={geometry} material={material} castShadow receiveShadow />
  );
};
