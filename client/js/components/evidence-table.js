/**
 * Evidence table component — renders evidence items with trust class badges.
 * Evidence classes: official, corroborated, self_declared
 * @param {Array} evidenceList
 * @param {HTMLElement} container
 */
export function renderEvidenceTable(evidenceList, container) {
  if (!evidenceList || evidenceList.length === 0) {
    container.innerHTML = '<p class="help-text">No evidence submitted yet.</p>';
    return;
  }

  const table = document.createElement("table");
  table.className = "data-table";

  table.innerHTML = `
    <thead>
      <tr>
        <th>Type</th>
        <th>Class</th>
        <th>Source</th>
        <th>Status</th>
        <th>Added</th>
      </tr>
    </thead>
  `;

  const tbody = document.createElement("tbody");
  for (const ev of evidenceList) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${ev.evidence_type || "—"}</td>
      <td><span class="badge badge-${ev.trust_class || "self_declared"}">${(ev.trust_class || "self_declared").replace(/_/g, " ")}</span></td>
      <td>${ev.source || "—"}</td>
      <td>${ev.review_status || "pending"}</td>
      <td>${ev.created_at ? new Date(ev.created_at).toLocaleDateString() : "—"}</td>
    `;
    tbody.appendChild(tr);
  }

  table.appendChild(tbody);
  container.innerHTML = "";
  container.appendChild(table);
}
