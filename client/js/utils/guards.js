/**
 * Auth guards — simple redirect helpers.
 */

export function requireAuth() {
  const token = localStorage.getItem("bb_token");
  if (!token) {
    window.location.href = window.location.pathname.includes("/pages/")
      ? "login.html"
      : "pages/login.html";
  }
}

export function requireRole(role) {
  requireAuth();
  const currentRole = localStorage.getItem("bb_role");
  if (currentRole !== role) {
    alert(`Access denied. This page requires the "${role}" role.`);
    window.history.back();
  }
}

export function requireGuest() {
  const token = localStorage.getItem("bb_token");
  const role = localStorage.getItem("bb_role");
  if (token && role) {
    switch (role) {
      case "authority": window.location.href = "authority-dashboard.html"; break;
      case "refugee":   window.location.href = "refugee-portal.html"; break;
      case "partner":   window.location.href = "partner-dashboard.html"; break;
    }
  }
}

export function logout() {
  localStorage.removeItem("bb_token");
  localStorage.removeItem("bb_role");
  localStorage.removeItem("bb_case_id");
  window.location.href = window.location.pathname.includes("/pages/")
    ? "login.html"
    : "pages/login.html";
}
