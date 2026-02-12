/* =========================
   MENU MOBILE (JS PURO)
========================= */

document.addEventListener("DOMContentLoaded", function () {

  const mobileBtn = document.getElementById("mobile_btn");
  const mobileMenu = document.getElementById("mobile_menu");
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll(".nav-item");
  const header = document.querySelector("header");

  /* ======================
     TOGGLE MENU MOBILE
  ====================== */

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");

      const icon = mobileBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-rectangle-xmark");
      }
    });
  }

  /* ======================
     SCROLL ATIVO + HEADER
  ====================== */

  window.addEventListener("scroll", function () {

    const scrollPosition = window.scrollY;

    // Header efeito ao rolar
    if (header) {
      header.classList.toggle("scrolled", scrollPosition > 0);
    }

    let activeSectionIndex = 0;

    sections.forEach((section, i) => {
      const sectionTop = section.offsetTop - 96;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSectionIndex = i;
      }
    });

    navItems.forEach(item => item.classList.remove("active"));

    if (navItems[activeSectionIndex]) {
      navItems[activeSectionIndex].classList.add("active");
    }

  });

  /* ======================
     SCROLL REVEAL
  ====================== */

  if (typeof ScrollReveal !== "undefined") {

    ScrollReveal().reveal("#cta", {
      origin: "left",
      duration: 2000,
      distance: "20%"
    });

    ScrollReveal().reveal(".imoveis-card", {
      origin: "left",
      duration: 2000,
      distance: "20%"
    });

  }

});

/* =========================
   CARROSSEL INFINITO REAL
========================= */

const track = document.querySelector('.carrosel-track');
const nextBtn = document.querySelector('.carrosel-btn-right.next');
const prevBtn = document.querySelector('.carrosel-btn-left.prev');

if (track && nextBtn && prevBtn) {

  const cards = document.querySelectorAll('.feedbacks-card');
  const cardWidth = cards[0].offsetWidth;

  let index = 1; // começamos no primeiro real
  let isTransitioning = false;

  // Clonar primeiro e último
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);

  firstClone.id = "first-clone";
  lastClone.id = "last-clone";

  track.appendChild(firstClone);
  track.prepend(lastClone);

  const allCards = document.querySelectorAll('.feedbacks-card');

  // Posiciona no primeiro real
  track.style.transform = `translateX(-${cardWidth * index}px)`;

  function moveToIndex() {
    if (isTransitioning) return;
    isTransitioning = true;

    track.style.transition = "transform 0.5s ease-in-out";
    track.style.transform = `translateX(-${cardWidth * index}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if (index >= allCards.length - 1) return;
    index++;
    moveToIndex();
  });

  prevBtn.addEventListener('click', () => {
    if (index <= 0) return;
    index--;
    moveToIndex();
  });

  track.addEventListener('transitionend', () => {

    if (allCards[index].id === "first-clone") {
      track.style.transition = "none";
      index = 1;
      track.style.transform = `translateX(-${cardWidth * index}px)`;
    }

    if (allCards[index].id === "last-clone") {
      track.style.transition = "none";
      index = allCards.length - 2;
      track.style.transform = `translateX(-${cardWidth * index}px)`;
    }

    isTransitioning = false;
  });

  /* ======================
            AUTOPLAY
    ====================== */

  let autoPlay = setInterval(() => {
    index++;
    moveToIndex();
  }, 2000);

  function stopAuto() {
    clearInterval(autoPlay);
  }

  function startAuto() {
    autoPlay = setInterval(() => {
      index++;
      moveToIndex();
    }, 3000);
  }

  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

}

/*  =========================
        CHECKBOXES (SIM/NÃO)
    ========================= */

function ligarCheckbox(checkboxId, hiddenId) {
  const checkbox = document.getElementById(checkboxId);
  const hidden = document.getElementById(hiddenId);

  if (!checkbox || !hidden) return;

  checkbox.addEventListener("change", () => {
    hidden.value = checkbox.checked ? "sim" : "nao";
  });
}

ligarCheckbox("outrasPropostasCheckboxRapido", "aceitaOutrasPropostasRapido");
ligarCheckbox("outrasPropostasCheckboxCompleto", "aceitaOutrasPropostasCompleto");


/*  =========================================
        SELECT DINÂMICO (FORM COMPLETO)
    ========================================= */

const objetivo = document.querySelector('#form_completo_objetivo');
const valor = document.querySelector('#form_completo_valor');

if (objetivo && valor) {

  objetivo.addEventListener("change", () => {
    valor.innerHTML = "<option value=''>Faixa de valor</option>";

    if (objetivo.value === "comprar" || objetivo.value === "investir") {
      valor.innerHTML += `
        <option>Até R$ 250.000</option>
        <option>R$ 250.000 a R$ 500.000</option>
        <option>Acima de R$ 500.000</option>
      `;
    }

    if (objetivo.value === "alugar") {
      valor.innerHTML += `
        <option>Até R$ 1.000</option>
        <option>R$ 1.000 a R$ 3.000</option>
        <option>Acima de R$ 3.000</option>
      `;
    }
  });

}


/*  =========================
        FORMULÁRIO RÁPIDO
    ========================= */

const formRapido = document.getElementById("form_rapido");

if (formRapido) {
  formRapido.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formRapido);

    try {
      await fetch("SUA_API_AQUI", {
        method: "POST",
        body: formData
      });

      alert("Recebemos seus dados! Em breve entraremos em contato.");
      formRapido.reset();

    } catch (error) {
      alert("Erro ao enviar. Tente novamente.");
    }
  });
}


/*  =========================
        FORMULÁRIO COMPLETO
    ========================= */

const formCompleto = document.getElementById("form_completo");

if (formCompleto) {
  formCompleto.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(formCompleto);

    try {
      await fetch("SUA_API_AQUI", {
        method: "POST",
        body: formData
      });

      alert("Recebemos seus dados! Em breve entraremos em contato.");
      formCompleto.reset();

    } catch (error) {
      alert("Erro ao enviar. Tente novamente.");
    }
  });
}
