import "./styles/main.scss";

function initPortfolioFilter() {
  const tabs = document.querySelectorAll(".hs-tab[data-filter]");
  const items = document.querySelectorAll("#portfolioGrid [data-cat]");
  if (!tabs.length || !items.length) return;

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.getAttribute("data-filter");
      items.forEach((card) => {
        const cat = card.getAttribute("data-cat");
        const show = filter === "all" || filter === cat;
        card.style.display = show ? "" : "none";
      });
    });
  });
}

function initOffcanvasAutoClose() {
  const offcanvasEl = document.getElementById("mainOffcanvas");
  if (!offcanvasEl) return;

  const links = offcanvasEl.querySelectorAll("a.nav-link, a.btn");
  links.forEach((a) => {
    a.addEventListener("click", () => {
      // Bootstrap já está via CDN no HTML
      const bs = window.bootstrap;
      if (!bs) return;
      const instance = bs.Offcanvas.getInstance(offcanvasEl) || new bs.Offcanvas(offcanvasEl);
      instance.hide();
    });
  });
}

function initScrollSpyActiveLinks() {
  const links = document.querySelectorAll('a.nav-link[href^="#"]');
  const sections = [...links]
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const map = new Map();
  links.forEach((a) => map.set(a.getAttribute("href"), a));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const id = `#${e.target.id}`;
        const link = map.get(id);
        if (!link) return;

        if (e.isIntersecting) {
          links.forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        }
      });
    },
    { root: null, threshold: 0.35 }
  );

  sections.forEach((s) => io.observe(s));
}

function initContactFormClear() {
  const btn = document.getElementById("btnClear");
  const form = document.getElementById("contactForm");
  if (!btn || !form) return;

  btn.addEventListener("click", () => form.reset());
}

initPortfolioFilter();
initOffcanvasAutoClose();
initScrollSpyActiveLinks();
initContactFormClear();
