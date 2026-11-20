// Browser-only STL parser for the dedicated STL viewer page.
//
// STL has two representations: a compact fixed-record binary layout and a
// human-readable ASCII facet list. Both are parsed here into a Three.js
// BufferGeometry. Nothing leaves the browser — there is no fetch, no worker
// endpoint and no analytics payload.

import * as THREE from "three";

export type StlFormat = "ASCII" | "Binary";

export interface StlBounds {
  x: number;
  y: number;
  z: number;
}

export interface StlModelData {
  name: string;
  format: StlFormat;
  sizeBytes: number;
  triangleCount: number;
  vertexCount: number;
  bounds: StlBounds;
  volumeCm3: number;
  geometry: THREE.BufferGeometry;
  hasNormals: boolean;
}

const BINARY_HEADER_BYTES = 80;
const BINARY_COUNT_BYTES = 4;
const BINARY_TRIANGLE_BYTES = 50;
const BINARY_START = BINARY_HEADER_BYTES + BINARY_COUNT_BYTES;

function detectFormat(buffer: ArrayBuffer): StlFormat {
  if (buffer.byteLength < BINARY_START) return "ASCII";

  const view = new DataView(buffer);
  const reportedTriangles = view.getUint32(BINARY_HEADER_BYTES, true);
  const expectedSize = BINARY_START + reportedTriangles * BINARY_TRIANGLE_BYTES;

  // A valid binary STL has an exact byte-length relationship. A few exporters
  // add trailing padding, so a small overshoot is still treated as binary.
  if (
    reportedTriangles > 0 &&
    expectedSize <= buffer.byteLength &&
    buffer.byteLength - expectedSize <= 2
  ) {
    return "Binary";
  }

  const prefix = new TextDecoder("utf-8")
    .decode(new Uint8Array(buffer, 0, Math.min(5, buffer.byteLength)))
    .toLowerCase();

  // ASCII STLs normally start with `solid`; binary files may also have that
  // word in their header, so the byte-length check above takes precedence.
  return prefix === "solid" ? "ASCII" : "Binary";
}

function parseBinary(buffer: ArrayBuffer) {
  const view = new DataView(buffer);
  const triangleCount = view.getUint32(BINARY_HEADER_BYTES, true);
  const maxTriangles = Math.floor((buffer.byteLength - BINARY_START) / BINARY_TRIANGLE_BYTES);

  if (triangleCount === 0) {
    throw new Error("This binary STL reports no triangles.");
  }
  if (triangleCount > maxTriangles) {
    throw new Error(
      `This binary STL says it has ${triangleCount} triangles, but the file only contains room for ${maxTriangles}.`,
    );
  }

  const positions = new Array<number>(triangleCount * 9);
  const normals = new Array<number>(triangleCount * 9);
  let offset = BINARY_START;

  for (let triangle = 0; triangle < triangleCount; triangle += 1) {
    if (offset + BINARY_TRIANGLE_BYTES > buffer.byteLength) break;

    const nx = view.getFloat32(offset, true);
    const ny = view.getFloat32(offset + 4, true);
    const nz = view.getFloat32(offset + 8, true);
    offset += 12;

    for (let vertex = 0; vertex < 3; vertex += 1) {
      const index = triangle * 9 + vertex * 3;
      positions[index] = view.getFloat32(offset, true);
      positions[index + 1] = view.getFloat32(offset + 4, true);
      positions[index + 2] = view.getFloat32(offset + 8, true);
      normals[index] = nx;
      normals[index + 1] = ny;
      normals[index + 2] = nz;
      offset += 12;
    }

    offset += 2; // attribute byte count
  }

  return { positions, normals };
}

function numberList(values: RegExpMatchArray | string[]): number[] | null {
  const numbers = values.slice(1, 4).map((value) => Number(value));
  return numbers.every(Number.isFinite) ? numbers : null;
}

function parseAscii(buffer: ArrayBuffer) {
  const text = new TextDecoder("utf-8", { fatal: false }).decode(buffer);
  const positions: number[] = [];
  const normals: number[] = [];

  const facetPattern = /facet\s+normal\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)([\s\S]*?)endfacet/gi;
  let facetMatch: RegExpExecArray | null;

  while ((facetMatch = facetPattern.exec(text)) !== null) {
    const normal = numberList(facetMatch);
    const vertexPattern = /vertex\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)/gi;
    const vertices = [...facetMatch[4].matchAll(vertexPattern)].slice(0, 3);
    if (!normal || vertices.length !== 3) continue;

    for (const vertex of vertices) {
      const point = numberList(vertex);
      if (!point) continue;
      positions.push(point[0], point[1], point[2]);
      normals.push(normal[0], normal[1], normal[2]);
    }
  }

  // Some CAD exporters omit `facet normal` blocks. Fall back to raw vertices
  // and let Three.js compute the normals from the triangle winding.
  if (positions.length === 0) {
    const vertexPattern = /vertex\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)/gi;
    for (const vertex of text.matchAll(vertexPattern)) {
      const point = numberList(vertex);
      if (point) positions.push(point[0], point[1], point[2]);
    }
  }

  return { positions, normals };
}

// Absolute signed tetrahedron volume. Meaningful for closed meshes; the UI
// labels it as an estimate because an STL does not record watertightness.
function meshVolumeCm3(positions: number[]): number {
  let sixVolume = 0;

  for (let i = 0; i < positions.length; i += 9) {
    const ax = positions[i];
    const ay = positions[i + 1];
    const az = positions[i + 2];
    const bx = positions[i + 3];
    const by = positions[i + 4];
    const bz = positions[i + 5];
    const cx = positions[i + 6];
    const cy = positions[i + 7];
    const cz = positions[i + 8];

    sixVolume +=
      ax * (by * cz - bz * cy) -
      ay * (bx * cz - bz * cx) +
      az * (bx * cy - by * cx);
  }

  return Math.abs(sixVolume / 6) / 1000;
}

export function parseStlForViewer(buffer: ArrayBuffer, fileName: string): StlModelData {
  const format = detectFormat(buffer);
  const { positions, normals } = format === "Binary" ? parseBinary(buffer) : parseAscii(buffer);

  if (positions.length < 9 || positions.length % 9 !== 0) {
    throw new Error(
      format === "ASCII"
        ? "I could not find any complete triangles in that ASCII STL."
        : "I could not read any complete triangles from that binary STL.",
    );
  }

  if (!positions.every(Number.isFinite)) {
    throw new Error("That STL contains invalid coordinates.");
  }

  const volumeCm3 = meshVolumeCm3(positions);
  const hasNormals = normals.length === positions.length && normals.every(Number.isFinite);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  if (hasNormals) {
    geometry.setAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
  } else {
    geometry.computeVertexNormals();
  }

  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  // Center the geometry for orbiting. The reported bounds above are the raw
  // STL coordinates, so the numbers still match what a slicer shows.
  geometry.translate(-center.x, -center.y, -center.z);
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();

  return {
    name: fileName,
    format,
    sizeBytes: buffer.byteLength,
    triangleCount: positions.length / 9,
    vertexCount: positions.length / 3,
    bounds: { x: size.x, y: size.y, z: size.z },
    volumeCm3,
    geometry,
    hasNormals,
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function formatMillimetres(value: number): string {
  if (value >= 1000) return value.toFixed(0);
  if (value >= 100) return value.toFixed(1);
  return value.toFixed(2);
}
