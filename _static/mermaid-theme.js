// Re-render Mermaid diagrams when Furo theme toggles between light/dark
(function () {
  function getTheme() {
    var t = document.body.dataset.theme;
    if (t === "dark") return "dark";
    if (t === "light") return "default";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "default";
  }

  async function rerender() {
    var theme = getTheme();
    mermaid.initialize({ startOnLoad: false, theme: theme });
    document.querySelectorAll(".mermaid").forEach(function (el) {
      var source = el.getAttribute("data-mermaid-src");
      if (source) {
        el.removeAttribute("data-processed");
        el.textContent = source;
      }
    });
    await mermaid.run();
  }

  // Stash original Mermaid source before first render
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".mermaid").forEach(function (el) {
      if (!el.getAttribute("data-mermaid-src")) {
        el.setAttribute("data-mermaid-src", el.textContent);
      }
    });
  });

  // Watch for Furo theme toggle (data-theme on body)
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === "data-theme") {
        rerender();
        break;
      }
    }
  });
  observer.observe(document.body, { attributes: true });
})();
