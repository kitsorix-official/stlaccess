/**
 * STLACCESS client-side STL engine.
 *
 * Everything here runs in the visitor's browser. There is no fetch, no XHR,
 * no upload endpoint, no worker bootstrap from a remote origin. Files are read
 * from disk with FileReader / drag-and-drop and parsed in memory.
 *
 * Exposed as window.STLTools for the plain <script> tags on the tool pages.
 */
(function (root) {
  "use strict";

  var DEFAULT_TOLERANCE = 0.001; // 1 micron, in model units (assumed mm)

  function formatBytes(bytes) {
    if (!isFinite(bytes) || bytes <= 0) return "0 B";
    var units = ["B", "KB", "MB", "GB", "TB"];
    var i = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
    var value = bytes / Math.pow(1024, i);
    var digits = i === 0 ? 0 : value >= 100 ? 0 : value >= 10 ? 1 : 2;
    return value.toFixed(digits) + " " + units[i];
  }

  function formatNumber(value) {
    if (!isFinite(value)) return "0";
    return new Intl.NumberFormat("en-US").format(Math.round(value));
  }

  function formatMm(value) {
    if (!isFinite(value)) return "-";
    var abs = Math.abs(value);
    var digits = abs >= 100 ? 1 : abs >= 10 ? 2 : 3;
    return Number(value.toFixed(digits)).toString();
  }

  function formatFloat(value) {
    if (!isFinite(value)) return "0";
    return Number(value.toFixed(6)).toString();
  }

  function baseName(name) {
    return String(name || "model").replace(/\.(stl|obj|ply)$/i, "").replace(/[^a-z0-9._-]+/gi, "_") || "model";
  }

  function toArrayBuffer(input) {
    if (input instanceof ArrayBuffer) return input;
    if (ArrayBuffer.isView(input)) {
      return input.buffer.slice(input.byteOffset, input.byteOffset + input.byteLength);
    }
    throw new Error("Expected an ArrayBuffer or typed array.");
  }

  function headText(buffer) {
    var length = Math.min(buffer.byteLength, 4096);
    try {
      return new TextDecoder("utf-8").decode(new Uint8Array(buffer, 0, length));
    } catch (err) {
      return "";
    }
  }

  function detectFormat(buffer) {
    var length = buffer.byteLength;
    var head = headText(buffer);
    var looksAscii = /^\s*solid\b/i.test(head) && /facet\s+normal/i.test(head) && /\bvertex\b/i.test(head);

    if (length >= 84) {
      var count = new DataView(buffer).getUint32(80, true);
      var expected = 84 + count * 50;
      var exact = count > 0 && expected === length;
      var plausible = count > 0 && expected <= length && length - expected < 1024;
      if (exact || (plausible && !looksAscii)) return "binary";
    }

    if (looksAscii) return "ascii";
    if (/\bvertex\b/i.test(head)) return "ascii";

    // Last resort: if the binary header is coherent, trust it.
    if (length >= 84) {
      var fallbackCount = new DataView(buffer).getUint32(80, true);
      if (fallbackCount > 0 && 84 + fallbackCount * 50 <= length) return "binary";
    }

    throw new Error("This does not look like an STL file. Expected binary or ASCII STL.");
  }

  function parseBinary(buffer) {
    var view = new DataView(buffer);
    var count = view.getUint32(80, true);
    if (!count) throw new Error("The STL header reports zero triangles.");
    if (84 + count * 50 > buffer.byteLength) {
      throw new Error("The binary STL is truncated: the header promises more triangles than the file contains.");
    }

    var positions = new Float32Array(count * 9);
    var offset = 84;
    for (var i = 0; i < count; i++) {
      offset += 12; // stored facet normal - recomputed later for flat shading
      var target = i * 9;
      for (var j = 0; j < 9; j++) {
        positions[target + j] = view.getFloat32(offset, true);
        offset += 4;
      }
      offset += 2; // attribute byte count
    }

    return buildMesh(positions, count, "binary", buffer.byteLength);
  }

  function parseAscii(buffer) {
    var text = new TextDecoder("utf-8").decode(new Uint8Array(buffer));
    var vertexMatches = text.match(/\bvertex\b/gi);
    var vertexCount = vertexMatches ? vertexMatches.length : 0;
    if (!vertexCount) throw new Error("No vertex records found. The ASCII STL may be malformed.");

    var triangleCount = Math.floor(vertexCount / 3);
    var positions = new Float32Array(triangleCount * 9);
    var number = "([-+]?(?:\\d+\\.?\\d*|\\.\\d+)(?:[eE][-+]?\\d+)?)";
    var pattern = new RegExp("vertex\\s+" + number + "\\s+" + number + "\\s+" + number, "gi");
    var match;
    var cursor = 0;
    while ((match = pattern.exec(text)) && cursor < positions.length) {
      positions[cursor++] = parseFloat(match[1]);
      positions[cursor++] = parseFloat(match[2]);
      positions[cursor++] = parseFloat(match[3]);
    }

    triangleCount = Math.floor(cursor / 9);
    if (!triangleCount) throw new Error("No complete triangles found in this ASCII STL.");
    positions = positions.subarray(0, triangleCount * 9);

    return buildMesh(positions, triangleCount, "ascii", buffer.byteLength);
  }

  function computeBounds(positions) {
    var minX = Infinity, minY = Infinity, minZ = Infinity;
    var maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    for (var i = 0; i < positions.length; i += 3) {
      var x = positions[i], y = positions[i + 1], z = positions[i + 2];
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (z < minZ) minZ = z;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      if (z > maxZ) maxZ = z;
    }

    if (!isFinite(minX)) {
      minX = minY = minZ = maxX = maxY = maxZ = 0;
    }

    return {
      min: [minX, minY, minZ],
      max: [maxX, maxY, maxZ],
      size: [maxX - minX, maxY - minY, maxZ - minZ],
      center: [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2]
    };
  }

  function buildMesh(positions, triangleCount, format, byteLength, name) {
    return {
      positions: positions,
      triangleCount: triangleCount,
      vertexCount: triangleCount * 3,
      format: format,
      byteLength: byteLength,
      bounds: computeBounds(positions),
      name: name || "",
      source: name || ""
    };
  }

  function parseSTL(input, options) {
    var buffer = toArrayBuffer(input);
    var format = detectFormat(buffer);
    var mesh = format === "binary" ? parseBinary(buffer) : parseAscii(buffer);
    mesh.name = (options && options.name) || "";
    mesh.source = mesh.name;
    return mesh;
  }

  /** Per-face flat normals. Degenerate faces get a safe fallback. */
  function computeNormals(positions, triangleCount) {
    var normals = new Float32Array(triangleCount * 9);
    for (var t = 0; t < triangleCount; t++) {
      var o = t * 9;
      var ax = positions[o], ay = positions[o + 1], az = positions[o + 2];
      var bx = positions[o + 3], by = positions[o + 4], bz = positions[o + 5];
      var cx = positions[o + 6], cy = positions[o + 7], cz = positions[o + 8];

      var ux = bx - ax, uy = by - ay, uz = bz - az;
      var vx = cx - ax, vy = cy - ay, vz = cz - az;
      var nx = uy * vz - uz * vy;
      var ny = uz * vx - ux * vz;
      var nz = ux * vy - uy * vx;
      var len = Math.sqrt(nx * nx + ny * ny + nz * nz);
      if (len > 1e-12) {
        nx /= len; ny /= len; nz /= len;
      } else {
        nx = 0; ny = 0; nz = 1;
      }

      for (var k = 0; k < 3; k++) {
        var n = o + k * 3;
        normals[n] = nx;
        normals[n + 1] = ny;
        normals[n + 2] = nz;
      }
    }
    return normals;
  }

  /** Merge vertices that land in the same tolerance bucket. */
  function weldVertices(positions, tolerance) {
    var tol = tolerance > 0 ? tolerance : 0.0001;
    var inv = 1 / tol;
    var map = new Map();
    var unique = [];
    var indices = new Uint32Array(positions.length / 3);

    for (var i = 0, v = 0; i < positions.length; i += 3, v++) {
      var x = positions[i], y = positions[i + 1], z = positions[i + 2];
      var key = Math.round(x * inv) + "," + Math.round(y * inv) + "," + Math.round(z * inv);
      var id = map.get(key);
      if (id === undefined) {
        id = unique.length / 3;
        map.set(key, id);
        unique.push(x, y, z);
      }
      indices[v] = id;
    }

    return { vertices: new Float32Array(unique), indices: indices };
  }

  function chunkWriter() {
    var chunks = [];
    var lines = [];

    return {
      line: function (line) {
        lines.push(line);
        if (lines.length >= 20000) {
          chunks.push(lines.join("\n") + "\n");
          lines = [];
        }
      },
      finish: function () {
        if (lines.length) chunks.push(lines.join("\n") + "\n");
        lines = [];
        return chunks;
      }
    };
  }

  function toOBJ(mesh, options) {
    var welded = weldVertices(mesh.positions, (options && options.tolerance) || 0.0001);
    var vertices = welded.vertices;
    var indices = welded.indices;
    var writer = chunkWriter();

    writer.line("# Converted by STLACCESS - processed entirely in the browser.");
    writer.line("# Triangles: " + mesh.triangleCount + " | Vertices: " + (vertices.length / 3));
    writer.line("o " + baseName(mesh.name || "model"));

    for (var v = 0; v < vertices.length; v += 3) {
      writer.line("v " + formatFloat(vertices[v]) + " " + formatFloat(vertices[v + 1]) + " " + formatFloat(vertices[v + 2]));
    }

    for (var i = 0; i < indices.length; i += 3) {
      writer.line("f " + (indices[i] + 1) + " " + (indices[i + 1] + 1) + " " + (indices[i + 2] + 1));
    }

    return {
      blob: new Blob(writer.finish(), { type: "text/plain;charset=utf-8" }),
      extension: "obj",
      label: "OBJ",
      mime: "text/plain;charset=utf-8",
      vertices: vertices.length / 3,
      triangles: mesh.triangleCount
    };
  }

  function toPLY(mesh, options) {
    var welded = weldVertices(mesh.positions, (options && options.tolerance) || 0.0001);
    var vertices = welded.vertices;
    var indices = welded.indices;
    var writer = chunkWriter();

    writer.line("ply");
    writer.line("format ascii 1.0");
    writer.line("comment Converted by STLACCESS - processed entirely in the browser");
    writer.line("element vertex " + (vertices.length / 3));
    writer.line("property float x");
    writer.line("property float y");
    writer.line("property float z");
    writer.line("element face " + mesh.triangleCount);
    writer.line("property list uchar int vertex_indices");
    writer.line("end_header");

    for (var v = 0; v < vertices.length; v += 3) {
      writer.line(formatFloat(vertices[v]) + " " + formatFloat(vertices[v + 1]) + " " + formatFloat(vertices[v + 2]));
    }

    for (var i = 0; i < indices.length; i += 3) {
      writer.line("3 " + indices[i] + " " + indices[i + 1] + " " + indices[i + 2]);
    }

    return {
      blob: new Blob(writer.finish(), { type: "text/plain;charset=utf-8" }),
      extension: "ply",
      label: "PLY",
      mime: "text/plain;charset=utf-8",
      vertices: vertices.length / 3,
      triangles: mesh.triangleCount
    };
  }

  function toBinarySTL(mesh) {
    var normals = computeNormals(mesh.positions, mesh.triangleCount);
    var buffer = new ArrayBuffer(84 + mesh.triangleCount * 50);
    var view = new DataView(buffer);
    var header = "Binary STL exported by STLACCESS - client-side conversion";
    for (var h = 0; h < Math.min(header.length, 79); h++) {
      view.setUint8(h, header.charCodeAt(h));
    }
    view.setUint32(80, mesh.triangleCount, true);

    var offset = 84;
    for (var t = 0; t < mesh.triangleCount; t++) {
      var o = t * 9;
      view.setFloat32(offset, normals[o], true);
      view.setFloat32(offset + 4, normals[o + 1], true);
      view.setFloat32(offset + 8, normals[o + 2], true);
      offset += 12;

      for (var j = 0; j < 9; j++) {
        view.setFloat32(offset, mesh.positions[o + j], true);
        offset += 4;
      }
      view.setUint16(offset, 0, true);
      offset += 2;
    }

    return {
      blob: new Blob([buffer], { type: "model/stl" }),
      extension: "stl",
      label: "Binary STL",
      mime: "model/stl",
      vertices: mesh.vertexCount,
      triangles: mesh.triangleCount
    };
  }

  function toAsciiSTL(mesh) {
    var normals = computeNormals(mesh.positions, mesh.triangleCount);
    var name = baseName(mesh.name || "model");
    var writer = chunkWriter();

    writer.line("solid " + name);
    for (var t = 0; t < mesh.triangleCount; t++) {
      var o = t * 9;
      writer.line("  facet normal " + formatFloat(normals[o]) + " " + formatFloat(normals[o + 1]) + " " + formatFloat(normals[o + 2]));
      writer.line("    outer loop");
      for (var k = 0; k < 3; k++) {
        var v = o + k * 3;
        writer.line("      vertex " + formatFloat(mesh.positions[v]) + " " + formatFloat(mesh.positions[v + 1]) + " " + formatFloat(mesh.positions[v + 2]));
      }
      writer.line("    endloop");
      writer.line("  endfacet");
    }
    writer.line("endsolid " + name);

    return {
      blob: new Blob(writer.finish(), { type: "model/stl" }),
      extension: "stl",
      label: "ASCII STL",
      mime: "model/stl",
      vertices: mesh.vertexCount,
      triangles: mesh.triangleCount
    };
  }

  function convert(mesh, format, options) {
    var output;
    if (format === "obj") output = toOBJ(mesh, options);
    else if (format === "ply") output = toPLY(mesh, options);
    else if (format === "stl-binary") output = toBinarySTL(mesh);
    else if (format === "stl-ascii") output = toAsciiSTL(mesh);
    else throw new Error("Unknown output format: " + format);

    output.filename = baseName(mesh.name || "model") + "-converted." + output.extension;
    return output;
  }

  /**
   * A 20 mm demo cube, generated locally. Passing true omits the top face so
   * the printability checker has a deliberately broken mesh to demonstrate.
   */
  function demoCubeBuffer(size, omitTop) {
    var edge = size || 20;
    var h = edge / 2;
    var vertices = [
      [-h, -h, 0], [h, -h, 0], [h, h, 0], [-h, h, 0],
      [-h, -h, edge], [h, -h, edge], [h, h, edge], [-h, h, edge]
    ];
    var faces = [
      [0, 2, 1], [0, 3, 2],
      [4, 5, 6], [4, 6, 7],
      [0, 1, 5], [0, 5, 4],
      [1, 2, 6], [1, 6, 5],
      [2, 3, 7], [2, 7, 6],
      [3, 0, 4], [3, 4, 7]
    ];
    if (omitTop) faces = faces.slice(2);

    var text = "solid demo-cube\n";
    for (var f = 0; f < faces.length; f++) {
      text += "  facet normal 0 0 0\n    outer loop\n";
      for (var k = 0; k < 3; k++) {
        var point = vertices[faces[f][k]];
        text += "      vertex " + point[0] + " " + point[1] + " " + point[2] + "\n";
      }
      text += "    endloop\n  endfacet\n";
    }
    text += "endsolid demo-cube\n";
    return new TextEncoder().encode(text).buffer;
  }

  function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(function () { URL.revokeObjectURL(url); }, 10000);
  }

  function analyzeMesh(mesh, tolerance) {
    var tol = tolerance > 0 ? tolerance : DEFAULT_TOLERANCE;
    var positions = mesh.positions;
    var triangleCount = mesh.triangleCount;
    var inv = 1 / tol;
    var map = new Map();
    var unique = [];
    var indices = new Uint32Array(triangleCount * 3);

    function vertexId(x, y, z) {
      var key = Math.round(x * inv) + "," + Math.round(y * inv) + "," + Math.round(z * inv);
      var id = map.get(key);
      if (id === undefined) {
        id = unique.length / 3;
        map.set(key, id);
        unique.push(x, y, z);
      }
      return id;
    }

    var degenerate = 0;
    for (var t = 0; t < triangleCount; t++) {
      var o = t * 9;
      var a = vertexId(positions[o], positions[o + 1], positions[o + 2]);
      var b = vertexId(positions[o + 3], positions[o + 4], positions[o + 5]);
      var c = vertexId(positions[o + 6], positions[o + 7], positions[o + 8]);
      indices[t * 3] = a;
      indices[t * 3 + 1] = b;
      indices[t * 3 + 2] = c;
      if (a === b || b === c || a === c) degenerate++;
    }

    var edges = new Map();
    function addEdge(a, b) {
      var lo = a < b ? a : b;
      var hi = a < b ? b : a;
      var key = lo + ":" + hi;
      var edge = edges.get(key);
      if (!edge) {
        edge = { count: 0, balance: 0 };
        edges.set(key, edge);
      }
      edge.count++;
      edge.balance += a === lo ? 1 : -1;
    }

    for (var i = 0; i < indices.length; i += 3) {
      var ia = indices[i], ib = indices[i + 1], ic = indices[i + 2];
      if (ia === ib || ib === ic || ia === ic) continue;
      addEdge(ia, ib);
      addEdge(ib, ic);
      addEdge(ic, ia);
    }

    var openEdges = 0;
    var nonManifoldEdges = 0;
    var inconsistentEdges = 0;
    edges.forEach(function (edge) {
      if (edge.count === 1) openEdges++;
      else if (edge.count > 2) nonManifoldEdges++;
      else if (edge.balance !== 0) inconsistentEdges++;
    });

    // Connected shells (union-find over the welded vertices).
    var vertexTotal = unique.length / 3;
    var parent = new Uint32Array(vertexTotal);
    for (var p = 0; p < vertexTotal; p++) parent[p] = p;

    function find(x) {
      while (parent[x] !== x) {
        parent[x] = parent[parent[x]];
        x = parent[x];
      }
      return x;
    }

    function union(a, b) {
      var ra = find(a), rb = find(b);
      if (ra !== rb) parent[rb] = ra;
    }

    for (var u = 0; u < indices.length; u += 3) {
      union(indices[u], indices[u + 1]);
      union(indices[u + 1], indices[u + 2]);
    }

    var roots = new Set();
    for (var r = 0; r < indices.length; r++) roots.add(find(indices[r]));

    var volume = 0;
    var area = 0;
    for (var f = 0; f < triangleCount; f++) {
      var q = f * 9;
      var ax = positions[q], ay = positions[q + 1], az = positions[q + 2];
      var bx = positions[q + 3], by = positions[q + 4], bz = positions[q + 5];
      var cx = positions[q + 6], cy = positions[q + 7], cz = positions[q + 8];

      var ux = bx - ax, uy = by - ay, uz = bz - az;
      var vx = cx - ax, vy = cy - ay, vz = cz - az;
      var nx = uy * vz - uz * vy;
      var ny = uz * vx - ux * vz;
      var nz = ux * vy - uy * vx;
      area += 0.5 * Math.sqrt(nx * nx + ny * ny + nz * nz);
      volume += (ax * (by * cz - bz * cy) + ay * (bz * cx - bx * cz) + az * (bx * cy - by * cx)) / 6;
    }

    var watertight = openEdges === 0 && nonManifoldEdges === 0 && degenerate === 0;
    return {
      triangleCount: triangleCount,
      uniqueVertices: vertexTotal,
      degenerateTriangles: degenerate,
      openEdges: openEdges,
      nonManifoldEdges: nonManifoldEdges,
      inconsistentEdges: inconsistentEdges,
      shells: roots.size,
      isWatertight: watertight,
      isClosed: openEdges === 0,
      isManifold: nonManifoldEdges === 0,
      volumeCm3: Math.abs(volume) / 1000,
      surfaceAreaCm2: area / 100,
      bounds: mesh.bounds,
      tolerance: tol
    };
  }

  root.STLTools = {
    version: "1.0.0",
    parseSTL: parseSTL,
    detectFormat: detectFormat,
    computeBounds: computeBounds,
    computeNormals: computeNormals,
    weldVertices: weldVertices,
    analyzeMesh: analyzeMesh,
    convert: convert,
    demoCubeBuffer: demoCubeBuffer,
    toOBJ: toOBJ,
    toPLY: toPLY,
    toBinarySTL: toBinarySTL,
    toAsciiSTL: toAsciiSTL,
    downloadBlob: downloadBlob,
    formatBytes: formatBytes,
    formatNumber: formatNumber,
    formatMm: formatMm,
    formatFloat: formatFloat,
    baseName: baseName
  };
})(typeof window !== "undefined" ? window : globalThis);
