import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import {
  AlertCircle,
  Box,
  CheckCircle2,
  Eye,
  EyeOff,
  FileBox,
  Grid3X3,
  RotateCcw,
  Trash2,
  UploadCloud,
} from "lucide-react";
import {
  formatFileSize,
  formatMillimetres,
  parseStlForViewer,
  type StlModelData,
} from "../../lib/stlViewer";

type UpAxis = "z" | "y";

interface ModelMeshProps {
  model: StlModelData;
  wireframe: boolean;
  showBounds: boolean;
  upAxis: UpAxis;
}

function ModelMesh({ model, wireframe, showBounds, upAxis }: ModelMeshProps) {
  const edges = useMemo(
    () => new THREE.EdgesGeometry(model.geometry, 25),
    [model.geometry],
  );

  useEffect(() => () => edges.dispose(), [edges]);

  const rotation: [number, number, number] =
    upAxis === "z" ? [-Math.PI / 2, 0, 0] : [0, 0, 0];

  return (
    <group rotation={rotation}>
      <mesh geometry={model.geometry} castShadow receiveShadow>
        <meshStandardMaterial
          color="#ff6b35"
          side={THREE.DoubleSide}
          wireframe={wireframe}
          roughness={0.38}
          metalness={0.12}
        />
      </mesh>
      {showBounds && (
        <lineSegments geometry={edges}>
          <lineBasicMaterial color="#e2e8f0" transparent opacity={0.35} />
        </lineSegments>
      )}
    </group>
  );
}

interface ViewerSceneProps extends ModelMeshProps {
  showGrid: boolean;
  viewKey: number;
}

function ViewerScene({
  model,
  wireframe,
  showBounds,
  showGrid,
  upAxis,
  viewKey,
}: ViewerSceneProps) {
  const largest = Math.max(model.bounds.x, model.bounds.y, model.bounds.z, 1);
  const distance = largest * 2.6;
  const gridSize = Math.max(50, Math.ceil((largest * 2.5) / 10) * 10);
  const groundY = -(upAxis === "z" ? model.bounds.z : model.bounds.y) / 2;

  return (
    <Canvas
      key={`${viewKey}-${model.name}-${model.sizeBytes}`}
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      className="h-full w-full"
    >
      <color attach="background" args={["#08090b"]} />
      <PerspectiveCamera
        makeDefault
        position={[distance, distance * 0.65, distance]}
        fov={40}
        near={Math.max(0.01, largest / 1000)}
        far={distance * 20}
      />
      <OrbitControls
        makeDefault
        target={[0, 0, 0]}
        enableDamping
        dampingFactor={0.08}
        minDistance={Math.max(1, largest * 0.15)}
        maxDistance={distance * 8}
      />
      <ambientLight intensity={0.85} />
      <hemisphereLight args={["#dbeafe", "#111827", 0.7]} />
      <directionalLight
        position={[distance, distance * 1.4, distance]}
        intensity={2.1}
        castShadow
      />
      <directionalLight position={[-distance, distance, -distance]} intensity={0.9} />

      {showGrid && (
        <>
          <gridHelper
            args={[gridSize, Math.max(10, gridSize / 5), "#334155", "#1e293b"]}
            position={[0, groundY, 0]}
          />
          <axesHelper args={[largest * 0.35]} position={[0, groundY + 0.01, 0]} />
        </>
      )}

      <ModelMesh
        model={model}
        wireframe={wireframe}
        showBounds={showBounds}
        upAxis={upAxis}
      />
    </Canvas>
  );
}

function StatCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <dt className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-2 font-mono text-lg font-bold text-white break-words">{value}</dd>
      {note && <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{note}</p>}
    </div>
  );
}

export default function StlViewerApp() {
  const [model, setModel] = useState<StlModelData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [showBounds, setShowBounds] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [upAxis, setUpAxis] = useState<UpAxis>("z");
  const [viewKey, setViewKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      model?.geometry.dispose();
    };
  }, [model]);

  const openFile = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const parsed = parseStlForViewer(buffer, file.name);
      setModel((previous) => {
        previous?.geometry.dispose();
        return parsed;
      });
      setViewKey((key) => key + 1);
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "I could not read that STL file.";
      setError(message);
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void openFile(file);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void openFile(file);
  };

  const clearModel = () => {
    setModel((previous) => {
      previous?.geometry.dispose();
      return null;
    });
    setError(null);
  };

  const dimensionText = model
    ? `${formatMillimetres(model.bounds.x)} × ${formatMillimetres(model.bounds.y)} × ${formatMillimetres(model.bounds.z)}`
    : "—";

  return (
    <div className="w-full bg-[#08090b] text-slate-200 font-sans">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              100% local
            </span>
            <span className="text-xs text-slate-500">
              Your STL never leaves this device
            </span>
          </div>
          {model && (
            <button
              type="button"
              onClick={clearModel}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-300 transition-colors hover:border-[#ff6b35]/50 hover:text-white"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              Open another STL
            </button>
          )}
        </div>

        {!model ? (
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`rounded-[2rem] border-2 border-dashed p-10 text-center transition-colors md:p-20 ${
              dragging
                ? "border-[#ff6b35] bg-[#ff6b35]/10"
                : "border-white/10 bg-white/[0.02] hover:border-[#ff6b35]/50"
            }`}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ff6b35]/15">
              <UploadCloud className="h-8 w-8 text-[#ff6b35]" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Drop an STL here to preview it
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-400">
              I built this for a fast visual check before a file reaches my slicer.
              It reads ASCII and binary STL locally, then reports the bounding
              box, triangle count and file size.
            </p>

            <label
              htmlFor="stl-viewer-file"
              tabIndex={0}
              className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#ff6b35] px-6 py-3.5 text-sm font-black uppercase tracking-widest text-black transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:ring-offset-2 focus:ring-offset-[#08090b]"
            >
              <FileBox className="h-4 w-4" aria-hidden="true" />
              Choose STL file
            </label>
            <input
              ref={inputRef}
              id="stl-viewer-file"
              type="file"
              accept=".stl,model/stl,application/sla"
              onChange={handleInputChange}
              className="sr-only"
            />
            <p className="mt-4 text-xs text-slate-600">
              No upload · no account · no cookies · no file stored
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            <section
              aria-label="STL model preview"
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#08090b]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Box className="h-5 w-5 shrink-0 text-[#ff6b35]" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-white">{model.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                      {model.format} STL · {model.triangleCount.toLocaleString()} triangles
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setWireframe((value) => !value)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
                      wireframe
                        ? "border-[#ff6b35]/60 bg-[#ff6b35]/15 text-[#ff6b35]"
                        : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {wireframe ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    Wireframe
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBounds((value) => !value)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
                      showBounds
                        ? "border-[#ff6b35]/60 bg-[#ff6b35]/15 text-[#ff6b35]"
                        : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Box className="h-3.5 w-3.5" />
                    Bounds
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowGrid((value) => !value)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[10px] font-black uppercase tracking-widest transition-colors ${
                      showGrid
                        ? "border-[#ff6b35]/60 bg-[#ff6b35]/15 text-[#ff6b35]"
                        : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    <Grid3X3 className="h-3.5 w-3.5" />
                    Grid
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewKey((key) => key + 1)}
                    aria-label="Reset camera view"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-white"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                </div>
              </div>

              <div className="h-[420px] w-full md:h-[560px] lg:h-[640px]">
                <ViewerScene
                  model={model}
                  wireframe={wireframe}
                  showBounds={showBounds}
                  showGrid={showGrid}
                  upAxis={upAxis}
                  viewKey={viewKey}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
                <label
                  htmlFor="stl-up-axis"
                  className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-500"
                >
                  Display up axis
                </label>
                <div className="flex gap-2">
                  {(["z", "y"] as UpAxis[]).map((axis) => (
                    <button
                      key={axis}
                      type="button"
                      onClick={() => {
                        setUpAxis(axis);
                        setViewKey((key) => key + 1);
                      }}
                      className={`rounded-lg px-4 py-2 font-mono text-xs font-bold transition-colors ${
                        upAxis === axis
                          ? "bg-[#ff6b35] text-black"
                          : "bg-white/5 text-slate-400 hover:text-white"
                      }`}
                      aria-pressed={upAxis === axis}
                    >
                      {axis.toUpperCase()}-up
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <aside aria-label="STL file details" className="space-y-5">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-5">
                <div className="mb-5 flex items-center gap-3">
                  <FileBox className="h-5 w-5 text-[#ff6b35]" aria-hidden="true" />
                  <h2 className="text-lg font-bold text-white">File details</h2>
                </div>
                <dl className="space-y-3">
                  <StatCard label="Format" value={`${model.format} STL`} note="Detected from the file structure" />
                  <StatCard label="File size" value={formatFileSize(model.sizeBytes)} />
                  <StatCard label="Triangles" value={model.triangleCount.toLocaleString()} note={`${model.vertexCount.toLocaleString()} vertices`} />
                  <StatCard
                    label="Bounding box X × Y × Z"
                    value={dimensionText}
                    note="Raw STL coordinates (no unit stored)"
                  />
                  <StatCard
                    label="Volume estimate"
                    value={`${model.volumeCm3.toFixed(2)} cm³`}
                    note="Only reliable for a closed mesh"
                  />
                </dl>
              </div>

              <div className="rounded-[2rem] border border-[#ff6b35]/25 bg-[#ff6b35]/[0.06] p-5">
                <h2 className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[#ff6b35]">
                  How I read these numbers
                </h2>
                <p className="text-sm leading-relaxed text-slate-400">
                  STL stores coordinates but no unit. If your slicer treats the
                  file as millimetres, read the X × Y × Z values above as
                  millimetres too. I compare the largest dimension with the
                  sculptor’s stated height before I scale anything.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  Most slicers use Z-up, so that is the default preview. Switch
                  to Y-up if the model was exported for a Y-up toolchain.
                </p>
              </div>
            </aside>
          </div>
        )}

        <div aria-live="polite" className="min-h-6">
          {loading && (
            <p className="mt-6 rounded-xl border border-[#ff6b35]/30 bg-[#ff6b35]/10 p-4 text-sm text-[#ff6b35]">
              Reading triangles and measuring the bounding box…
            </p>
          )}
          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
