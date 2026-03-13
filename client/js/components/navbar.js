/**
 * Navbar component — renders top navigation bar.
 * @param {HTMLElement} root - container element
 * @param {string} [activeRole] - highlight links for this role
 */
export function renderNavbar(root, activeRole = "") {
  const nav = document.createElement("nav");
  nav.className = "navbar";

  const isSubpage = window.location.pathname.includes("/pages/");
  const prefix = isSubpage ? "../" : "";
  const pagesPrefix = isSubpage ? "" : "pages/";

  nav.innerHTML = `
    <a href="${prefix}index.html" class="navbar-brand">BorderBridge</a>
    <ul class="navbar-links">
      <li><a href="${pagesPrefix}authority-dashboard.html" class="${activeRole === 'authority' ? 'active' : ''}">Authority</a></li>
      <li><a href="${pagesPrefix}refugee-portal.html" class="${activeRole === 'refugee' ? 'active' : ''}">Refugee Portal</a></li>
      <li><a href="${pagesPrefix}partner-dashboard.html" class="${activeRole === 'partner' ? 'active' : ''}">Partners</a></li>
      <li><a href="${pagesPrefix}login.html">Sign In</a></li>
    </ul>
  `;

  root.appendChild(nav);
}
