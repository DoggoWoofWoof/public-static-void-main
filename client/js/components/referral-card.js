/**
 * Referral card component — renders partner referral items.
 * @param {object} referral
 * @returns {HTMLElement}
 */
export function renderReferralCard(referral) {
  const div = document.createElement("div");
  div.className = "referral-item";

  div.innerHTML = `
    <div class="referral-header">
      <span class="referral-type">${referral.referral_type || "general"}</span>
      <span class="badge badge-${referral.status || "pending"}">${referral.status || "pending"}</span>
    </div>
    <div class="referral-case-code">${referral.case_code || referral.case_id || "—"}</div>
    <div class="referral-description">${referral.description || ""}</div>
  `;

  return div;
}
