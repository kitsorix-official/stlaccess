/**
 * STLACCESS STL Viewer - a dependency-free WebGL 1 renderer.
 *
 * No three.js, no CDN model loader, no network request. The STL is parsed by
 * stl-core.js in this tab and uploaded straight into GPU buffers.
 */
(function () {
  "use strict";

  var stage = document.getElementById("stl-viewer-stage");
  if (!stage || !window.STLTools) return;

  var canvas = document.getElementById("stl-viewer-canvas");
  var empty = document.getElementById("stl-viewer-empty");
  var fileInput = document.getElementById("stl-viewer-file");
  var chooseButton = document.getElementById("stl-viewer-choose");
  var demoButton = document.getElementById("stl-viewer-demo");
  var resetButton = document.getElementById("stl-viewer-reset");
  var wireButton = document.getElementById("stl-viewer-wireframe");
  var loading = document.getElementById("stl-viewer-loading");
  var errorBox = document.getElementById("stl-viewer-error");
  var errorText = document.getElementById("stl-viewer-error-text");
  var stats = document.getElementById("stl-viewer-stats");
  var hint = document.getElementById("stl-viewer-hint");

  var gl = null;
  var program = null;
  var locations = null;
  var positionBuffer = null;
  var normalBuffer = null;
  var lineBuffer = null;
  var lineCount = 0;
  var uint32Indices = false;
  var mesh = null;
  var wireframe = false;
  var renderQueued = false;

  var camera = {
    yaw: -0.65,
    pitch: 0.32,
    distance: 1,
    target: [0, 0, 0],
    radius: 1
  };

  var drag = null;
  var pointers = new Map();

  var VERTEX_SHADER = [
    "attribute vec3 aPosition;",
    "attribute vec3 aNormal;",
    "uniform mat4 uMVP;",
    "uniform vec3 uCameraPos;",
    "varying vec3 vNormal;",
    "varying vec3 vView;",
    "void main() {",
    "  vNormal = aNormal;",
    "  vView = uCameraPos - aPosition;",
    "  gl_Position = uMVP * vec4(aPosition, 1.0);",
    "}"
  ].join("\n");

  var FRAGMENT_SHADER = [
    "precision mediump float;",
    "uniform vec3 uColor;",
    "uniform vec3 uLightDir;",
    "uniform float uMode;",
    "varying vec3 vNormal;",
    "varying vec3 vView;",
    "void main() {",
    "  if (uMode > 0.5) {",
    "    gl_FragColor = vec4(uColor, 1.0);",
    "    return;",
    "  }",
    "  vec3 n = normalize(vNormal);",
    "  vec3 l = normalize(uLightDir);",
    "  vec3 v = normalize(vView);",
    "  float front = max(dot(n, l), 0.0);",
    "  float back = max(dot(-n, l), 0.0);",
    "  float rim = pow(1.0 - max(dot(n, v), 0.0), 3.0) * 0.16;",
    "  vec3 color = uColor * (0.20 + 0.80 * front + 0.32 * back) + vec3(rim);",
    "  gl_FragColor = vec4(color, 1.0);",
    "}"
  ].join("\n");

  function compile(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      var log = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error("WebGL shader error: " + log);
    }
    return shader;
  }

  function initGL() {
    if (gl) return true;
    gl = canvas.getContext("webgl", {
      antialias: true,
      alpha: false,
      depth: true,
      preserveDrawingBuffer: false
    }) || canvas.getContext("experimental-webgl");

    if (!gl) {
      showError("WebGL is not available in this browser, so the 3D preview cannot start. The file was still parsed locally - the dimensions and triangle count below are accurate.");
      return false;
    }

    try {
      var vertex = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
      var fragment = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      program = gl.createProgram();
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error("WebGL link error: " + gl.getProgramInfoLog(program));
      }
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);

      locations = {
        position: gl.getAttribLocation(program, "aPosition"),
        normal: gl.getAttribLocation(program, "aNormal"),
        mvp: gl.getUniformLocation(program, "uMVP"),
        camera: gl.getUniformLocation(program, "uCameraPos"),
        color: gl.getUniformLocation(program, "uColor"),
        light: gl.getUniformLocation(program, "uLightDir"),
        mode: gl.getUniformLocation(program, "uMode")
      };
      uint32Indices = Boolean(gl.getExtension("OES_element_index_uint"));
      if (!uint32Indices && wireButton) {
        wireButton.disabled = true;
        wireButton.title = "Wireframe needs 32-bit index support, which this browser does not expose.";
      }
      return true;
    } catch (err) {
      showError(err.message);
      return false;
    }
  }

  function normalize(v) {
    var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    if (length < 1e-12) return [0, 0, 0];
    return [v[0] / length, v[1] / length, v[2] / length];
  }

  function cross(a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]
    ];
  }

  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }

  function perspective(fovy, aspect, near, far) {
    var f = 1 / Math.tan(fovy / 2);
    var out = new Float32Array(16);
    out[0] = f / aspect;
    out[5] = f;
    out[10] = (far + near) / (near - far);
    out[11] = -1;
    out[14] = (2 * far * near) / (near - far);
    return out;
  }

  function lookAt(eye, center, up) {
    var z = normalize([eye[0] - center[0], eye[1] - center[1], eye[2] - center[2]]);
    var x = normalize(cross(up, z));
    var y = cross(z, x);
    return new Float32Array([
      x[0], y[0], z[0], 0,
      x[1], y[1], z[1], 0,
      x[2], y[2], z[2], 0,
      -dot(x, eye), -dot(y, eye), -dot(z, eye), 1
    ]);
  }

  function multiply(a, b) {
    var out = new Float32Array(16);
    for (var column = 0; column < 4; column++) {
      for (var row = 0; row < 4; row++) {
        out[column * 4 + row] =
          a[row] * b[column * 4] +
          a[4 + row] * b[column * 4 + 1] +
          a[8 + row] * b[column * 4 + 2] +
          a[12 + row] * b[column * 4 + 3];
      }
    }
    return out;
  }

  function eyePosition() {
    var cp = Math.cos(camera.pitch);
    var sp = Math.sin(camera.pitch);
    return [
      camera.target[0] + camera.distance * cp * Math.sin(camera.yaw),
      camera.target[1] + camera.distance * sp,
      camera.target[2] + camera.distance * cp * Math.cos(camera.yaw)
    ];
  }

  function fitCamera() {
    if (!mesh) return;
    var bounds = mesh.bounds;
    camera.target = bounds.center.slice();
    camera.radius = Math.max(bounds.size[0], bounds.size[1], bounds.size[2]) / 2;
    if (!isFinite(camera.radius) || camera.radius <= 0) camera.radius = 1;
    camera.distance = (camera.radius / Math.sin(Math.PI / 8)) * 1.28;
    camera.yaw = -0.65;
    camera.pitch = 0.32;
  }

  function currentNearFar(eye) {
    var distance = Math.sqrt(
      Math.pow(eye[0] - camera.target[0], 2) +
      Math.pow(eye[1] - camera.target[1], 2) +
      Math.pow(eye[2] - camera.target[2], 2)
    );
    return {
      near: Math.max(distance / 2000, 0.0001),
      far: Math.max(distance + camera.radius * 6, distance * 2, 1)
    };
  }

  function resizeCanvas() {
    var ratio = Math.min(window.devicePixelRatio || 1, 2);
    var width = Math.max(1, Math.round(canvas.clientWidth * ratio));
    var height = Math.max(1, Math.round(canvas.clientHeight * ratio));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function requestRender() {
    if (renderQueued) return;
    renderQueued = true;
    requestAnimationFrame(function () {
      renderQueued = false;
      render();
    });
  }

  function render() {
    if (!gl || !program || !mesh) return;
    resizeCanvas();
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.016, 0.016, 0.022, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.disable(gl.CULL_FACE);

    var eye = eyePosition();
    var limits = currentNearFar(eye);
    var view = lookAt(eye, camera.target, [0, 1, 0]);
    var projection = perspective(Math.PI / 4, canvas.width / canvas.height, limits.near, limits.far);
    var mvp = multiply(projection, view);

    gl.useProgram(program);
    gl.uniformMatrix4fv(locations.mvp, false, mvp);
    gl.uniform3fv(locations.camera, new Float32Array(eye));
    gl.uniform3f(locations.light, 0.42, 0.78, 0.46);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(locations.position);
    gl.vertexAttribPointer(locations.position, 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.enableVertexAttribArray(locations.normal);
    gl.vertexAttribPointer(locations.normal, 3, gl.FLOAT, false, 0, 0);

    if (wireframe && lineBuffer && lineCount) {
      gl.uniform1f(locations.mode, 1);
      gl.uniform3f(locations.color, 0.62, 0.79, 0.92);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineBuffer);
      gl.drawElements(gl.LINES, lineCount, gl.UNSIGNED_INT, 0);
    } else {
      gl.uniform1f(locations.mode, 0);
      gl.uniform3f(locations.color, 1.0, 0.42, 0.21);
      gl.drawArrays(gl.TRIANGLES, 0, mesh.triangleCount * 3);
    }
  }

  function buildLineBuffer() {
    if (!uint32Indices || !gl || lineBuffer) return;
    var values = new Uint32Array(mesh.triangleCount * 6);
    for (var t = 0; t < mesh.triangleCount; t++) {
      var i = t * 3;
      var o = t * 6;
      values[o] = i;
      values[o + 1] = i + 1;
      values[o + 2] = i + 1;
      values[o + 3] = i + 2;
      values[o + 4] = i + 2;
      values[o + 5] = i;
    }
    lineBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, values, gl.STATIC_DRAW);
    lineCount = values.length;
  }

  function uploadMesh() {
    if (!initGL()) return;
    if (positionBuffer) gl.deleteBuffer(positionBuffer);
    if (normalBuffer) gl.deleteBuffer(normalBuffer);
    if (lineBuffer) gl.deleteBuffer(lineBuffer);
    lineBuffer = null;
    lineCount = 0;

    positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, mesh.positions, gl.STATIC_DRAW);

    normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, window.STLTools.computeNormals(mesh.positions, mesh.triangleCount), gl.STATIC_DRAW);
  }

  function setText(id, value) {
    var element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function showStats() {
    if (!mesh) return;
    var size = mesh.bounds.size;
    setText("stl-stat-name", mesh.name || "Untitled STL");
    setText("stl-stat-format", mesh.format === "binary" ? "Binary STL" : "ASCII STL");
    setText("stl-stat-size", window.STLTools.formatBytes(mesh.byteLength));
    setText("stl-stat-triangles", window.STLTools.formatNumber(mesh.triangleCount));
    setText("stl-stat-dimensions", size.map(window.STLTools.formatMm).join(" x ") + " mm");
    if (stats) stats.hidden = false;
    if (hint) hint.hidden = false;
    if (empty) empty.hidden = true;
  }

  function showError(message) {
    if (errorText) errorText.textContent = message;
    if (errorBox) errorBox.hidden = false;
  }

  function clearError() {
    if (errorBox) errorBox.hidden = true;
  }

  function setBusy(busy, label) {
    if (!loading) return;
    var text = loading.querySelector("[data-loading-label]");
    if (label && text) text.textContent = label;
    loading.hidden = !busy;
  }

  function loadBuffer(buffer, name) {
    clearError();
    setBusy(true, "Parsing " + name + " locally...");
    setTimeout(function () {
      try {
        mesh = window.STLTools.parseSTL(buffer, { name: name });
        uploadMesh();
        fitCamera();
        showStats();
        // Draw immediately so the canvas buffer is sized before the first
        // animation frame. rAF can be throttled in background tabs.
        resizeCanvas();
        render();
        requestRender();
        if (resetButton) resetButton.disabled = false;
        if (wireButton) {
          wireButton.disabled = !uint32Indices;
          wireButton.setAttribute("aria-pressed", "false");
          wireframe = false;
        }
      } catch (err) {
        mesh = null;
        showError(err && err.message ? err.message : "Could not read this STL file.");
      } finally {
        setBusy(false);
      }
    }, 30);
  }

  function readFile(file) {
    if (!file) return;
    clearError();
    setBusy(true, "Reading " + file.name + "...");
    var reader = new FileReader();
    reader.onload = function () {
      loadBuffer(reader.result, file.name);
    };
    reader.onerror = function () {
      setBusy(false);
      showError("The browser could not read that file. Try choosing it again.");
    };
    reader.readAsArrayBuffer(file);
  }

  function pan(dx, dy) {
    var worldPerPixel = (2 * camera.distance * Math.tan(Math.PI / 8)) / Math.max(canvas.clientHeight, 1);
    var eye = eyePosition();
    var forward = normalize([
      camera.target[0] - eye[0],
      camera.target[1] - eye[1],
      camera.target[2] - eye[2]
    ]);
    var right = normalize(cross(forward, [0, 1, 0]));
    var up = cross(right, forward);

    camera.target[0] += (-right[0] * dx + up[0] * dy) * worldPerPixel;
    camera.target[1] += (-right[1] * dx + up[1] * dy) * worldPerPixel;
    camera.target[2] += (-right[2] * dx + up[2] * dy) * worldPerPixel;
  }

  function pointerDistance() {
    var list = Array.from(pointers.values());
    if (list.length < 2) return 0;
    return Math.hypot(list[0].x - list[1].x, list[0].y - list[1].y);
  }

  function pointerMidpoint() {
    var list = Array.from(pointers.values());
    if (list.length < 2) return { x: 0, y: 0 };
    return { x: (list[0].x + list[1].x) / 2, y: (list[0].y + list[1].y) / 2 };
  }

  canvas.addEventListener("pointerdown", function (event) {
    if (!mesh) return;
    if (event.pointerType === "mouse" && event.button !== 0 && event.button !== 1 && event.button !== 2) return;
    event.preventDefault();
    try { canvas.setPointerCapture(event.pointerId); } catch (err) { /* ignore */ }
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointers.size === 1) {
      drag = {
        mode: event.button === 1 || event.button === 2 || event.shiftKey ? "pan" : "rotate",
        x: event.clientX,
        y: event.clientY
      };
    } else if (pointers.size === 2) {
      drag = { mode: "pinch", distance: pointerDistance(), midpoint: pointerMidpoint() };
    }
  });

  canvas.addEventListener("pointermove", function (event) {
    if (!mesh || !drag || !pointers.has(event.pointerId)) return;
    event.preventDefault();
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (drag.mode === "pinch" && pointers.size >= 2) {
      var distance = pointerDistance();
      var midpoint = pointerMidpoint();
      if (drag.distance > 0 && distance > 0) {
        camera.distance = Math.max(
          camera.radius * 0.12,
          Math.min(camera.radius * 80, camera.distance * (drag.distance / distance))
        );
      }
      pan(midpoint.x - drag.midpoint.x, midpoint.y - drag.midpoint.y);
      drag.distance = distance;
      drag.midpoint = midpoint;
    } else if (drag.mode === "pan") {
      pan(event.clientX - drag.x, event.clientY - drag.y);
      drag.x = event.clientX;
      drag.y = event.clientY;
    } else {
      camera.yaw -= (event.clientX - drag.x) * 0.008;
      camera.pitch += (event.clientY - drag.y) * 0.008;
      camera.pitch = Math.max(-1.45, Math.min(1.45, camera.pitch));
      drag.x = event.clientX;
      drag.y = event.clientY;
    }
    requestRender();
  });

  function endPointer(event) {
    pointers.delete(event.pointerId);
    if (pointers.size === 0) {
      drag = null;
    } else if (pointers.size === 1) {
      var remaining = Array.from(pointers.values())[0];
      drag = { mode: "rotate", x: remaining.x, y: remaining.y };
    } else if (pointers.size >= 2) {
      drag = { mode: "pinch", distance: pointerDistance(), midpoint: pointerMidpoint() };
    }
  }

  canvas.addEventListener("pointerup", endPointer);
  canvas.addEventListener("pointercancel", endPointer);
  canvas.addEventListener("contextmenu", function (event) { event.preventDefault(); });

  canvas.addEventListener("wheel", function (event) {
    if (!mesh) return;
    event.preventDefault();
    var factor = Math.exp(event.deltaY * 0.0012);
    camera.distance = Math.max(
      camera.radius * 0.12,
      Math.min(camera.radius * 80, camera.distance * factor)
    );
    requestRender();
  }, { passive: false });

  canvas.addEventListener("dblclick", function () {
    if (!mesh) return;
    fitCamera();
    requestRender();
  });

  canvas.addEventListener("keydown", function (event) {
    if (!mesh) return;
    var handled = true;
    switch (event.key) {
      case "ArrowLeft":
        camera.yaw += 0.12;
        break;
      case "ArrowRight":
        camera.yaw -= 0.12;
        break;
      case "ArrowUp":
        camera.pitch = Math.min(1.45, camera.pitch + 0.12);
        break;
      case "ArrowDown":
        camera.pitch = Math.max(-1.45, camera.pitch - 0.12);
        break;
      case "+":
      case "=":
        camera.distance = Math.max(camera.radius * 0.12, camera.distance * 0.88);
        break;
      case "-":
      case "_":
        camera.distance = Math.min(camera.radius * 80, camera.distance * 1.14);
        break;
      case "0":
        fitCamera();
        break;
      default:
        handled = false;
    }
    if (handled) {
      event.preventDefault();
      requestRender();
    }
  });

  if (chooseButton && fileInput) {
    chooseButton.addEventListener("click", function () { fileInput.click(); });
  }
  if (empty && fileInput) {
    empty.addEventListener("click", function (event) {
      if (event.target === empty) fileInput.click();
    });
  }
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      readFile(fileInput.files && fileInput.files[0]);
      fileInput.value = "";
    });
  }
  if (demoButton) {
    demoButton.addEventListener("click", function () {
      loadBuffer(window.STLTools.demoCubeBuffer(20), "demo-cube.stl");
    });
  }
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      if (!mesh) return;
      fitCamera();
      requestRender();
    });
  }
  if (wireButton) {
    wireButton.addEventListener("click", function () {
      if (!mesh || !uint32Indices) return;
      wireframe = !wireframe;
      wireButton.setAttribute("aria-pressed", wireframe ? "true" : "false");
      if (wireframe) buildLineBuffer();
      requestRender();
    });
  }

  ["dragenter", "dragover"].forEach(function (name) {
    stage.addEventListener(name, function (event) {
      event.preventDefault();
      stage.classList.add("viewer-dragover");
    });
  });
  ["dragleave", "drop"].forEach(function (name) {
    stage.addEventListener(name, function (event) {
      event.preventDefault();
      stage.classList.remove("viewer-dragover");
    });
  });
  stage.addEventListener("drop", function (event) {
    var files = event.dataTransfer && event.dataTransfer.files;
    if (files && files.length) readFile(files[0]);
  });
  stage.addEventListener("click", function (event) {
    if (event.target === stage && !mesh && fileInput) fileInput.click();
  });

  if (window.ResizeObserver) {
    new ResizeObserver(function () { requestRender(); }).observe(canvas);
  } else {
    window.addEventListener("resize", requestRender);
  }

  // Render the "drop a file" background once WebGL is ready.
  if (initGL()) requestRender();
})();
