// Simple typewriter animation for the hero section
// Types the greeting and then the name, then reveals the rest
(function () {
  function typeText(el, text, speed, done) {
    el.textContent = "";
    let i = 0;
    function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i += 1;
        setTimeout(step, speed);
      } else if (typeof done === "function") {
        done();
      }
    }
    step();
  }

  window.addEventListener("DOMContentLoaded", function () {
    // Respect reduced motion and run only on first visit per session
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasRun = sessionStorage.getItem('introTyped') === '1';

    const hello = document.querySelector(".hero h4");
    const name = document.querySelector(".hero .my-name");
    const rest = document.querySelectorAll(".info, .say-hi, .social, .rule, section.projects, section.contact");

    // Prepare initial state
    const helloText = "Hello world, I'm";
    const nameText = name ? name.textContent.trim() : "";
    if (name) name.textContent = "";
    rest.forEach((el) => el.classList && el.classList.add("hidden"));

    function revealRest() {
      rest.forEach((el) => el.classList && el.classList.replace("hidden", "show"));
    }

    if (prefersReduced || hasRun) {
      // Skip typing for reduced motion or repeat visits this session
      if (hello) hello.textContent = helloText;
      if (name) name.textContent = nameText;
      revealRest();
      return;
    }

    typeText(hello, helloText, 45, function () {
      setTimeout(function () {
        if (!nameText) return revealRest();
        typeText(name, nameText, 55, function () {
          revealRest();
          sessionStorage.setItem('introTyped', '1');
        });
      }, 300);
    });
  });
})();



