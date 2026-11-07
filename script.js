// Número de WhatsApp en formato internacional, sin espacios ni signos.
const WHATSAPP_NUMBER = "5215583072029";

// Cuenta regresiva para el 24 de abril de 2027 a las 17:30, hora de Pachuca.
const weddingDate = new Date("2027-04-24T17:30:00-06:00");

function updateCountdown() {
  const distance = weddingDate.getTime() - Date.now();
  const safeDistance = Math.max(0, distance);
  const days = Math.floor(safeDistance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((safeDistance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((safeDistance / (1000 * 60)) % 60);
  const seconds = Math.floor((safeDistance / 1000) % 60);

  document.getElementById("days").textContent = String(days).padStart(3, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Menú móvil.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Confirmación: WhatsApp se abre con el mensaje listo para enviar.
// WhatsApp requiere que el usuario pulse "Enviar"; la web no envía mensajes por sí sola.
document.getElementById("rsvp-form").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("guest-name").value.trim();
  const attendance = document.getElementById("attendance").value;
  const tickets = document.getElementById("tickets").value;
  const feedback = document.getElementById("form-feedback");

  if (!name) {
    feedback.textContent = "Por favor, escribe tu nombre para continuar.";
    return;
  }

  const ticketText = attendance.startsWith("Sí") ? `${tickets} ${tickets === "1" ? "boleto" : "boletos"}` : "No aplica";
  const message = [
    "¡Hola! Confirmo mi asistencia a la boda de Nayeli y Christian.",
    "",
    `Nombre: ${name}`,
    `Confirmación: ${attendance}`,
    `Número de boletos: ${ticketText}`,
    "",
    "24 de abril de 2027"
  ].join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  feedback.textContent = "Abriendo WhatsApp para enviar tu confirmación...";
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});
