// Handle login form
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    alert("Logged in successfully with email: " + email);
    // Replace this with actual authentication API call
  }
});

// Handle Google login button
document.querySelector(".google-btn").addEventListener("click", function() {
  alert("Google Login Clicked (Integrate Google OAuth here)");
});
