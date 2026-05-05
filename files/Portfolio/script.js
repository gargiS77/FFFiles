// Smooth scrolling
document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

// Simple animation on load
window.onload = () => {
  document.querySelector(".hero").style.opacity = 0;
  setTimeout(() => {
    document.querySelector(".hero").style.transition = "1s";
    document.querySelector(".hero").style.opacity = 1;
  }, 200);
};
