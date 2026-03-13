/**
 * Announcement card component — renders one-way authority-posted notices.
 * Types: appointment_reminder, food_shelter_medical, document_request,
 *        screening_update, employment_pathway, school_enrollment
 * @param {object} announcement
 * @returns {HTMLElement}
 */
export function renderAnnouncementCard(announcement) {
  const div = document.createElement("div");
  div.className = "announcement-item";

  const typeLabel = (announcement.announcement_type || "notice").replace(/_/g, " ");

  div.innerHTML = `
    <div class="announcement-type">${typeLabel}</div>
    <div class="announcement-title">${announcement.title || "Untitled"}</div>
    <div class="announcement-body">${announcement.body || ""}</div>
    <div class="announcement-time">${announcement.created_at ? new Date(announcement.created_at).toLocaleString() : ""}</div>
  `;

  return div;
}

/**
 * Renders a list of announcements into a container.
 */
export function renderAnnouncementsFeed(announcements, container) {
  container.innerHTML = "";

  if (!announcements || announcements.length === 0) {
    container.innerHTML = '<p class="help-text">No announcements yet.</p>';
    return;
  }

  for (const a of announcements) {
    container.appendChild(renderAnnouncementCard(a));
  }
}
