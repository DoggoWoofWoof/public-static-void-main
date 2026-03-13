/**
 * Formatting utilities.
 */

export function formatDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric"
  });
}

export function formatDateTime(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
}

export function formatScore(score) {
  if (score == null) return "—";
  return Math.round(score).toString();
}

export function formatStatus(status) {
  if (!status) return "—";
  return status.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
}
