/* Constants used across the frontend */

export const API_BASE = "http://127.0.0.1:8000";

export const CASE_STATUSES = [
  "intake",
  "under_review",
  "provisional_identity",
  "verified_identity",
  "referred",
  "closed",
];

export const EVIDENCE_TRUST_CLASSES = {
  official:      ["biometric_match", "government_record", "verified_ngo_record"],
  corroborated:  ["family_confirmation", "employer_confirmation", "school_confirmation"],
  self_declared: ["profile_details", "reported_family_members", "education_claims", "skill_declarations"],
};

export const CONFIDENCE_BANDS = ["unverified", "low", "provisional_identity", "verified"];

export const ANNOUNCEMENT_TYPES = [
  "appointment_reminder",
  "food_shelter_medical",
  "document_request",
  "screening_update",
  "employment_pathway",
  "school_enrollment",
];

export const FAMILY_LINK_STATES = ["declared", "candidate_match", "verified", "disputed"];

export const INTERNAL_ROLES = [
  "intake_officer",
  "reviewer",
  "case_manager",
  "communications_publisher",
  "partner_service_officer",
];
