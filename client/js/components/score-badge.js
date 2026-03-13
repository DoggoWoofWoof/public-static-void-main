/**
 * Score badge component — displays identity confidence score with color-coded band.
 * @param {object} scoreData - { predicted_score, confidence_band, top_factors, blocking_constraints }
 * @returns {HTMLElement}
 */
export function renderScoreBadge(scoreData) {
  const { predicted_score = 0, confidence_band = "unverified" } = scoreData || {};

  const wrapper = document.createElement("div");
  wrapper.className = "score-badge-wrapper";
  wrapper.style.textAlign = "center";

  const scoreEl = document.createElement("div");
  scoreEl.style.fontSize = "2rem";
  scoreEl.style.fontWeight = "700";
  scoreEl.style.color = getScoreColor(confidence_band);
  scoreEl.textContent = Math.round(predicted_score);

  const bandEl = document.createElement("span");
  bandEl.className = `badge badge-${confidence_band}`;
  bandEl.textContent = confidence_band.replace(/_/g, " ");

  wrapper.appendChild(scoreEl);
  wrapper.appendChild(bandEl);
  return wrapper;
}

function getScoreColor(band) {
  switch (band) {
    case "verified": return "#34d399";
    case "provisional_identity": return "#22c55e";
    case "low": return "#f59e0b";
    default: return "#ef4444";
  }
}
