const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    siteNav.classList.remove("is-open");
  };

  navToggle.addEventListener("click", () => {
    const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isExpanded));
    navToggle.setAttribute("aria-label", isExpanded ? "Open menu" : "Close menu");
    siteNav.classList.toggle("is-open");
  });

  document.addEventListener("click", (event) => {
    const isMobile = window.matchMedia("(max-width: 960px)").matches;
    if (!isMobile) return;
    if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
      closeMenu();
    }
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 960px)").matches) {
        closeMenu();
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 960) {
      closeMenu();
    }
  });
}

const form = document.querySelector(".lead-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const statusEl = form.querySelector(".form-status");
    const requiredFields = ["name", "phone", "email", "service"];

    const hasAllValues = requiredFields.every((fieldName) => {
      const element = form.elements.namedItem(fieldName);
      return element && String(element.value || "").trim().length > 0;
    });

    if (!hasAllValues) {
      if (statusEl) {
        statusEl.textContent = "Please complete all required fields so we can contact you.";
        statusEl.style.color = "#b42318";
      }
      return;
    }

    const name = String(form.elements.namedItem("name")?.value || "").trim();
    const phone = String(form.elements.namedItem("phone")?.value || "").trim();
    const email = String(form.elements.namedItem("email")?.value || "").trim();
    const service = String(form.elements.namedItem("service")?.value || "").trim();
    const message = String(form.elements.namedItem("message")?.value || "").trim();

    const subject = encodeURIComponent(`Estimate Request - ${service || "Website Lead"}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Service: ${service}`,
        "",
        "Project Details:",
        message || "N/A"
      ].join("\n")
    );

    window.location.href = `mailto:masterflooringandpainting@gmail.com?subject=${subject}&body=${body}`;

    if (statusEl) {
      statusEl.textContent = "Opening your email app to send your estimate request.";
      statusEl.style.color = "#136f2d";
    }
  });
}
