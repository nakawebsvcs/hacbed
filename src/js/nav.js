// Astro:page-load wrapper for View Transitions purposes
document.addEventListener("astro:page-load", () => {
  // Basic navigation setup (unchanged)
  const CSbody = document.querySelector("body");
  const CSnavbarMenu = document.getElementById("cs-navigation");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");

  function toggleMenu() {
    mobileMenuToggle.classList.toggle("cs-active");
    CSnavbarMenu.classList.toggle("cs-active");
    CSbody.classList.toggle("cs-open");
  }

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
      toggleMenu();
      ariaExpanded(mobileMenuToggle);
    });
  }

  function ariaExpanded(element) {
    const isExpanded = element.getAttribute("aria-expanded");
    element.setAttribute(
      "aria-expanded",
      isExpanded === "false" ? "true" : "false"
    );
  }

  // PRIMARY DROPDOWNS
  const dropdownElements = document.querySelectorAll(".cs-dropdown");
  console.log("Found dropdowns:", dropdownElements.length);

  dropdownElements.forEach((element) => {
    // Add standard keyboard and focus handlers
    let escapePressed = false;

    element.addEventListener("focusout", function (event) {
      if (escapePressed) {
        escapePressed = false;
        return;
      }

      if (!element.contains(event.relatedTarget)) {
        element.classList.remove("cs-active");
        const dropdownButton = element.querySelector(".cs-dropdown-button");
        if (dropdownButton) {
          ariaExpanded(dropdownButton);
        }
      }
    });

    element.addEventListener("keydown", function (event) {
      const dropdownButton = element.querySelector(".cs-dropdown-button");

      if (element.classList.contains("cs-active")) {
        event.stopPropagation();
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        element.classList.toggle("cs-active");
        if (dropdownButton) {
          ariaExpanded(dropdownButton);
        }
      }

      if (event.key === "Escape") {
        escapePressed = true;
        element.classList.remove("cs-active");
        if (dropdownButton) {
          ariaExpanded(dropdownButton);
        }
      }
    });
  });

  // Add click handlers for ALL dropdown buttons, including tertiary ones
  const allDropdownButtons = document.querySelectorAll(".cs-dropdown-button");
  console.log("All dropdown buttons:", allDropdownButtons.length);

  allDropdownButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Prevent default behavior
      e.preventDefault();
      e.stopPropagation();

      // Find the parent dropdown element
      const parentDropdown = button.closest(".cs-dropdown");

      if (parentDropdown) {
        // Log which type of dropdown was clicked
        const isSecondaryDropdown = parentDropdown.classList.contains("cs-li");
        const isTertiaryDropdown =
          parentDropdown.classList.contains("cs-drop-li");
        console.log("Button clicked:", button.textContent.trim(), {
          isSecondaryDropdown,
          isTertiaryDropdown,
        });

        // Toggle the active class on the parent
        parentDropdown.classList.toggle("cs-active");

        // Update ARIA attributes
        ariaExpanded(button);
      }
    });
  });

  // Escape key for mobile menu
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      mobileMenuToggle?.classList.contains("cs-active")
    ) {
      toggleMenu();
    }
  });

  // Enter key for links
  const allLinks = document.querySelectorAll(".cs-li-link");
  allLinks.forEach((link) => {
    if (link.tagName === "A") {
      link.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          window.location.href = link.href;
        }
      });
    }
  });
});
