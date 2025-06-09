// DOM Elements
const registerForm = document.getElementById("registerForm");
const userIdInput = document.getElementById("userId");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const passwordToggle = document.getElementById("passwordToggle");
const confirmPasswordToggle = document.getElementById("confirmPasswordToggle");
const registerBtn = document.getElementById("registerBtn");
const successMessage = document.getElementById("successMessage");
const loginLink = document.getElementById("loginLink");

// Error and success message elements
const userIdError = document.getElementById("userIdError");
const userIdSuccess = document.getElementById("userIdSuccess");
const emailError = document.getElementById("emailError");
const emailSuccess = document.getElementById("emailSuccess");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const confirmPasswordSuccess = document.getElementById("confirmPasswordSuccess");

// Password strength elements
const strengthBar = document.getElementById("strengthBar");
const reqLength = document.getElementById("reqLength");
const reqUpper = document.getElementById("reqUpper");
const reqLower = document.getElementById("reqLower");
const reqNumber = document.getElementById("reqNumber");

// Password toggle functionality
passwordToggle.addEventListener("click", function () {
  const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  passwordToggle.textContent = type === "password" ? "👁️" : "🙈";
});

confirmPasswordToggle.addEventListener("click", function () {
  const type = confirmPasswordInput.getAttribute("type") === "password" ? "text" : "password";
  confirmPasswordInput.setAttribute("type", type);
  confirmPasswordToggle.textContent = type === "password" ? "👁️" : "🙈";
});

// Validation functions
function validateUserId(userId) {
  const regex = /^[a-zA-Z0-9_]{3,}$/;
  return regex.test(userId.trim());
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  const requirements = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  return requirements;
}

function getPasswordStrength(password) {
  const requirements = validatePassword(password);
  const score = Object.values(requirements).filter((req) => req).length;

  if (score === 0) return { strength: "", score: 0 };
  if (score === 1) return { strength: "weak", score: 1 };
  if (score === 2) return { strength: "fair", score: 2 };
  if (score === 3) return { strength: "good", score: 3 };
  return { strength: "strong", score: 4 };
}

function showError(input, errorElement, message) {
  input.classList.remove("success");
  input.classList.add("error");
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

function showSuccess(input, successElement) {
  input.classList.remove("error");
  input.classList.add("success");
  if (successElement) {
    successElement.style.display = "block";
  }
}

function hideMessages(input, errorElement, successElement) {
  input.classList.remove("error", "success");
  if (errorElement) errorElement.style.display = "none";
  if (successElement) successElement.style.display = "none";
}

// Real-time validation
userIdInput.addEventListener("input", function () {
  const userId = this.value;
  hideMessages(this, userIdError, userIdSuccess);

  if (userId.length === 0) return;

  if (validateUserId(userId)) {
    showSuccess(this, userIdSuccess);
  } else {
    showError(this, userIdError, "ID harus minimal 3 karakter dan hanya boleh huruf, angka, underscore");
  }
});

emailInput.addEventListener("input", function () {
  const email = this.value;
  hideMessages(this, emailError, emailSuccess);

  if (email.length === 0) return;

  if (validateEmail(email)) {
    showSuccess(this, emailSuccess);
  } else {
    showError(this, emailError, "Format email tidak valid");
  }
});

passwordInput.addEventListener("input", function () {
  const password = this.value;
  const requirements = validatePassword(password);
  const strength = getPasswordStrength(password);

  // Update password strength bar
  strengthBar.className = "password-strength-bar";
  if (strength.strength) {
    strengthBar.classList.add(`strength-${strength.strength}`);
  }

  // Update requirements
  reqLength.classList.toggle("met", requirements.length);
  reqUpper.classList.toggle("met", requirements.upper);
  reqLower.classList.toggle("met", requirements.lower);
  reqNumber.classList.toggle("met", requirements.number);

  // Validate confirm password if it has value
  if (confirmPasswordInput.value) {
    validateConfirmPassword();
  }
});

function validateConfirmPassword() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  hideMessages(confirmPasswordInput, confirmPasswordError, confirmPasswordSuccess);

  if (confirmPassword.length === 0) return;

  if (password === confirmPassword) {
    showSuccess(confirmPasswordInput, confirmPasswordSuccess);
  } else {
    showError(confirmPasswordInput, confirmPasswordError, "Password tidak cocok");
  }
}

confirmPasswordInput.addEventListener("input", validateConfirmPassword);

// Form validation
function validateForm() {
  let isValid = true;
  const userId = userIdInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Clear all previous errors
  hideMessages(userIdInput, userIdError, userIdSuccess);
  hideMessages(emailInput, emailError, emailSuccess);
  hideMessages(passwordInput, passwordError, null);
  hideMessages(confirmPasswordInput, confirmPasswordError, confirmPasswordSuccess);

  // Validate User ID
  if (userId === "") {
    showError(userIdInput, userIdError, "ID tidak boleh kosong");
    isValid = false;
  } else if (userId.length < 3) {
    showError(userIdInput, userIdError, "ID minimal 3 karakter");
    isValid = false;
  } else if (!/^[a-zA-Z0-9_]+$/.test(userId)) {
    showError(userIdInput, userIdError, "ID hanya boleh huruf, angka, dan underscore");
    isValid = false;
  } else {
    showSuccess(userIdInput, userIdSuccess);
  }

  // Validate Email
  if (email === "") {
    showError(emailInput, emailError, "Email tidak boleh kosong");
    isValid = false;
  } else if (!validateEmail(email)) {
    showError(emailInput, emailError, "Format email tidak valid (contoh: user@domain.com)");
    isValid = false;
  } else {
    showSuccess(emailInput, emailSuccess);
  }

  // Validate Password
  if (password === "") {
    showError(passwordInput, passwordError, "Password tidak boleh kosong");
    isValid = false;
  } else {
    const requirements = validatePassword(password);
    const allRequirementsMet = Object.values(requirements).every((req) => req);

    if (!requirements.length) {
      showError(passwordInput, passwordError, "Password minimal 8 karakter");
      isValid = false;
    } else if (!requirements.upper) {
      showError(passwordInput, passwordError, "Password harus ada huruf besar");
      isValid = false;
    } else if (!requirements.lower) {
      showError(passwordInput, passwordError, "Password harus ada huruf kecil");
      isValid = false;
    } else if (!requirements.number) {
      showError(passwordInput, passwordError, "Password harus ada angka");
      isValid = false;
    }
  }

  // Validate Confirm Password
  if (confirmPassword === "") {
    showError(confirmPasswordInput, confirmPasswordError, "Konfirmasi password tidak boleh kosong");
    isValid = false;
  } else if (password !== confirmPassword) {
    showError(confirmPasswordInput, confirmPasswordError, "Password tidak cocok");
    isValid = false;
  } else if (password === confirmPassword && password !== "") {
    showSuccess(confirmPasswordInput, confirmPasswordSuccess);
  }

  return isValid;
}

// Form submission with detailed validation
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log("Form submitted - validating...");

  if (validateForm()) {
    console.log("Validation passed - processing registration...");

    // Disable button and show loading state
    registerBtn.disabled = true;
    registerBtn.textContent = "REGISTERING...";

    // Show what data would be sent
    const formData = {
      userId: userIdInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value,
    };
    console.log("Registration data:", formData);

    // Simulate registration process
    setTimeout(() => {
      // Show success message
      successMessage.style.display = "block";
      registerForm.style.display = "none";

      console.log("Registration successful!");

      // Simulate redirect after 3 seconds
      setTimeout(() => {
        // Reset form (in real app, this would redirect to login)
        registerForm.style.display = "block";
        successMessage.style.display = "none";
        registerBtn.disabled = false;
        registerBtn.textContent = "REGISTER";
        registerForm.reset();

        // Reset all visual states
        const inputs = document.querySelectorAll("input");
        inputs.forEach((input) => {
          input.classList.remove("error", "success");
        });

        // Hide all messages
        document.querySelectorAll(".error-message, .success-message-inline").forEach((msg) => {
          msg.style.display = "none";
        });

        // Reset password strength
        strengthBar.className = "password-strength-bar";
        reqLength.classList.remove("met");
        reqUpper.classList.remove("met");
        reqLower.classList.remove("met");
        reqNumber.classList.remove("met");

        alert("Dalam aplikasi nyata, Anda akan diarahkan ke halaman login");
      }, 3000);
    }, 1500);
  } else {
    console.log("Validation failed - please check the form");

    // Scroll to first error
    const firstError = document.querySelector("input.error");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      firstError.focus();
    }
  }
});

// Add interactive effects
const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "scale(1.02)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "scale(1)";
  });
});
