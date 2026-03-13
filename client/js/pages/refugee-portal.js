import { listAnnouncements } from "../api/announcements.js";
import { renderAnnouncementsFeed } from "../components/announcement-card.js";

/**
 * Refugee Self-Service Portal page script.
 * Refugees can submit self-declared data. They cannot:
 *   - directly verify themselves
 *   - overwrite accepted official data
 *   - trigger formal state transitions
 */

const selfDeclareForm = document.getElementById("self-declare-form");
const tabContent = document.getElementById("tab-content");
const announcementsFeed = document.getElementById("announcements-feed");

// Tab navigation
const tabBtns = document.querySelectorAll(".tab-btn");
tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTab(btn.dataset.tab);
  });
});

function renderTab(tab) {
  switch (tab) {
    case "profile":
      tabContent.innerHTML = `
        <div class="form-group"><label for="full-name">Full Name</label><input type="text" id="full-name" placeholder="Your full name" /></div>
        <div class="form-group"><label for="nationality">Nationality</label><input type="text" id="nationality" placeholder="Nationality" /></div>
        <div class="form-group"><label for="language">Primary Language</label><input type="text" id="language" placeholder="Language" /></div>
        <div class="form-group"><label for="dob">Date of Birth</label><input type="date" id="dob" /></div>
      `;
      break;
    case "family":
      tabContent.innerHTML = `
        <div class="form-group"><label for="family-name">Family Member Name</label><input type="text" id="family-name" placeholder="Name" /></div>
        <div class="form-group"><label for="relation">Relationship</label>
          <select id="relation"><option>Spouse</option><option>Parent</option><option>Child</option><option>Sibling</option><option>Other</option></select>
        </div>
        <p class="help-text">Declared links start as "declared" and must be verified by an officer.</p>
      `;
      break;
    case "education":
      tabContent.innerHTML = `
        <div class="form-group"><label for="education">Education Level</label><input type="text" id="education" placeholder="e.g., Secondary school" /></div>
        <div class="form-group"><label for="skills">Skills</label><textarea id="skills" rows="3" placeholder="List your skills…"></textarea></div>
      `;
      break;
    case "needs":
      tabContent.innerHTML = `
        <div class="form-group"><label for="support-type">Support Needed</label>
          <select id="support-type"><option>Housing</option><option>Food</option><option>Medical</option><option>Legal</option><option>Employment</option><option>Education</option></select>
        </div>
        <div class="form-group"><label for="support-detail">Details</label><textarea id="support-detail" rows="3" placeholder="Describe your needs…"></textarea></div>
      `;
      break;
  }
}

// Initial tab render
renderTab("profile");

// Form submit handler
selfDeclareForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Submitted. Your information will be reviewed by a case officer.");
});

// Load announcements
async function loadAnnouncements() {
  try {
    // In a real app, use the refugee's own case ID
    const caseId = localStorage.getItem("bb_case_id") || "demo";
    const data = await listAnnouncements(caseId);
    renderAnnouncementsFeed(data, announcementsFeed);
  } catch {
    announcementsFeed.innerHTML = '<p class="help-text">Could not load announcements.</p>';
  }
}

loadAnnouncements();
