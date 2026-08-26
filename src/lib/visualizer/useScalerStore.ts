import { create } from 'zustand';
import * as THREE from 'three';

export type CalculationMode = 'eye' | 'head';
export type ModelType = 'humanoid' | 'vehicle' | 'cylinder' | 'custom_stl';
export type ViewMode = 'side_by_side' | 'stacked' | 'source_only' | 'target_only';
export type ReferenceObjectType = 'none' | 'battery_aa' | 'base28' | 'base32' | 'd6_dice' | 'coin_quarter';
export type LightingTheme = 'studio' | 'cyberpunk' | 'blueprint' | 'warm';
export type CameraPreset = 'perspective' | 'front' | 'side' | 'top' | 'isometric';

export interface CustomStlData {
  name: string;
  geometry: THREE.BufferGeometry;
  vertexCount: number;
  triangleCount: number;
  bounds: {
    width: number;
    depth: number;
    height: number;
    volumeCm3: number;
  };
  originalHeightMm: number;
}

interface ScalerState {
  sourceScaleId: string;
  targetScaleId: string;
  customSourceMm: number;
  customTargetMm: number;
  calculationMode: CalculationMode;
  shrinkageRate: number;
  useOverrides: boolean;

  modelType: ModelType;
  viewMode: ViewMode;
  referenceObject: ReferenceObjectType;
  printBedId: string;
  customBed: { width: number; depth: number; height: number };

  showMeasurements: boolean;
  showBoundingBox: boolean;
  wireframe: boolean;
  lightingTheme: LightingTheme;
  cameraPreset: CameraPreset;

  customStl: CustomStlData | null;
  snapshotTrigger: number;

  // Actions
  setSourceScaleId: (id: string) => void;
  setTargetScaleId: (id: string) => void;
  swapScales: () => void;
  setCustomSourceMm: (val: number) => void;
  setCustomTargetMm: (val: number) => void;
  setCalculationMode: (mode: CalculationMode) => void;
  setShrinkageRate: (rate: number) => void;
  setUseOverrides: (enabled: boolean) => void;

  setModelType: (type: ModelType) => void;
  setViewMode: (mode: ViewMode) => void;
  setReferenceObject: (ref: ReferenceObjectType) => void;
  setPrintBedId: (id: string) => void;
  setCustomBed: (bed: { width: number; depth: number; height: number }) => void;

  toggleMeasurements: () => void;
  toggleBoundingBox: () => void;
  toggleWireframe: () => void;
  setLightingTheme: (theme: LightingTheme) => void;
  setCameraPreset: (preset: CameraPreset) => void;

  setCustomStl: (stl: CustomStlData | null) => void;
  clearCustomStl: () => void;
  triggerSnapshot: () => void;
  resetDefaults: () => void;
}

export const useScalerStore = create<ScalerState>((set) => ({
  sourceScaleId: '28mm_heroic',
  targetScaleId: '32mm_heroic',
  customSourceMm: 28,
  customTargetMm: 32,
  calculationMode: 'eye',
  shrinkageRate: 0.0,
  useOverrides: true,

  modelType: 'humanoid',
  viewMode: 'side_by_side',
  referenceObject: 'battery_aa',
  printBedId: 'none',
  customBed: { width: 200, depth: 200, height: 200 },

  showMeasurements: true,
  showBoundingBox: false,
  wireframe: false,
  lightingTheme: 'studio',
  cameraPreset: 'perspective',

  customStl: null,
  snapshotTrigger: 0,

  setSourceScaleId: (id) => set({ sourceScaleId: id }),
  setTargetScaleId: (id) => set({ targetScaleId: id }),
  swapScales: () =>
    set((state) => ({
      sourceScaleId: state.targetScaleId,
      targetScaleId: state.sourceScaleId,
      customSourceMm: state.customTargetMm,
      customTargetMm: state.customSourceMm,
    })),
  setCustomSourceMm: (val) => set({ customSourceMm: Math.max(1, val) }),
  setCustomTargetMm: (val) => set({ customTargetMm: Math.max(1, val) }),
  setCalculationMode: (mode) => set({ calculationMode: mode }),
  setShrinkageRate: (rate) => set({ shrinkageRate: Math.max(0, Math.min(15, rate)) }),
  setUseOverrides: (enabled) => set({ useOverrides: enabled }),

  setModelType: (type) => set({ modelType: type }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setReferenceObject: (ref) => set({ referenceObject: ref }),
  setPrintBedId: (id) => set({ printBedId: id }),
  setCustomBed: (bed) => set({ customBed: bed }),

  toggleMeasurements: () => set((state) => ({ showMeasurements: !state.showMeasurements })),
  toggleBoundingBox: () => set((state) => ({ showBoundingBox: !state.showBoundingBox })),
  toggleWireframe: () => set((state) => ({ wireframe: !state.wireframe })),
  setLightingTheme: (theme) => set({ lightingTheme: theme }),
  setCameraPreset: (preset) => set({ cameraPreset: preset }),

  setCustomStl: (stl) => set({ customStl: stl, modelType: stl ? 'custom_stl' : 'humanoid' }),
  clearCustomStl: () => set({ customStl: null, modelType: 'humanoid' }),
  triggerSnapshot: () => set((state) => ({ snapshotTrigger: state.snapshotTrigger + 1 })),
  resetDefaults: () =>
    set({
      sourceScaleId: '28mm_heroic',
      targetScaleId: '32mm_heroic',
      customSourceMm: 28,
      customTargetMm: 32,
      calculationMode: 'eye',
      shrinkageRate: 0.0,
      modelType: 'humanoid',
      viewMode: 'side_by_side',
      referenceObject: 'battery_aa',
      printBedId: 'none',
      showMeasurements: true,
      showBoundingBox: false,
      wireframe: false,
      lightingTheme: 'studio',
      cameraPreset: 'perspective',
    }),
}));
