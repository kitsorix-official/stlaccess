
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useScalerStore } from '@/lib/visualizer/useScalerStore';

export const SnapshotHelper: React.FC = () => {
  const { gl, scene, camera } = useThree();
  const snapshotTrigger = useScalerStore((state) => state.snapshotTrigger);

  useEffect(() => {
    if (snapshotTrigger > 0) {
      // Force render before taking capture
      gl.render(scene, camera);
      const dataUrl = gl.domElement.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.download = `STLACCESS-3D-Scale-Comparison-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [snapshotTrigger, gl, scene, camera]);

  return null;
};
