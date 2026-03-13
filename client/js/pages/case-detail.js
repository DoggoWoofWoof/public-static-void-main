import { getCase } from "../api/cases.js";
import { listEvidence } from "../api/evidence.js";
import { getLatestScore, recomputeScore } from "../api/score.js";
import { renderScoreBadge } from "../components/score-badge.js";
import { renderEvidenceTable } from "../components/evidence-table.js";
import { renderGraphView } from "../components/graph-view.js";

const params = new URLSearchParams(window.location.search);
const caseId = params.get("id");

async function loadCaseDetail() {
  if (!caseId) {
    document.getElementById("case-code").textContent = "No case ID provided";
    return;
  }

  try {
    const [caseData, evidence, scoreData] = await Promise.all([
      getCase(caseId),
      listEvidence(caseId),
      getLatestScore(caseId).catch(() => null),
    ]);

    // Header
    document.getElementById("case-code").textContent = caseData.case_code || caseId;
    const statusEl = document.getElementById("case-status");
    statusEl.textContent = (caseData.status || "").replace(/_/g, " ");
    statusEl.className = `badge badge-${caseData.status}`;

    // Person info
    const person = caseData.person || {};
    document.getElementById("person-grid").innerHTML = `
      <div class="detail-item"><span class="detail-label">Name</span><span class="detail-value">${person.name || "—"}</span></div>
      <div class="detail-item"><span class="detail-label">Nationality</span><span class="detail-value">${person.nationality || "—"}</span></div>
      <div class="detail-item"><span class="detail-label">Language</span><span class="detail-value">${person.language || "—"}</span></div>
      <div class="detail-item"><span class="detail-label">Date of Birth</span><span class="detail-value">${person.date_of_birth || "—"}</span></div>
    `;

    // Score badge
    if (scoreData) {
      document.getElementById("score-badge-container").appendChild(renderScoreBadge(scoreData));
      renderScoreExplanation(scoreData);
    }

    // Evidence table
    renderEvidenceTable(evidence, document.getElementById("evidence-table-container"));

    // Graph (simple from evidence + person data)
    const graphData = buildGraphFromEvidence(caseData, evidence);
    renderGraphView(graphData, document.getElementById("graph-container"));

  } catch (err) {
    document.getElementById("case-code").textContent = "Error loading case";
    console.error(err);
  }
}

function renderScoreExplanation(scoreData) {
  const container = document.getElementById("score-detail-container");
  container.innerHTML = "";

  // Top factors
  if (scoreData.top_factors && scoreData.top_factors.length > 0) {
    for (const factor of scoreData.top_factors) {
      const div = document.createElement("div");
      div.className = "score-factor";
      const sign = factor.impact > 0 ? "positive" : factor.impact < 0 ? "negative" : "neutral";
      div.innerHTML = `
        <span class="factor-label">${factor.name}</span>
        <span class="factor-value factor-${sign}">${factor.impact > 0 ? "+" : ""}${factor.impact}</span>
      `;
      container.appendChild(div);
    }
  }

  // Blocking constraints
  if (scoreData.blocking_constraints && scoreData.blocking_constraints.length > 0) {
    for (const bc of scoreData.blocking_constraints) {
      const div = document.createElement("div");
      div.className = "blocking-constraint";
      div.textContent = bc;
      container.appendChild(div);
    }
  }
}

function buildGraphFromEvidence(caseData, evidence) {
  const nodes = [{ id: "person", label: caseData.person?.name || "Person", type: "person" }];
  const edges = [];

  for (const ev of (evidence || [])) {
    const nodeId = `ev-${ev.id || Math.random()}`;
    nodes.push({ id: nodeId, label: ev.evidence_type || "Evidence", type: "evidence" });
    edges.push({ source: "person", target: nodeId });
  }

  return { nodes, edges };
}

// Recompute button
document.getElementById("recompute-btn")?.addEventListener("click", async () => {
  try {
    await recomputeScore(caseId);
    window.location.reload();
  } catch (err) {
    alert("Failed to recompute score: " + err.message);
  }
});

loadCaseDetail();
