import { listCases } from "../api/cases.js";

const statusFilter = document.getElementById("status-filter");
const searchInput = document.getElementById("search-input");
const tableContainer = document.getElementById("case-table-container");

async function loadCases() {
  try {
    const params = {};
    if (statusFilter.value) params.status = statusFilter.value;
    if (searchInput.value) params.search = searchInput.value;

    const cases = await listCases(params);
    renderCaseTable(cases);
    updateStats(cases);
  } catch (err) {
    tableContainer.innerHTML = `<p class="help-text">Could not load cases. Is the API running?</p>`;
    console.error(err);
  }
}

function renderCaseTable(cases) {
  if (!cases || cases.length === 0) {
    tableContainer.innerHTML = '<p class="help-text">No cases found.</p>';
    return;
  }

  const table = document.createElement("table");
  table.className = "data-table";
  table.innerHTML = `
    <thead>
      <tr>
        <th>Code</th>
        <th>Name</th>
        <th>Nationality</th>
        <th>Status</th>
        <th>Score</th>
      </tr>
    </thead>
  `;

  const tbody = document.createElement("tbody");
  for (const c of cases) {
    const tr = document.createElement("tr");
    tr.onclick = () => window.location.href = `case-detail.html?id=${c.case_id}`;
    tr.innerHTML = `
      <td>${c.case_code || "—"}</td>
      <td>${c.person?.name || "—"}</td>
      <td>${c.person?.nationality || "—"}</td>
      <td><span class="badge badge-${c.status}">${(c.status || "").replace(/_/g, " ")}</span></td>
      <td>${c.latest_score?.predicted_score != null ? Math.round(c.latest_score.predicted_score) : "—"}</td>
    `;
    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

function updateStats(cases) {
  document.getElementById("total-cases").textContent = cases.length;
  document.getElementById("pending-review").textContent = cases.filter(c => c.status === "under_review").length;
  const scores = cases.map(c => c.latest_score?.predicted_score).filter(s => s != null);
  document.getElementById("avg-score").textContent = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : "—";
  document.getElementById("verified-count").textContent = cases.filter(c => c.status === "verified_identity").length;
}

// Event listeners
statusFilter.addEventListener("change", loadCases);
searchInput.addEventListener("input", loadCases);

// Initial load
loadCases();
