const steps = document.querySelectorAll(".step");
const panels = document.querySelectorAll(".panel");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const step = entry.target.dataset.step;

        // Highlight active step
        steps.forEach(s => s.classList.remove("active"));
        entry.target.classList.add("active");

        // Show matching panel
        panels.forEach(p => {
          p.classList.toggle(
            "active",
            p.dataset.step === step
          );
        });
      }
    });
  },
  {
    rootMargin: "-55% 0px -25% 0px",  // ← tuned
    threshold: 0
  }
);

// Observe each step
steps.forEach(step => observer.observe(step));
const progressBar = document.querySelector(".progress-bar");

window.addEventListener("scroll", () => {
  const firstStep = steps[0];
  const lastStep = steps[steps.length - 1];

  const start = firstStep.offsetTop;
  const end = lastStep.offsetTop + lastStep.offsetHeight;

  const scrollY = window.scrollY + window.innerHeight / 2;

  const progress = Math.min(
    Math.max((scrollY - start) / (end - start), 0),
    1
  );

  progressBar.style.height = `${progress * 100}%`;
});
let currentIndex = 0;

function activateStep(index) {
  if (index < 0 || index >= steps.length) return;

  steps[index].scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  currentIndex = index;
}

document.addEventListener("keydown", e => {
  if (["ArrowDown", "j"].includes(e.key)) {
    activateStep(currentIndex + 1);
  }

  if (["ArrowUp", "k"].includes(e.key)) {
    activateStep(currentIndex - 1);
  }
});
