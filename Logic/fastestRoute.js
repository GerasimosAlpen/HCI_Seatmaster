document.addEventListener("DOMContentLoaded", function () {
  // Tombol Buy Ticket
  const buyBtn = document.querySelector(".buy-btn");
  buyBtn.addEventListener("click", function () {
    alert("Tiket berhasil dibeli!");
  });

  // Validasi pilihan stasiun
  const form = document.querySelector(".route-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    if (start === "Stasiun" || end === "Stasiun") {
      alert("Silakan pilih stasiun awal dan akhir.");
    } else if (start === end) {
      alert("Stasiun awal dan akhir tidak boleh sama.");
    } else {
      alert(`Mencari rute tercepat dari ${start} ke ${end}...`);
    }
  });
});
