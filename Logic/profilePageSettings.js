document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".settings-btn").forEach((btn) => {
    btn.onclick = () => alert("Fitur belum tersedia.");
  });
  document.querySelectorAll(".danger-btn").forEach((btn) => {
    btn.onclick = () => alert("Fitur belum tersedia.");
  });
});
