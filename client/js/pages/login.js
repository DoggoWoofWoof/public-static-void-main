import { apiPost } from "../api/client.js";
import { requireGuest } from "../utils/guards.js";

requireGuest();

const form = document.getElementById("login-form");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  try {
    const data = await apiPost("/auth/login", { email, password });
    localStorage.setItem("bb_token", data.access_token);
    localStorage.setItem("bb_role", role);
    if (data.case_id) localStorage.setItem("bb_case_id", data.case_id);

    // Redirect by role
    switch (role) {
      case "authority": window.location.href = "authority-dashboard.html"; break;
      case "refugee":   window.location.href = "refugee-portal.html"; break;
      case "partner":   window.location.href = "partner-dashboard.html"; break;
      default:          window.location.href = "authority-dashboard.html";
    }
  } catch (err) {
    alert("Login failed: " + err.message);
  }
});
