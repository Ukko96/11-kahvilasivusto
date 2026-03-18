function loadComponent(id, file) {
  return fetch(file)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;

      if (id === "header") {
        const header = document.getElementById("header");
        const menuBtn = header.querySelector(".menu-button");
        const closeBtn = header.querySelector(".closeMenuBtn");
        const nav = header.querySelector("nav");

        nav.classList.remove("open");
        closeBtn.style.display = "none";

        menuBtn.addEventListener("click", () => {
          nav.classList.add("open");
          menuBtn.style.display = "none";
          closeBtn.style.display = "inline";
        });

        closeBtn.addEventListener("click", () => {
          nav.classList.remove("open");
          menuBtn.style.display = "inline";
          closeBtn.style.display = "none";
        });

        document.addEventListener("click", (event) => {
          if (
            nav.classList.contains("open") &&
            !nav.contains(event.target) &&
            event.target !== menuBtn &&
            event.target !== closeBtn
          ) {
            nav.classList.remove("open");
            menuBtn.style.display = "inline";
            closeBtn.style.display = "none";
          }
        });
      }
    })
    .catch((err) => console.error(`${file} latausvirhe:`, err));
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "header.html");
  loadComponent("footer", "footer.html");
});

const body = document.body;
window.addEventListener("scroll", () => {
  const offset = window.scrollY;
  // Muokkaa nopeutta (esim. 0.5)
  body.style.backgroundPosition = `center ${offset * 0.5}px`;
});
