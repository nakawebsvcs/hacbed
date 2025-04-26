// Add target="_blank" to all links within project content
document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll(".new-tab-links");
  containers.forEach((container) => {
    const links = container.querySelectorAll("a");
    links.forEach((link) => {
      // Skip links that already have a target attribute
      if (!link.hasAttribute("target")) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
    });
  });
});
