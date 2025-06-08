// Station mapping (same as previous page)
const stations = {
  jakarta: "Jakarta Pusat",
  bandung: "Bandung",
  surabaya: "Surabaya",
  yogyakarta: "Yogyakarta",
  semarang: "Semarang",
  solo: "Solo",
};

// Payment method mapping
const paymentMethods = {
  credit: "Credit Card",
  debit: "Debit Card",
  gopay: "GoPay",
  ovo: "OVO",
  dana: "DANA",
  bank: "Bank Transfer",
};

// Function to get URL parameters
function getUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    start: urlParams.get("start") || "jakarta",
    end: urlParams.get("end") || "bandung",
    price: urlParams.get("price") || "75000",
    payment: urlParams.get("payment") || "credit",
  };
}

// Function to format price
function formatPrice(price) {
  return `Rp ${parseInt(price).toLocaleString("id-ID")},-`;
}

// Function to get current date and time
function getCurrentDateTime() {
  const now = new Date();
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const date = now.toLocaleDateString("en-GB", options).replace(/ /g, "/").toUpperCase();
  const time = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return { date, time };
}

// Function to populate ticket data
function populateTicketData() {
  const params = getUrlParams();
  const { date, time } = getCurrentDateTime();

  // Update route display
  const routeText = `Route: ${stations[params.start]} → ${stations[params.end]}`;
  const priceText = `Price: ${formatPrice(params.price)}`;

  document.getElementById("routeDisplay").textContent = routeText;
  document.getElementById("priceDisplay").textContent = priceText;

  // Update ticket details
  document.getElementById("fromStation").textContent = stations[params.start];
  document.getElementById("toStation").textContent = stations[params.end];
  document.getElementById("ticketDate").textContent = date;
  document.getElementById("ticketTime").textContent = time;
  document.getElementById("paymentMethod").textContent = paymentMethods[params.payment];
}

// Function to simulate data from previous form (for demo purposes)
function simulateFormData() {
  // This simulates data that would normally come from the previous page
  const mockData = {
    start: "jakarta",
    end: "bandung",
    price: "75000",
    payment: "credit",
  };

  // If no URL params, use mock data
  const params = getUrlParams();
  if (!new URLSearchParams(window.location.search).has("start")) {
    // Update URL with mock data (for demo)
    const newUrl = `?start=${mockData.start}&end=${mockData.end}&price=${mockData.price}&payment=${mockData.payment}`;
    window.history.replaceState({}, "", newUrl);
  }
}

// Event listeners
document.getElementById("checkTicketBtn").addEventListener("click", function () {
  alert("Fitur cek tiket akan diarahkan ke halaman verifikasi tiket");
});

document.getElementById("backBtn").addEventListener("click", function () {
  // In real implementation, this would go back to the booking form
  if (confirm("Kembali ke halaman pemesanan?")) {
    window.history.back();
  }
});

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  simulateFormData();
  populateTicketData();
});

// Print functionality
document.addEventListener("keydown", function (e) {
  if (e.ctrlKey && e.key === "p") {
    e.preventDefault();
    window.print();
  }
});
