// DOM Elements
const ticketForm = document.getElementById("ticketForm");
const startStation = document.getElementById("startStation");
const endStation = document.getElementById("endStation");
const paymentMethod = document.getElementById("paymentMethod");
const routeInfo = document.getElementById("routeInfo");
const routeDisplay = document.getElementById("routeDisplay");
const priceDisplay = document.getElementById("priceDisplay");
const capacityDisplay = document.getElementById("capacityDisplay");
const capacityFill = document.getElementById("capacityFill");
const capacityStatus = document.getElementById("capacityStatus");
const buyBtn = document.getElementById("buyBtn");
const cancelBtn = document.getElementById("cancelBtn");
const successModal = document.getElementById("successModal");
const modalText = document.getElementById("modalText");
const modalBtn = document.getElementById("modalBtn");

// Station data
const stations = {
  jakarta: "Jakarta Pusat",
  bandung: "Bandung",
  surabaya: "Surabaya",
  yogyakarta: "Yogyakarta",
  semarang: "Semarang",
  solo: "Solo",
};

// Price calculation
const basePrices = {
  "jakarta-bandung": 75000,
  "jakarta-surabaya": 150000,
  "jakarta-yogyakarta": 125000,
  "jakarta-semarang": 100000,
  "jakarta-solo": 110000,
  "bandung-surabaya": 200000,
  "bandung-yogyakarta": 100000,
  "bandung-semarang": 125000,
  "bandung-solo": 135000,
  "surabaya-yogyakarta": 100000,
  "surabaya-semarang": 75000,
  "surabaya-solo": 85000,
  "yogyakarta-semarang": 50000,
  "yogyakarta-solo": 25000,
  "semarang-solo": 35000,
};

// Capacity simulation data
let currentCapacity = {
  used: 40,
  total: 100,
};

function getRouteKey(start, end) {
  if (start === end) return null;
  return [start, end].sort().join("-");
}

function formatPrice(price) {
  return `Rp ${price.toLocaleString("id-ID")},-`;
}

function updateRouteInfo() {
  const start = startStation.value;
  const end = endStation.value;

  if (start && end && start !== end) {
    const routeKey = getRouteKey(start, end);
    const price = basePrices[routeKey] || 50000;

    routeDisplay.textContent = `${stations[start]} → ${stations[end]}`;
    priceDisplay.textContent = formatPrice(price);
    routeInfo.style.display = "block";

    // Simulate different capacities for different routes
    const capacities = [30, 40, 55, 70, 85];
    const randomCapacity = capacities[Math.floor(Math.random() * capacities.length)];
    updateCapacity(randomCapacity, 100);

    return { start, end, price };
  } else {
    routeInfo.style.display = "none";
    return null;
  }
}

function updateCapacity(used, total) {
  currentCapacity = { used, total };
  const percentage = Math.round((used / total) * 100);
  const available = total - used;

  capacityDisplay.textContent = `${used}/${total}`;
  capacityFill.style.width = `${percentage}%`;
  capacityStatus.textContent = `${percentage}% filled • ${available} seats available`;

  // Update capacity fill color based on availability
  if (percentage >= 90) {
    capacityFill.style.background = "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)";
  } else if (percentage >= 70) {
    capacityFill.style.background = "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)";
  } else {
    capacityFill.style.background = "linear-gradient(90deg, #10b981 0%, #059669 100%)";
  }

  // Disable buy button if full
  if (used >= total) {
    buyBtn.disabled = true;
    buyBtn.querySelector(".btn-text").textContent = "SOLD OUT";
  } else {
    buyBtn.disabled = false;
    buyBtn.querySelector(".btn-text").textContent = "BUY";
  }
}

function validateForm() {
  const start = startStation.value;
  const end = endStation.value;
  const payment = paymentMethod.value;

  if (!start) {
    alert("Please select start station");
    startStation.focus();
    return false;
  }

  if (!end) {
    alert("Please select end station");
    endStation.focus();
    return false;
  }

  if (start === end) {
    alert("Start and end stations cannot be the same");
    endStation.focus();
    return false;
  }

  if (!payment) {
    alert("Please select payment method");
    paymentMethod.focus();
    return false;
  }

  if (currentCapacity.used >= currentCapacity.total) {
    alert("Sorry, this route is fully booked");
    return false;
  }

  return true;
}

function showLoading() {
  buyBtn.disabled = true;
  buyBtn.querySelector(".btn-text").style.display = "none";
  buyBtn.querySelector(".loading").style.display = "block";
}

function hideLoading() {
  buyBtn.disabled = false;
  buyBtn.querySelector(".btn-text").style.display = "block";
  buyBtn.querySelector(".loading").style.display = "none";
}

function showSuccessModal(routeData) {
  const paymentText = paymentMethod.options[paymentMethod.selectedIndex].text;
  modalText.innerHTML = `
                Your ticket from <strong>${stations[routeData.start]}</strong> to <strong>${stations[routeData.end]}</strong> has been successfully purchased!<br><br>
                <strong>Total: ${formatPrice(routeData.price)}</strong><br>
                <strong>Payment: ${paymentText}</strong>
            `;
  successModal.style.display = "block";
}

// Event listeners
startStation.addEventListener("change", updateRouteInfo);
endStation.addEventListener("change", updateRouteInfo);

ticketForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    const routeData = updateRouteInfo();

    showLoading();

    // Simulate purchase process
    setTimeout(() => {
      hideLoading();

      // Update capacity (simulate one less seat)
      updateCapacity(currentCapacity.used + 1, currentCapacity.total);

      // Show success modal
      showSuccessModal(routeData);
    }, 2000);
  }
});

cancelBtn.addEventListener("click", function () {
  if (confirm("Are you sure you want to cancel?")) {
    ticketForm.reset();
    routeInfo.style.display = "none";
    updateCapacity(40, 100); // Reset to default
  }
});

modalBtn.addEventListener("click", function () {
  successModal.style.display = "none";
  ticketForm.reset();
  routeInfo.style.display = "none";
  updateCapacity(40, 100); // Reset to default
});

// Close modal when clicking outside
successModal.addEventListener("click", function (e) {
  if (e.target === successModal) {
    successModal.style.display = "none";
    ticketForm.reset();
    routeInfo.style.display = "none";
    updateCapacity(40, 100);
  }
});

// Add hover effects to selects
const selects = document.querySelectorAll("select");
selects.forEach((select) => {
  select.addEventListener("focus", function () {
    this.parentElement.style.transform = "scale(1.02)";
  });

  select.addEventListener("blur", function () {
    this.parentElement.style.transform = "scale(1)";
  });
});

// Initialize capacity
updateCapacity(40, 100);
