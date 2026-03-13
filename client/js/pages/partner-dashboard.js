import { listReferrals } from "../api/referrals.js";
import { renderReferralCard } from "../components/referral-card.js";

const referralsContainer = document.getElementById("referrals-container");

async function loadReferrals() {
  try {
    const data = await listReferrals("all");
    referralsContainer.innerHTML = "";

    if (!data || data.length === 0) {
      referralsContainer.innerHTML = '<p class="help-text">No active referrals.</p>';
      return;
    }

    for (const r of data) {
      referralsContainer.appendChild(renderReferralCard(r));
    }

    // Update stats
    document.getElementById("active-referrals").textContent = data.filter(r => r.status === "active" || r.status === "pending").length;
    document.getElementById("completed-referrals").textContent = data.filter(r => r.status === "completed").length;
  } catch {
    referralsContainer.innerHTML = '<p class="help-text">Could not load referrals.</p>';
  }
}

// New announcement toggle
document.getElementById("new-announcement-btn")?.addEventListener("click", () => {
  const form = document.querySelector(".announcement-form");
  if (form) form.classList.toggle("active");
});

loadReferrals();
