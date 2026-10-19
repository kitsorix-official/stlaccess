/** STLACCESS Scale Inspector - local file dimension + unit inspection. */
(function () {
  "use strict";

  var drop = document.getElementById("inspector-drop");
  if (!drop || !window.STLTools) return;

  var fileInput = document.getElementById("inspector-file");
  var chooseButton = document.getElementById("inspector-choose");
  var demoButton = document.getElementById("inspector-demo");
  var targetInput = document.getElementById("inspector-target-z");
  var copyButton = document.getElementById("inspector-copy");
  var loading = document.getElementById("inspector-loading");
  var errorBox = document.getElementById("inspector-error");
  var errorText = document.getElementById("inspector-error-text");
  var results = document.getElementById("inspector-results");
  var unitWarning = document.getElementById("inspector-unit-warning");
  var unitWarningText = document.getElementById("inspector-unit-warning-text");

  var mesh = null;
  var currentPercent = null;

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

  function updateScale() {
    if (!mesh) return;
    var size = mesh.bounds.size;
    var height = size[2] > 0.0001 ? size[2] : Math.max(size[0], size[1]);
    var axis = size[2] > 0.0001 ? "Z" : "longest axis";
    var target = targetInput ? parseFloat(targetInput.value) : 32;
    if (!isFinite(target) || target <= 0) target = 32;

    if (height > 0) {
      currentPercent = (target / height) * 100;
      setText("inspector-scale-percent", currentPercent.toFixed(2) + "%");
      setText("inspector-scale-note", "Scale factor: " + (currentPercent / 100).toFixed(4) + "x. Height used: " + axis + " = " + window.STLTools.formatMm(height) + " mm.");
      setText(
        "inspector-scaled-dims",
        (size[0] * currentPercent / 100).toFixed(2) + " x " +
        (size[1] * currentPercent / 100).toFixed(2) + " x " +
        (size[2] * currentPercent / 100).toFixed(2) + " mm"
      );
      if (copyButton) copyButton.disabled = false;
    } else {
      currentPercent = null;
      setText("inspector-scale-percent", "-");
      setText("inspector-scale-note", "This mesh has zero height on every axis, so there is nothing to scale.");
      setText("inspector-scaled-dims", "-");
      if (copyButton) copyButton.disabled = true;
    }
  }

  function updateFile() {
    if (!mesh) return;
    var size = mesh.bounds.size;
    var longest = Math.max(size[0], size[1], size[2]);

    setText("inspector-stat-name", mesh.name || "Untitled STL");
    setText("inspector-stat-format", mesh.format === "binary" ? "Binary STL" : "ASCII STL");
    setText("inspector-stat-size", window.STLTools.formatBytes(mesh.byteLength));
    setText("inspector-stat-triangles", window.STLTools.formatNumber(mesh.triangleCount));

    ["x", "y", "z"].forEach(function (axis, index) {
      setText("inspector-" + axis + "-mm", window.STLTools.formatMm(size[index]) + " mm");
      setText("inspector-" + axis + "-in", (size[index] / 25.4).toFixed(3) + " in");
    });

    if (unitWarning && unitWarningText) {
      if (longest > 0 && longest < 5) {
        unitWarning.hidden = false;
        unitWarningText.textContent =
          "The longest axis is only " + window.STLTools.formatMm(longest) + " mm. If this model was authored in inches, its true size is " +
          window.STLTools.formatMm(size[0] * 25.4) + " x " + window.STLTools.formatMm(size[1] * 25.4) + " x " +
          window.STLTools.formatMm(size[2] * 25.4) + " mm. Slicers assume millimetres unless you tell them otherwise.";
      } else {
        unitWarning.hidden = true;
      }
    }

    results.hidden = false;
    updateScale();
  }

  function loadBuffer(buffer, name) {
    clearError();
    setBusy(true, "Measuring " + name + " locally...");
    setTimeout(function () {
      try {
        mesh = window.STLTools.parseSTL(buffer, { name: name });
        updateFile();
      } catch (err) {
        mesh = null;
        results.hidden = true;
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
      loadBuffer(window.STLTools.demoCubeBuffer(20), "demo-20mm-cube.stl");
    });
  }
  if (targetInput) {
    targetInput.addEventListener("input", updateScale);
    targetInput.addEventListener("change", updateScale);
  }
  if (copyButton) {
    copyButton.addEventListener("click", function () {
      if (currentPercent === null) return;
      var value = currentPercent.toFixed(2) + "%";
      if (!navigator.clipboard || !navigator.clipboard.writeText) return;
      navigator.clipboard.writeText(value).then(function () {
        var label = document.getElementById("inspector-copy-label");
        if (!label) return;
        var original = label.textContent;
        label.textContent = "Copied " + value;
        setTimeout(function () { label.textContent = original; }, 1600);
      });
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
