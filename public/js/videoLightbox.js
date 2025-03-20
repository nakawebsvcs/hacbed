// Video Lightbox functionality
document.addEventListener("DOMContentLoaded", () => {
  // Create lightbox elements if they don't already exist
  if (!document.querySelector(".video-lightbox-overlay")) {
    const lightboxOverlay = document.createElement("div");
    lightboxOverlay.className = "video-lightbox-overlay";

    const lightboxContainer = document.createElement("div");
    lightboxContainer.className = "video-lightbox-container";

    const closeButton = document.createElement("button");
    closeButton.className = "video-lightbox-close";
    closeButton.innerHTML = "&times;";
    closeButton.setAttribute("aria-label", "Close video");

    const videoContainer = document.createElement("div");
    videoContainer.className = "video-lightbox-content";

    // Append elements
    lightboxContainer.appendChild(closeButton);
    lightboxContainer.appendChild(videoContainer);
    lightboxOverlay.appendChild(lightboxContainer);
    document.body.appendChild(lightboxOverlay);

    // Close lightbox on button click or overlay click
    closeButton.addEventListener("click", closeLightbox);
    lightboxOverlay.addEventListener("click", (e) => {
      if (e.target === lightboxOverlay) {
        closeLightbox();
      }
    });

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightboxOverlay.classList.contains("active")) {
        closeLightbox();
      }
    });
  }

  // Get references to lightbox elements
  const lightboxOverlay = document.querySelector(".video-lightbox-overlay");
  const videoContainer = document.querySelector(".video-lightbox-content");

  // Add event listeners to video links
  document.querySelectorAll(".cs-bio-video .cs-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation(); // Stop event from bubbling up to parent elements

      const videoUrl = link.getAttribute("href");

      // Create iframe for video
      const iframe = document.createElement("iframe");
      iframe.src = videoUrl;
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("width", "100%");
      iframe.setAttribute("height", "100%");

      // Clear previous content and add iframe
      videoContainer.innerHTML = "";
      videoContainer.appendChild(iframe);

      // Show lightbox
      lightboxOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    const lightboxOverlay = document.querySelector(".video-lightbox-overlay");
    const videoContainer = document.querySelector(".video-lightbox-content");

    lightboxOverlay.classList.remove("active");
    document.body.style.overflow = "";
    videoContainer.innerHTML = "";
  }
});