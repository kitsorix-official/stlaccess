
import { useMemo, useCallback, useState } from 'react';
import { useScalerStore } from '@/lib/visualizer/useScalerStore';
import { calculateScale, getScaleById, SCALES } from '@/lib/visualizer/scaleEngine';
import type { ScaleCalculationResult, ScaleDefinition } from '@/lib/visualizer/scaleEngine';

export function useScaleEngine() {
  const {
    sourceScaleId,
    targetScaleId,
    customSourceMm,
    customTargetMm,
    calculationMode,
    shrinkageRate,
    useOverrides,
    setSourceScaleId,
    setTargetScaleId,
    swapScales,
    setCustomSourceMm,
    setCustomTargetMm,
    setCalculationMode,
    setShrinkageRate,
    setUseOverrides,
  } = useScalerStore();

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const sourceScale = useMemo(() => getScaleById(sourceScaleId), [sourceScaleId]);
  const targetScale = useMemo(() => getScaleById(targetScaleId), [targetScaleId]);

  const calculation: ScaleCalculationResult = useMemo(() => {
    return calculateScale({
      sourceScaleId,
      targetScaleId,
      calculationMode,
      shrinkageRate,
      customSourceMm,
      customTargetMm,
      useOverrides,
    });
  }, [
    sourceScaleId,
    targetScaleId,
    calculationMode,
    shrinkageRate,
    customSourceMm,
    customTargetMm,
    useOverrides,
  ]);

  const copyToClipboard = useCallback(async (text: string, keyId: string = 'percentage') => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setCopiedKey(keyId);
        setTimeout(() => setCopiedKey(null), 2000);
      }
    } catch {
      // Fallback
    }
  }, []);

  return {
    sourceScale,
    targetScale,
    allScales: SCALES,
    calculation,
    calculationMode,
    shrinkageRate,
    customSourceMm,
    customTargetMm,
    useOverrides,
    copiedKey,
    // Actions
    setSourceScaleId,
    setTargetScaleId,
    swapScales,
    setCustomSourceMm,
    setCustomTargetMm,
    setCalculationMode,
    setShrinkageRate,
    setUseOverrides,
    copyToClipboard,
  };
}
