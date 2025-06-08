// DOM Elements
const loginForm = document.getElementById("loginForm");
const userIdInput = document.getElementById("userId");
const passwordInput = document.getElementById("password");
const passwordToggle = document.getElementById("passwordToggle");
const loginBtn = document.getElementById("loginBtn");
const successMessage = document.getElementById("successMessage");
const registerLink = document.getElementById("registerLink");

// Error message elements
const userIdError = document.getElementById("userIdError");
const passwordError = document.getElementById("passwordError");

// Password toggle functionality
passwordToggle.addEventListener("click", function () {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  passwordToggle.textContent = type === "password" ? "👁️" : "🙈";
});

// Validation functions
function validateUserId(userId) {
  return userId.trim().length > 0;
}

function validatePassword(password) {
  return password.length >= 6;
}

function showError(input, errorElement, message) {
  input.classList.add("error");
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

function hideError(input, errorElement) {
  input.classList.remove("error");
  errorElement.style.display = "none";
}

function validateForm() {
  let isValid = true;
  const userId = userIdInput.value;
  const password = passwordInput.value;

  // Reset previous errors
  hideError(userIdInput, userIdError);
  hideError(passwordInput, passwordError);

  // Validate User ID
  if (!validateUserId(userId)) {
    showError(userIdInput, userIdError, "ID tidak boleh kosong");
    isValid = false;
  }

  // Validate Password
  if (!validatePassword(password)) {
    showError(passwordInput, passwordError, "Password minimal 6 karakter");
    isValid = false;
  }

  return isValid;
}

// Real-time validation
userIdInput.addEventListener("input", function () {
  if (validateUserId(this.value)) {
    hideError(this, userIdError);
  }
});

passwordInput.addEventListener("input", function () {
  if (validatePassword(this.value)) {
    hideError(this, passwordError);
  }
});

// Form submission
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validateForm()) {
    // Disable button and show loading state
    loginBtn.disabled = true;
    loginBtn.textContent = "LOGGING IN...";

    // Simulate login process
    setTimeout(() => {
      // Show success message
      successMessage.style.display = "block";
      loginForm.style.display = "none";

      // Simulate redirect after 2 seconds
      setTimeout(() => {
        // Reset form (in real app, this would redirect)
        loginForm.style.display = "block";
        successMessage.style.display = "none";
        loginBtn.disabled = false;
        loginBtn.textContent = "LOGIN";
        loginForm.reset();
        alert("Dalam aplikasi nyata, Anda akan diarahkan ke dashboard");
      }, 2000);
    }, 1000);
  }
});
// Add some interactive effects
const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "scale(1.02)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "scale(1)";
  });
});
