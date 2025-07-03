// Smooth scroll to section with header offset and expand section
function scrollToSection(id) {
  var el = document.getElementById(id);
  if (el) {
    var headerHeight = document.querySelector(".sticky-header").offsetHeight;
    var elementPosition = el.offsetTop;
    var offsetPosition = elementPosition - headerHeight - 2;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Expand the target section
    var contentId = id + "-content";
    var content = document.getElementById(contentId);
    var toggleBtn = el.querySelector(".section-toggle");

    if (content && toggleBtn) {
      // Set both content and button to expanded state
      content.setAttribute("aria-expanded", "true");
      toggleBtn.setAttribute("aria-expanded", "true");
    }
  }
}

// Collapsible section toggle
function toggleSection(contentId, btn) {
  var content = document.getElementById(contentId);
  var expanded = content.getAttribute("aria-expanded") === "true";
  content.setAttribute("aria-expanded", !expanded);
  btn.setAttribute("aria-expanded", !expanded);
  content.setAttribute("aria-busy", "true");
  setTimeout(function () {
    content.setAttribute("aria-busy", "false");
  }, 300);
}

// Minified, event-delegated navigation and section toggling
document.addEventListener("DOMContentLoaded", function () {
  const nav = document.querySelector(".nav-menu");
  const sections = document.querySelectorAll(".collapsible-section");
  // Remove any expanded state on load
  sections.forEach((section) => {
    section.setAttribute("aria-expanded", "false");
    const content = section.querySelector(".collapsible");
    if (content) content.setAttribute("aria-expanded", "false");
    const toggle = section.querySelector(".section-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  });
  // Navigation event delegation (if needed)
  if (nav) {
    nav.addEventListener("click", function (e) {
      const target = e.target.closest("button[data-section]");
      if (target) {
        const sectionId = target.getAttribute("data-section");
        const section = document.getElementById(sectionId);
        if (section) {
          // Scroll to section, do not auto-expand/collapse
          const headerHeight = nav.offsetHeight;
          const sectionTop =
            section.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: sectionTop - headerHeight,
            behavior: "smooth",
          });
        }
      }
    });
  }
  // Collapsible section toggling
  sections.forEach((section) => {
    const header = section.querySelector(".section-toggle");
    if (header) {
      header.addEventListener("click", function () {
        const expanded = section.getAttribute("aria-expanded") === "true";
        section.setAttribute("aria-expanded", !expanded);
        const content = section.querySelector(".collapsible");
        if (content) content.setAttribute("aria-expanded", !expanded);
        header.setAttribute("aria-expanded", !expanded);
      });
    }
  });
});

// Back to Top button logic for mobile/tablet
(function () {
  var btn = document.getElementById("backToTop");
  var header = document.querySelector(".sticky-header");
  function onScroll() {
    if (window.innerWidth < 964 && header) {
      if (window.scrollY === 0) {
        header.classList.remove("hide-on-scroll");
      } else {
        header.classList.add("hide-on-scroll");
      }
    } else if (header) {
      header.classList.remove("hide-on-scroll");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  if (btn) {
    btn.style.display = "flex";
    btn.classList.add("visible");
    btn.addEventListener("click", function () {
      var header = document.querySelector(".sticky-header");
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Always show header immediately after clicking Back to Top
      if (header) {
        header.classList.remove("hide-on-scroll");
      }
      btn.blur();
    });
  }
  onScroll();
})();
