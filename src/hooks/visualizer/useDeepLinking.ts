
import { useEffect, useRef } from 'react';
import { useScalerStore } from '@/lib/visualizer/useScalerStore';

export function useDeepLinking() {
  const isInitialized = useRef(false);
  const {
    sourceScaleId,
    targetScaleId,
    calculationMode,
    shrinkageRate,
    modelType,
    viewMode,
    referenceObject,
    printBedId,
    setSourceScaleId,
    setTargetScaleId,
    setCalculationMode,
    setShrinkageRate,
    setModelType,
    setViewMode,
    setReferenceObject,
    setPrintBedId,
  } = useScalerStore();

  // Read URL params on initial load
  useEffect(() => {
    if (typeof window === 'undefined' || isInitialized.current) return;
    isInitialized.current = true;

    try {
      const params = new URLSearchParams(window.location.search);
      const src = params.get('src');
      const dst = params.get('dst');
      const mode = params.get('mode');
      const shrink = params.get('shrink');
      const model = params.get('model');
      const view = params.get('view');
      const ref = params.get('ref');
      const bed = params.get('bed');

      if (src) setSourceScaleId(src);
      if (dst) setTargetScaleId(dst);
      if (mode === 'eye' || mode === 'head') setCalculationMode(mode);
      if (shrink && !isNaN(parseFloat(shrink))) setShrinkageRate(parseFloat(shrink));
      if (model && ['humanoid', 'vehicle', 'cylinder'].includes(model)) setModelType(model as any);
      if (view && ['side_by_side', 'stacked', 'source_only', 'target_only'].includes(view)) setViewMode(view as any);
      if (ref && ['none', 'battery_aa', 'base28', 'base32', 'd6_dice', 'coin_quarter'].includes(ref)) setReferenceObject(ref as any);
      if (bed) setPrintBedId(bed);
    } catch {
      // ignore param parsing errors
    }
  }, [
    setSourceScaleId,
    setTargetScaleId,
    setCalculationMode,
    setShrinkageRate,
    setModelType,
    setViewMode,
    setReferenceObject,
    setPrintBedId,
  ]);

  // Update URL params when key state variables change
  useEffect(() => {
    if (typeof window === 'undefined' || !isInitialized.current) return;

    const params = new URLSearchParams();
    if (sourceScaleId !== '28mm_heroic') params.set('src', sourceScaleId);
    if (targetScaleId !== '32mm_heroic') params.set('dst', targetScaleId);
    if (calculationMode !== 'eye') params.set('mode', calculationMode);
    if (shrinkageRate > 0) params.set('shrink', shrinkageRate.toString());
    if (modelType !== 'humanoid' && modelType !== 'custom_stl') params.set('model', modelType);
    if (viewMode !== 'side_by_side') params.set('view', viewMode);
    if (referenceObject !== 'battery_aa') params.set('ref', referenceObject);
    if (printBedId !== 'none') params.set('bed', printBedId);

    const queryString = params.toString();
    const newUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;

    window.history.replaceState(null, '', newUrl);
  }, [
    sourceScaleId,
    targetScaleId,
    calculationMode,
    shrinkageRate,
    modelType,
    viewMode,
    referenceObject,
    printBedId,
  ]);
}
