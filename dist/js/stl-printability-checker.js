/** STLACCESS Printability Checker - local mesh topology analysis. */
(function () {
  "use strict";

  var drop = document.getElementById("stl-checker-drop");
  if (!drop || !window.STLTools) return;

  var fileInput = document.getElementById("stl-checker-file");
  var chooseButton = document.getElementById("stl-checker-choose");
  var demoButton = document.getElementById("stl-checker-demo");
  var brokenButton = document.getElementById("stl-checker-demo-broken");
  var toleranceInput = document.getElementById("checker-tolerance");
  var recheckButton = document.getElementById("checker-recheck");
  var loading = document.getElementById("stl-checker-loading");
  var errorBox = document.getElementById("stl-checker-error");
  var errorText = document.getElementById("stl-checker-error-text");
  var results = document.getElementById("checker-results");
  var verdict = document.getElementById("checker-verdict");
  var verdictTitle = document.getElementById("checker-verdict-title");
  var verdictText = document.getElementById("checker-verdict-text");

  var mesh = null;

  function setText(id, value) {
    var element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function setBusy(busy, message) {
    if (loading) {
      var label = loading.querySelector("[data-loading-label]");
      if (message && label) label.textContent = message;
      loading.hidden = !busy;
    }
  }

  function showError(message) {
    if (errorText) errorText.textContent = message;
    if (errorBox) errorBox.hidden = false;
  }

  function clearError() {
    if (errorBox) errorBox.hidden = true;
  }

  function metric(id, value, tone) {
    var element = document.getElementById(id);
    if (!element) return;
    element.textContent = value;
    element.classList.remove("text-emerald-400", "text-amber-400", "text-red-400", "text-slate-200");
    element.classList.add(tone === "good" ? "text-emerald-400" : tone === "warn" ? "text-amber-400" : tone === "bad" ? "text-red-400" : "text-slate-200");
  }

  function finding(id, show, message) {
    var element = document.getElementById(id);
    if (!element) return;
    element.hidden = !show;
    if (show && message) {
      var text = element.querySelector("[data-finding-text]");
      if (text) text.textContent = message;
    }
  }

  function runCheck() {
    if (!mesh) return;
    var tolerance = toleranceInput ? parseFloat(toleranceInput.value) : 0.001;
    if (!isFinite(tolerance) || tolerance <= 0) tolerance = 0.001;

    var analysis;
    try {
      analysis = window.STLTools.analyzeMesh(mesh, tolerance);
    } catch (err) {
      showError(err && err.message ? err.message : "The mesh analysis failed.");
      return;
    }

    var size = mesh.bounds.size;
    setText("checker-stat-name", mesh.name || "Untitled STL");
    setText("checker-stat-format", mesh.format === "binary" ? "Binary STL" : "ASCII STL");
    setText("checker-stat-size", window.STLTools.formatBytes(mesh.byteLength));
    setText("checker-stat-triangles", window.STLTools.formatNumber(analysis.triangleCount));
    setText("checker-stat-vertices", window.STLTools.formatNumber(analysis.uniqueVertices));
    setText("checker-stat-dimensions", size.map(window.STLTools.formatMm).join(" x ") + " mm");
    setText("checker-stat-volume", (analysis.isClosed ? "" : "~") + analysis.volumeCm3.toFixed(2) + " cm3");
    setText("checker-stat-area", analysis.surfaceAreaCm2.toFixed(2) + " cm2");
    setText("checker-tolerance-used", analysis.tolerance + " mm");
    setText("checker-shell-count", window.STLTools.formatNumber(analysis.shells));

    metric("checker-open-edges", window.STLTools.formatNumber(analysis.openEdges), analysis.openEdges ? "bad" : "good");
    metric("checker-non-manifold", window.STLTools.formatNumber(analysis.nonManifoldEdges), analysis.nonManifoldEdges ? "bad" : "good");
    metric("checker-degenerate", window.STLTools.formatNumber(analysis.degenerateTriangles), analysis.degenerateTriangles ? "warn" : "good");
    metric("checker-winding", window.STLTools.formatNumber(analysis.inconsistentEdges), analysis.inconsistentEdges ? "warn" : "good");
    metric("checker-shells", window.STLTools.formatNumber(analysis.shells), analysis.shells > 1 ? "warn" : "good");

    var clean = analysis.isWatertight && analysis.inconsistentEdges === 0;
    if (verdict) {
      verdict.classList.remove("border-emerald-500/30", "bg-emerald-500/5", "border-amber-500/30", "bg-amber-500/5", "border-red-500/30", "bg-red-500/5");
      verdict.classList.add(
        clean ? "border-emerald-500/30" : "border-amber-500/30",
        clean ? "bg-emerald-500/5" : "bg-amber-500/5"
      );
    }
    if (verdictTitle) {
      verdictTitle.textContent = clean ? "Watertight and consistent" : "Geometry issues found";
      verdictTitle.classList.remove("text-emerald-400", "text-amber-400", "text-red-400");
      verdictTitle.classList.add(clean ? "text-emerald-400" : "text-amber-400");
    }
    if (verdictText) {
      verdictText.textContent = clean
        ? "Every edge is shared by exactly two faces, the winding is consistent, and no zero-area triangles were found. This mesh should slice without repair."
        : "This file has at least one topology defect. Your slicer may repair it silently - or fail, or produce a hollow or shifted print. Read the findings below before committing a long print.";
    }

    finding("finding-open", analysis.openEdges > 0, analysis.openEdges + " open edge" + (analysis.openEdges === 1 ? "" : "s") + " - the surface has holes. Close them, or let your slicer repair the mesh, before printing.");
    finding("finding-non-manifold", analysis.nonManifoldEdges > 0, analysis.nonManifoldEdges + " edge" + (analysis.nonManifoldEdges === 1 ? " is" : "s are") + " shared by more than two faces. This usually comes from overlapping or boolean-merged geometry; remove the internal faces.");
    finding("finding-winding", analysis.inconsistentEdges > 0, analysis.inconsistentEdges + " edge" + (analysis.inconsistentEdges === 1 ? " has" : "s have") + " inconsistent face winding. Recalculate outside normals in your modeling software.");
    finding("finding-degenerate", analysis.degenerateTriangles > 0, analysis.degenerateTriangles + " zero-area triangle" + (analysis.degenerateTriangles === 1 ? "" : "s") + " found. They are harmless in small numbers but can confuse slicers; remove them if possible.");
    finding("finding-shells", analysis.shells > 1, analysis.shells + " disconnected shells found. Multiple shells are fine for a base-plus-figure model, but a single object split into pieces may print apart.");
    finding("finding-clean", clean, "No open edges, non-manifold edges, winding conflicts, or degenerate triangles were detected at " + analysis.tolerance + " mm merge tolerance.");

    if (results) results.hidden = false;
    if (recheckButton) recheckButton.disabled = false;
  }

  function loadBuffer(buffer, name) {
    clearError();
    setBusy(true, "Analyzing " + name + " locally...");
    setTimeout(function () {
      try {
        mesh = window.STLTools.parseSTL(buffer, { name: name });
        runCheck();
      } catch (err) {
        mesh = null;
        if (results) results.hidden = true;
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
    reader.onload = function () { loadBuffer(reader.result, file.name); };
    reader.onerror = function () {
      setBusy(false);
      showError("The browser could not read that file. Try choosing it again.");
    };
    reader.readAsArrayBuffer(file);
  }

  if (chooseButton && fileInput) {
    chooseButton.addEventListener("click", function () { fileInput.click(); });
  }
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      readFile(fileInput.files && fileInput.files[0]);
      fileInput.value = "";
    });
  }
  if (demoButton) {
    demoButton.addEventListener("click", function () {
      loadBuffer(window.STLTools.demoCubeBuffer(20, false), "demo-watertight-cube.stl");
    });
  }
  if (brokenButton) {
    brokenButton.addEventListener("click", function () {
      loadBuffer(window.STLTools.demoCubeBuffer(20, true), "demo-open-cube.stl");
    });
  }
  if (recheckButton) {
    recheckButton.addEventListener("click", runCheck);
  }
  if (toleranceInput) {
    toleranceInput.addEventListener("change", function () {
      if (mesh) runCheck();
    });
  }

  ["dragenter", "dragover"].forEach(function (name) {
    drop.addEventListener(name, function (event) {
      event.preventDefault();
      drop.classList.add("viewer-dragover");
    });
  });
  ["dragleave", "drop"].forEach(function (name) {
    drop.addEventListener(name, function (event) {
      event.preventDefault();
      drop.classList.remove("viewer-dragover");
    });
  });
  drop.addEventListener("drop", function (event) {
    var files = event.dataTransfer && event.dataTransfer.files;
    if (files && files.length) readFile(files[0]);
  });
  drop.addEventListener("click", function (event) {
    if (event.target === drop && !mesh && fileInput) fileInput.click();
  });
})();
