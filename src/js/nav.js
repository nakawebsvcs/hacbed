// Astro:page-load wrapper for View Transitions purposes
document.addEventListener("astro:page-load", () => {
  const tertiaryButtons = document.querySelectorAll(".cs-tertiary-toggle");
  console.log(
    "Found tertiary buttons:",
    tertiaryButtons.length,
    tertiaryButtons
  );

  // Also check for all dropdown buttons
  const allDropButtons = document.querySelectorAll(".cs-dropdown-button");
  console.log("All dropdown buttons:", allDropButtons.length);
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
        // Add specific log for tertiary buttons
        if (button.classList.contains("cs-tertiary-toggle")) {
          console.log("Tertiary button clicked!");
          // Force active class on tertiary dropdown parent
          parentDropdown.classList.toggle("cs-active");

          // Add specific debug for "How We Work" item
          if (parentDropdown.textContent.includes("How We Work")) {
            console.log("How We Work dropdown toggled!");
            console.log(
              "Tertiary menu:",
              parentDropdown.querySelector(".cs-tertiary-ul")
            );

            // Force display the tertiary menu through JS as a fallback
            const tertiaryMenu =
              parentDropdown.querySelector(".cs-tertiary-ul");
            if (tertiaryMenu) {
              tertiaryMenu.style.display =
                tertiaryMenu.style.display === "block" ? "none" : "block";
              tertiaryMenu.style.opacity = "1";
              tertiaryMenu.style.visibility = "visible";
              tertiaryMenu.style.transform = "none";
              tertiaryMenu.style.zIndex = "99999";
            }
          }
        }

        // Toggle the active class on the parent (original code)
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

// Add this debugging code
document.addEventListener("click", (e) => {
  const closest = e.target.closest(".cs-tertiary-toggle");
  if (closest) {
    console.log("Tertiary button clicked", closest);
    console.log("Parent dropdown:", closest.closest(".cs-dropdown"));
  }
});
