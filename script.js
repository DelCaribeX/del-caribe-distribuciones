const WHATSAPP_NUMBER = "";

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const toast = document.querySelector("[data-toast]");
const quoteForm = document.querySelector("#quote-form");
const requestDialog = document.querySelector("#request-dialog");
const requestMessage = document.querySelector("#request-message");
const whatsappLink = document.querySelector("[data-whatsapp-link]");
const packageField = document.querySelector("#package-field");
const detailsField = document.querySelector("#details-field");
let toastTimer;

function updateHeader() {
  if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (menuToggle && menu) {
  menuToggle.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

function showToast(message) {
  if (!toast) return;
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(function () {
    toast.classList.remove("is-visible");
  }, 2800);
}

let revealObserver = null;
if ("IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px" });
}

document.querySelectorAll(".reveal").forEach(function (element) {
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add("revealed");
});

document.querySelectorAll("[data-filter]").forEach(function (button) {
  button.addEventListener("click", function () {
    const selected = button.dataset.filter;

    document.querySelectorAll("[data-filter]").forEach(function (item) {
      item.classList.toggle("is-active", item === button);
    });

    document.querySelectorAll("[data-category]").forEach(function (card) {
      const categories = card.dataset.category.split(" ");
      const shouldHide = selected !== "todos" && !categories.includes(selected);
      card.classList.toggle("is-hidden", shouldHide);
    });
  });
});

function appendProduct(product) {
  const current = detailsField.value.trim();
  const alreadyAdded = current.toLowerCase().includes(product.toLowerCase());

  if (!alreadyAdded) {
    detailsField.value = current ? current + ", " + product : product;
    showToast(product + " añadido a tu solicitud");
  } else {
    showToast(product + " ya está en tu solicitud");
  }
}

document.querySelectorAll("[data-product]").forEach(function (button) {
  button.addEventListener("click", function () {
    appendProduct(button.dataset.product);
    const target = document.querySelector("#cotizar");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-package]").forEach(function (button) {
  button.addEventListener("click", function () {
    packageField.value = button.dataset.package;
    const target = document.querySelector("#cotizar");
    if (target) target.scrollIntoView({ behavior: "smooth" });
    showToast(button.dataset.package + " seleccionado");
  });
});

function formatDate(value) {
  if (!value) return "Por definir";
  const parts = value.split("-").map(Number);
  return new Intl.DateTimeFormat("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(parts[0], parts[1] - 1, parts[2]));
}

if (quoteForm) {
  quoteForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;

    const data = Object.fromEntries(new FormData(quoteForm).entries());
    const lines = [
      "Hola, Del Caribe Distribuciones. Quisiera solicitar una cotización.",
      "",
      "Nombre: " + data.nombre,
      "Empresa o salón: " + (data.empresa || "No aplica"),
      "Tipo de evento: " + data.evento,
      "Fecha: " + formatDate(data.fecha),
      "Invitados: " + (data.invitados || "Por definir"),
      "Paquete: " + (data.paquete || "Quiero asesoría"),
      "Productos o detalles: " + (data.detalles || "Quiero conocer las opciones disponibles.")
    ];

    const message = lines.join("\n");
    requestMessage.value = message;

    const destination = WHATSAPP_NUMBER
      ? "https://wa.me/" + WHATSAPP_NUMBER
      : "https://wa.me/";

    whatsappLink.href = destination + "?text=" + encodeURIComponent(message);
    requestDialog.showModal();
  });
}

const dialogClose = document.querySelector("[data-dialog-close]");
if (dialogClose) {
  dialogClose.addEventListener("click", function () {
    requestDialog.close();
  });
}

if (requestDialog) {
  requestDialog.addEventListener("click", function (event) {
    if (event.target === requestDialog) requestDialog.close();
  });
}

const copyButton = document.querySelector("[data-copy-message]");
if (copyButton) {
  copyButton.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(requestMessage.value);
      showToast("Mensaje copiado");
    } catch (error) {
      requestMessage.select();
      document.execCommand("copy");
      showToast("Mensaje copiado");
    }
  });
}

const yearField = document.querySelector("[data-year]");
if (yearField) yearField.textContent = new Date().getFullYear();

const ageDialog = document.querySelector("#age-dialog");
let ageConfirmed = false;

try {
  ageConfirmed = window.sessionStorage.getItem("delcaribe-age-confirmed") === "true";
} catch (error) {
  ageConfirmed = false;
}

if (ageDialog && !ageConfirmed) ageDialog.showModal();

const ageYes = document.querySelector("[data-age-yes]");
if (ageYes) {
  ageYes.addEventListener("click", function () {
    try {
      window.sessionStorage.setItem("delcaribe-age-confirmed", "true");
    } catch (error) {
      /* The site still works when browser storage is unavailable. */
    }
    ageDialog.close();
  });
}

const ageNo = document.querySelector("[data-age-no]");
if (ageNo) {
  ageNo.addEventListener("click", function () {
    document.querySelector("[data-age-denied]").hidden = false;
    ageYes.hidden = true;
    ageNo.hidden = true;
  });
}

