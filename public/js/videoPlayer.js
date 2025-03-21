// Workaround for video caption issue
console.log("Video player script loaded - " + new Date().toISOString());

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded - setting up video lightbox with caption workaround");

  // Hardcoded captions for founders with videos
  const founderCaptions = {
    "Bill Chang": "From the 1992 CBED Video",
    "Charlie Reppun": "From the 1992 CBED Video",
    "Colette Machado": "From the 1992 CBED Video",
    "LaFrance Kapaka-Arboleda": "From the 1992 CBED Video",
    "Puanani Burgess": "From the 1992 CBED Video",
    "Robert Agres": "From the 1992 CBED Video",
  };

  // Get references to the existing lightbox elements
  const overlay = document.querySelector(".video-lightbox-overlay");
  const content = document.querySelector(".video-lightbox-content");
  const caption = document.querySelector(".video-lightbox-caption");
  const closeBtn = document.querySelector(".video-lightbox-close");

  if (!overlay || !content || !caption || !closeBtn) {
    console.error("Some lightbox elements not found in the DOM");
    return;
  }

  // Set up event listeners for closing
  closeBtn.addEventListener("click", () => closeLightbox());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeLightbox();
    }
  });

  // Add click handlers to all video links
  const videoLinks = document.querySelectorAll(".cs-bio-video .cs-link");
  console.log(`Found ${videoLinks.length} video links`);

  videoLinks.forEach((link) => {
    const founderItem = link.closest(".cs-item");
    const founderName =
      founderItem?.querySelector(".cs-name")?.textContent?.trim() || "Unknown";

    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const videoUrl = link.getAttribute("href");

      // Try to get caption from data-caption attribute first
      let captionText = link.getAttribute("data-caption");

      // If no caption from attribute, use the hardcoded caption based on founder name
      if (!captionText && founderName in founderCaptions) {
        captionText = founderCaptions[founderName];
        console.log(
          `Using hardcoded caption for ${founderName}: "${captionText}"`
        );
      }

      openLightbox(videoUrl, captionText || "", founderName);
    });
  });

  function openLightbox(videoUrl, captionText, founderName) {
    console.log(`Opening lightbox for ${founderName}`);
    console.log(`Video URL: ${videoUrl}`);
    console.log(`Caption text: "${captionText}"`);

    // Clear previous content
    content.innerHTML = "";

    // Create and add iframe
    const iframe = document.createElement("iframe");
    iframe.src = videoUrl;
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "true");
    iframe.setAttribute("width", "100%");
    iframe.setAttribute("height", "100%");
    content.appendChild(iframe);

    // Check if caption is found
    if (!caption) {
      console.error("Caption element not found!");
      return;
    }

    // Update caption
    caption.textContent = captionText || "No caption available"; // Fallback text
    console.log(`Updated caption text: ${caption.textContent}`);

    caption.style.display = captionText ? "block" : "none"; // Show only if caption exists

    // Show lightbox
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    console.log("Closing lightbox...");

    overlay.classList.remove("active");
    document.body.style.overflow = "";
    content.innerHTML = "";
    caption.textContent = "";
  }
});

