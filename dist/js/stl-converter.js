/** STLACCESS STL Converter - local format conversion. */
(function () {
  "use strict";

  var drop = document.getElementById("stl-converter-drop");
  if (!drop || !window.STLTools) return;

  var fileInput = document.getElementById("stl-converter-file");
  var chooseButton = document.getElementById("stl-converter-choose");
  var demoButton = document.getElementById("stl-converter-demo");
  var formatSelect = document.getElementById("converter-format");
  var toleranceInput = document.getElementById("converter-tolerance");
  var downloadButton = document.getElementById("converter-download");
  var info = document.getElementById("stl-converter-info");
  var errorBox = document.getElementById("stl-converter-error");
  var errorText = document.getElementById("stl-converter-error-text");
  var status = document.getElementById("converter-status");
  var loading = document.getElementById("stl-converter-loading");

  var mesh = null;

  var labels = {
    obj: "OBJ",
    ply: "PLY",
    "stl-binary": "Binary STL",
    "stl-ascii": "ASCII STL"
  };

  function setText(id, value) {
    var element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function setStatus(message, isError) {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("text-red-400", Boolean(isError));
    status.classList.toggle("text-slate-400", !isError);
  }

  function showError(message) {
    if (errorText) errorText.textContent = message;
    if (errorBox) errorBox.hidden = false;
    setStatus(message, true);
  }

  function clearError() {
    if (errorBox) errorBox.hidden = true;
  }

  function setBusy(busy, message) {
    if (loading) {
      var label = loading.querySelector("[data-loading-label]");
      if (message && label) label.textContent = message;
      loading.hidden = !busy;
    }
    if (downloadButton) downloadButton.disabled = busy || !mesh;
  }

  function updateButtonLabel() {
    if (!downloadButton || !formatSelect) return;
    var target = document.getElementById("converter-download-label");
    var label = labels[formatSelect.value] || "file";
    if (target) target.textContent = "Convert & download " + label;
    else downloadButton.textContent = "Convert & download " + label;
  }

  function updateStats() {
    if (!mesh) return;
    var size = mesh.bounds.size;
    setText("converter-stat-name", mesh.name || "Untitled STL");
    setText("converter-stat-format", mesh.format === "binary" ? "Binary STL" : "ASCII STL");
    setText("converter-stat-size", window.STLTools.formatBytes(mesh.byteLength));
    setText("converter-stat-triangles", window.STLTools.formatNumber(mesh.triangleCount));
    setText("converter-stat-dimensions", size.map(window.STLTools.formatMm).join(" x ") + " mm");
    if (info) info.hidden = false;
    if (downloadButton) downloadButton.disabled = false;
  }

  function loadBuffer(buffer, name) {
    clearError();
    setBusy(true, "Reading " + name + " locally...");
    setTimeout(function () {
      try {
        mesh = window.STLTools.parseSTL(buffer, { name: name });
        var summary = document.getElementById("converter-output-summary");
        if (summary) summary.hidden = true;
        updateStats();
        updateButtonLabel();
        setStatus("Ready. Choose an output format, then convert. Nothing leaves this tab.", false);
      } catch (err) {
        mesh = null;
        if (info) info.hidden = true;
        if (downloadButton) downloadButton.disabled = true;
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
      loadBuffer(window.STLTools.demoCubeBuffer(20), "demo-cube.stl");
    });
  }
  if (formatSelect) {
    formatSelect.addEventListener("change", function () {
      updateButtonLabel();
      if (mesh) setStatus("Format set to " + (labels[formatSelect.value] || formatSelect.value) + ". Convert when ready.", false);
    });
  }
  if (downloadButton) {
    downloadButton.addEventListener("click", function () {
      if (!mesh || !formatSelect || !window.STLTools) return;
      clearError();
      setBusy(true, "Converting locally...");
      var format = formatSelect.value;
      var tolerance = toleranceInput ? parseFloat(toleranceInput.value) : 0.001;
      if (!isFinite(tolerance) || tolerance <= 0) tolerance = 0.001;
      setTimeout(function () {
        try {
          var output = window.STLTools.convert(mesh, format, { tolerance: tolerance });
          window.STLTools.downloadBlob(output.blob, output.filename);
          setText("converter-output-size", window.STLTools.formatBytes(output.blob.size));
          setText("converter-output-name", output.filename);
          var summary = document.getElementById("converter-output-summary");
          if (summary) summary.hidden = false;
          setStatus("Saved " + output.filename + " (" + window.STLTools.formatBytes(output.blob.size) + ").", false);
        } catch (err) {
          showError(err && err.message ? err.message : "Conversion failed. The mesh may contain invalid values.");
        } finally {
          setBusy(false);
        }
      }, 30);
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

  updateButtonLabel();
  if (downloadButton) downloadButton.disabled = true;
})();
