import scalesData from '@/data/visualizer/scales.json';
import conversionsData from '@/data/visualizer/conversions.json';

export interface ScaleDefinition {
  id: string;
  name: string;
  shortName: string;
  ratio: string;
  eyeLevelMm: number;
  topOfHeadMm: number;
  category: string;
  popularGames: string[];
  typicalBaseMm: number;
  description: string;
}

export interface ScaleCalculationInput {
  sourceScaleId: string;
  targetScaleId: string;
  calculationMode: 'eye' | 'head';
  shrinkageRate: number; // in percent, e.g. 1.5 for 1.5%
  customSourceMm?: number;
  customTargetMm?: number;
  useOverrides?: boolean;
}

export interface ScaleCalculationResult {
  scaleFactor: number;
  scalePercentage: number;
  formattedPercentage: string;
  sourceHeightMm: number;
  targetHeightMm: number;
  deltaMm: number;
  volumeMultiplier: number;
  shrinkageMultiplier: number;
  isOverrideApplied: boolean;
  overrideReason?: string;
  formulaExplanation: string;
  slicerNotes: {
    chitubox: string;
    lychee: string;
    bambuStudio: string;
    curaPrusa: string;
  };
}

export const SCALES: ScaleDefinition[] = scalesData as ScaleDefinition[];

export function getScaleById(id: string): ScaleDefinition {
  const found = SCALES.find((s) => s.id === id);
  if (found) return found;
  return SCALES[6]; // fallback: 28mm heroic
}

export function calculateScale(input: ScaleCalculationInput): ScaleCalculationResult {
  const {
    sourceScaleId,
    targetScaleId,
    calculationMode,
    shrinkageRate = 0,
    customSourceMm = 28,
    customTargetMm = 32,
    useOverrides = true,
  } = input;

  const source = getScaleById(sourceScaleId);
  const target = getScaleById(targetScaleId);

  // 1. Determine base heights in mm
  const sourceHeightMm =
    sourceScaleId === 'custom'
      ? customSourceMm
      : calculationMode === 'eye'
      ? source.eyeLevelMm
      : source.topOfHeadMm;

  const targetHeightMm =
    targetScaleId === 'custom'
      ? customTargetMm
      : calculationMode === 'eye'
      ? target.eyeLevelMm
      : target.topOfHeadMm;

  // 2. Check for official/established overrides (e.g. 28mm heroic to 32mm heroic)
  const overrideKey = `${sourceScaleId}_to_${targetScaleId}`;
  const overrides = conversionsData.headOverrides as Record<string, { scaleFactor: number; reason: string }>;
  const overrideMatch = useOverrides && sourceScaleId !== 'custom' && targetScaleId !== 'custom' ? overrides[overrideKey] : null;

  let baseScaleFactor: number;
  let isOverrideApplied = false;
  let overrideReason: string | undefined;

  if (overrideMatch && calculationMode === 'head') {
    // If specific head override exists and in head mode
    baseScaleFactor = overrideMatch.scaleFactor;
    isOverrideApplied = true;
    overrideReason = overrideMatch.reason;
  } else {
    // Standard mathematical ratio
    baseScaleFactor = sourceHeightMm > 0 ? targetHeightMm / sourceHeightMm : 1.0;
  }

  // 3. Shrinkage compensation multiplier
  // If resin shrinks by S%, the model needs to be printed at 1 / (1 - S/100) size
  const clampedShrinkage = Math.max(0, Math.min(15, shrinkageRate));
  const shrinkageMultiplier = clampedShrinkage > 0 ? 100 / (100 - clampedShrinkage) : 1.0;

  const finalScaleFactor = baseScaleFactor * shrinkageMultiplier;
  const scalePercentage = finalScaleFactor * 100;
  const formattedPercentage = `${scalePercentage.toFixed(2)}%`;
  const deltaMm = targetHeightMm - sourceHeightMm;
  const volumeMultiplier = Math.pow(finalScaleFactor, 3);

  // 4. Formula Explanation string
  const modeLabel = calculationMode === 'eye' ? 'Eye-Level (Sole to Eyes)' : 'Top of Head (Total Apex)';
  let formulaExplanation = '';
  if (clampedShrinkage > 0) {
    formulaExplanation = `(${targetHeightMm.toFixed(1)}mm / ${sourceHeightMm.toFixed(1)}mm) × (100 / (100 - ${clampedShrinkage}%)) = ${formattedPercentage} [${modeLabel}]`;
  } else {
    formulaExplanation = `${targetHeightMm.toFixed(1)}mm / ${sourceHeightMm.toFixed(1)}mm = ${formattedPercentage} [${modeLabel}]`;
  }

  // 5. Slicer-specific quick format
  const pctStr = `${scalePercentage.toFixed(1)}%`;
  const factorStr = finalScaleFactor.toFixed(4);

  return {
    scaleFactor: finalScaleFactor,
    scalePercentage,
    formattedPercentage,
    sourceHeightMm,
    targetHeightMm,
    deltaMm,
    volumeMultiplier,
    shrinkageMultiplier,
    isOverrideApplied,
    overrideReason,
    formulaExplanation,
    slicerNotes: {
      chitubox: `Scale: ${pctStr} (Ratio: ${factorStr})`,
      lychee: `Uniform Scale: ${pctStr}`,
      bambuStudio: `Scale Factor: ${pctStr} (or ×${factorStr})`,
      curaPrusa: `Scale X/Y/Z: ${pctStr}`,
    },
  };
}
