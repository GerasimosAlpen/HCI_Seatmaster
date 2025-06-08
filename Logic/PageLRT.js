// Alert saat tombol GO! ditekan
document.addEventListener("DOMContentLoaded", function () {
  const goBtn = document.querySelector(".go-btn");
  if (goBtn) {
    goBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const start = document.getElementById("start").value;
      const end = document.getElementById("end").value;
      if (start === "Stasiun" || end === "Stasiun") {
        alert("Silakan pilih stasiun awal dan akhir.");
      } else {
        alert(`Mencari rute tercepat dari ${start} ke ${end}...`);
      }
    });
  }

  // Alert saat Contact Us diklik
  const contact = document.querySelector(".contact-us");
  if (contact) {
    contact.addEventListener("click", function () {
      alert("Hubungi kami di: support@seatmaster.com");
    });
  }

  // Highlight kartu tiket saat diklik
  const cards = document.querySelectorAll(".ticket-card");
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      cards.forEach((c) => c.classList.remove("active-ticket"));
      card.classList.add("active-ticket");
    });
  });
});
