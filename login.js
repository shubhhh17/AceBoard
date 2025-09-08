document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const togglePassword = document.getElementById("toggle-password");
  const passwordInput = document.getElementById("password");
  const googleLoginBtn = document.getElementById("google-login");

  // Show/hide password toggle
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.textContent = type === "password" ? "\u{1F441}" : "\u{1F576}"; // 👁️ / 🕶️
  });

  // Form submission and validation
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();

    if (!email) {
      alert("Please enter your email.");
      loginForm.email.focus();
      return;
    }
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      loginForm.email.focus();
      return;
    }
    if (!password) {
      alert("Please enter your password.");
      loginForm.password.focus();
      return;
    }

    // TODO: add actual login API call or logic here

    // For demonstration, redirect to dashboard page on success
    alert("Login successful! Redirecting...");
    window.location.href = "aceboard.html";
  });

  // Google login button stub
  googleLoginBtn.addEventListener("click", function () {
    alert("Google login is not implemented yet.");
  });

  // Email validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
});
