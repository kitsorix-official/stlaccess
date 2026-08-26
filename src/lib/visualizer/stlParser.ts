import * as THREE from 'three';
import type { CustomStlData } from './useScalerStore';

export function parseStlBuffer(buffer: ArrayBuffer, fileName: string): CustomStlData {
  let geometry: THREE.BufferGeometry;

  const isBinary = isBufferBinary(buffer);
  if (isBinary) {
    geometry = parseBinaryStl(buffer);
  } else {
    const reader = new TextDecoder('utf-8');
    const text = reader.decode(buffer);
    geometry = parseAsciiStl(text);
  }

  // Compute bounding box and dimensions
  geometry.computeBoundingBox();
  geometry.computeVertexNormals();

  const bbox = geometry.boundingBox || new THREE.Box3();
  const size = new THREE.Vector3();
  bbox.getSize(size);

  const center = new THREE.Vector3();
  bbox.getCenter(center);

  // Re-anchor geometry so:
  // 1. Center in X and Z is 0
  // 2. Minimum Y is 0 (bottom rests perfectly on ground grid Y=0)
  geometry.translate(-center.x, -bbox.min.y, -center.z);
  geometry.computeBoundingBox();

  const finalBbox = geometry.boundingBox!;
  const finalSize = new THREE.Vector3();
  finalBbox.getSize(finalSize);

  const originalHeightMm = Math.max(0.1, finalSize.y);
  const width = finalSize.x;
  const depth = finalSize.z;
  const height = finalSize.y;

  // Calculate volume in cm3 (1cm3 = 1000mm3)
  const volumeMm3 = calculateMeshVolume(geometry);
  const volumeCm3 = Math.max(0.001, volumeMm3 / 1000);

  const posAttr = geometry.getAttribute('position');
  const vertexCount = posAttr ? posAttr.count : 0;
  const triangleCount = Math.floor(vertexCount / 3);

  return {
    name: fileName,
    geometry,
    vertexCount,
    triangleCount,
    bounds: {
      width,
      depth,
      height,
      volumeCm3,
    },
    originalHeightMm,
  };
}

function isBufferBinary(buffer: ArrayBuffer): boolean {
  const reader = new DataView(buffer);
  const size = buffer.byteLength;
  if (size < 84) return false;

  const numFaces = reader.getUint32(80, true);
  const expectedSize = 80 + 4 + numFaces * 50;

  // If file matches binary formula exactly, it is binary
  if (Math.abs(expectedSize - size) < 4) {
    return true;
  }

  // Check for non-ASCII characters in header
  const header = new Uint8Array(buffer, 0, Math.min(80, size));
  for (let i = 0; i < header.length; i++) {
    if (header[i] > 127) return true;
  }

  // Check if starts with "solid"
  const decoder = new TextDecoder('utf-8');
  const startStr = decoder.decode(new Uint8Array(buffer, 0, Math.min(6, size))).toLowerCase();
  return !startStr.startsWith('solid');
}

function parseBinaryStl(buffer: ArrayBuffer): THREE.BufferGeometry {
  const reader = new DataView(buffer);
  const faces = reader.getUint32(80, true);

  const positions = new Float32Array(faces * 3 * 3);
  const normals = new Float32Array(faces * 3 * 3);

  let offset = 84;
  let posIdx = 0;
  let normIdx = 0;

  for (let face = 0; face < faces; face++) {
    if (offset + 50 > buffer.byteLength) break;

    const nx = reader.getFloat32(offset, true);
    const ny = reader.getFloat32(offset + 4, true);
    const nz = reader.getFloat32(offset + 8, true);
    offset += 12;

    for (let v = 0; v < 3; v++) {
      const vx = reader.getFloat32(offset, true);
      const vy = reader.getFloat32(offset + 4, true);
      const vz = reader.getFloat32(offset + 8, true);
      offset += 12;

      positions[posIdx++] = vx;
      positions[posIdx++] = vy;
      positions[posIdx++] = vz;

      normals[normIdx++] = nx;
      normals[normIdx++] = ny;
      normals[normIdx++] = nz;
    }

    offset += 2; // skip 2-byte attribute
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  return geometry;
}

function parseAsciiStl(text: string): THREE.BufferGeometry {
  const normalPattern = /facet\s+normal\s+([-\d.eE+]+)\s+([-\d.eE+]+)\s+([-\d.eE+]+)/g;
  const vertexPattern = /vertex\s+([-\d.eE+]+)\s+([-\d.eE+]+)\s+([-\d.eE+]+)/g;

  const positions: number[] = [];
  const normals: number[] = [];

  let normalMatch: RegExpExecArray | null;
  let vertexMatch: RegExpExecArray | null;

  while ((normalMatch = normalPattern.exec(text)) !== null) {
    const nx = parseFloat(normalMatch[1]);
    const ny = parseFloat(normalMatch[2]);
    const nz = parseFloat(normalMatch[3]);

    for (let i = 0; i < 3; i++) {
      vertexMatch = vertexPattern.exec(text);
      if (vertexMatch) {
        positions.push(parseFloat(vertexMatch[1]), parseFloat(vertexMatch[2]), parseFloat(vertexMatch[3]));
        normals.push(nx, ny, nz);
      }
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  return geometry;
}

function calculateMeshVolume(geometry: THREE.BufferGeometry): number {
  const pos = geometry.getAttribute('position');
  if (!pos) return 0;

  let totalVolume = 0;
  const p1 = new THREE.Vector3();
  const p2 = new THREE.Vector3();
  const p3 = new THREE.Vector3();

  for (let i = 0; i < pos.count; i += 3) {
    p1.fromBufferAttribute(pos, i);
    p2.fromBufferAttribute(pos, i + 1);
    p3.fromBufferAttribute(pos, i + 2);

    // Signed tetrahedron volume = p1 . (p2 x p3) / 6
    const v = p1.dot(p2.clone().cross(p3)) / 6.0;
    totalVolume += v;
  }

  return Math.abs(totalVolume);
}
