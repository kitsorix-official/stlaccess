
import React from 'react';
import type { ModelType, CustomStlData } from '@/lib/visualizer/useScalerStore';
import { HumanoidModel } from './HumanoidModel';
import { VehicleModel } from './VehicleModel';
import { CylinderModel } from './CylinderModel';
import { CustomStlModel } from './CustomStlModel';

interface ModelFactoryProps {
  modelType: ModelType;
  customStl?: CustomStlData | null;
  color?: string;
  wireframe?: boolean;
  opacity?: number;
  transparent?: boolean;
  isGhost?: boolean;
  showEyeIndicator?: boolean;
}

export const ModelFactory: React.FC<ModelFactoryProps> = ({
  modelType,
  customStl,
  color,
  wireframe,
  opacity,
  transparent,
  isGhost,
  showEyeIndicator,
}) => {
  if (modelType === 'custom_stl' && customStl?.geometry) {
    return (
      <CustomStlModel
        geometry={customStl.geometry}
        color={color}
        wireframe={wireframe}
        opacity={opacity}
        transparent={transparent}
        isGhost={isGhost}
      />
    );
  }

  if (modelType === 'vehicle') {
    return (
      <VehicleModel
        color={color}
        wireframe={wireframe}
        opacity={opacity}
        transparent={transparent}
        isGhost={isGhost}
      />
    );
  }

  if (modelType === 'cylinder') {
    return (
      <CylinderModel
        color={color}
        wireframe={wireframe}
        opacity={opacity}
        transparent={transparent}
        isGhost={isGhost}
      />
    );
  }

  // Default: Humanoid
  return (
    <HumanoidModel
      color={color}
      wireframe={wireframe}
      opacity={opacity}
      transparent={transparent}
      isGhost={isGhost}
      showEyeIndicator={showEyeIndicator}
    />
  );
};
