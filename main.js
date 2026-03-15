/*
  Main JavaScript for Kings Digital Learning
  - Mobile menu toggle
  - Scroll reveal animation
  - Testimonials slider
  - Smooth anchor focus
*/

const root = document.documentElement;
const mobileNav = document.querySelector(".mobile-nav");
const btnOpenNav = document.querySelector(".menu-toggle");
const btnCloseNav = document.querySelector(".mobile-nav-close");

const toggleNav = (open) => {
  if (!mobileNav) return;
  mobileNav.classList.toggle("active", open);
  document.body.style.overflow = open ? "hidden" : "";
};

btnOpenNav?.addEventListener("click", () => toggleNav(true));
btnCloseNav?.addEventListener("click", () => toggleNav(false));

// Close mobile nav when clicking a link
mobileNav?.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLAnchorElement) {
    toggleNav(false);
  }
});

// Smooth scroll focus styling for accessibility
const scrollLinks = document.querySelectorAll("a[href^='#']");
scrollLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;
    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
});

// Scroll reveal for elements with .reveal class
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Testimonials slider
const testimonials = document.querySelectorAll(".testimonial");
const dots = document.querySelectorAll(".testimonial-dot");
let testimonialIndex = 0;

const showTestimonial = (index) => {
  testimonials.forEach((item, idx) => {
    item.classList.toggle("active", idx === index);
  });
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === index);
  });
};

const nextTestimonial = () => {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
};

dots.forEach((dot, idx) => {
  dot.addEventListener("click", () => {
    testimonialIndex = idx;
    showTestimonial(idx);
  });
});

if (testimonials.length > 0) {
  showTestimonial(testimonialIndex);
  setInterval(nextTestimonial, 7600);
}

// Optional: detect prefers-reduced-motion and reduce animation speed
const mediaMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (mediaMotion.matches) {
  document.documentElement.style.setProperty("scroll-behavior", "auto");
}
