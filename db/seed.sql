-- BorderBridge Seed Data — Demo scenario: Ahmad Karimi

-- ── Demo users ────────────────────────────────────────────
INSERT INTO profiles (id, email, role, internal_role, full_name) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'officer@borderbridge.demo', 'authority', 'case_manager', 'Sarah Chen'),
  ('a1000000-0000-0000-0000-000000000002', 'ahmad@borderbridge.demo', 'refugee', NULL, 'Ahmad Karimi'),
  ('a1000000-0000-0000-0000-000000000003', 'refuwork@borderbridge.demo', 'partner', 'partner_service_officer', 'RefuWork Agency');

-- ── Demo cases ────────────────────────────────────────────
INSERT INTO cases (id, case_code, status, person_name, person_nationality, person_language, person_dob, created_by) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'BB-1001', 'provisional_identity', 'Ahmad Karimi', 'Syrian', 'Arabic', '1985-03-15', 'a1000000-0000-0000-0000-000000000001'),
  ('c1000000-0000-0000-0000-000000000002', 'BB-1002', 'intake', 'Fatima Karimi', 'Syrian', 'Arabic', '1988-07-22', 'a1000000-0000-0000-0000-000000000001'),
  ('c1000000-0000-0000-0000-000000000003', 'BB-1003', 'under_review', 'Omar Hassan', 'Iraqi', 'Arabic', '1990-11-03', 'a1000000-0000-0000-0000-000000000001');

-- ── Evidence for Ahmad (BB-1001) ──────────────────────────
-- Official
INSERT INTO evidence (case_id, evidence_type, trust_class, source, review_status) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'verified_ngo_record', 'official', 'UNHCR field office', 'accepted');

-- Corroborated
INSERT INTO evidence (case_id, evidence_type, trust_class, source, review_status) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'family_confirmation', 'corroborated', 'Wife Fatima Karimi', 'accepted'),
  ('c1000000-0000-0000-0000-000000000001', 'employer_confirmation', 'corroborated', 'Local bakery owner', 'accepted');

-- Self-declared
INSERT INTO evidence (case_id, evidence_type, trust_class, source, review_status) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'profile_details', 'self_declared', 'Self-submitted', 'accepted'),
  ('c1000000-0000-0000-0000-000000000001', 'education_claims', 'self_declared', 'Self-submitted', 'pending');

-- ── Family links ──────────────────────────────────────────
INSERT INTO family_links (case_id, linked_case_id, relation, linked_person_name, trust_state) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'c1000000-0000-0000-0000-000000000002', 'spouse', 'Fatima Karimi', 'verified');

-- ── Score snapshot ────────────────────────────────────────
INSERT INTO scores (case_id, predicted_score, confidence_band, top_factors, blocking_constraints) VALUES
  ('c1000000-0000-0000-0000-000000000001', 65.2, 'provisional_identity',
   '[{"name": "Verified NGO record", "impact": 15.0}, {"name": "Family confirmation (wife)", "impact": 10.5}, {"name": "Employer confirmation", "impact": 8.3}]',
   '[]');

-- ── Announcements ─────────────────────────────────────────
INSERT INTO announcements (announcement_type, title, body, target_case_id, posted_by) VALUES
  ('appointment_reminder', 'Interview Scheduled', 'Identity review interview on 15 March 2026 at 10:00 AM, Room 204.', 'c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001'),
  ('food_shelter_medical', 'Food Distribution — Zone B', 'Food packages available at Distribution Point B, Tue/Thu 08:00–12:00.', NULL, 'a1000000-0000-0000-0000-000000000001'),
  ('employment_pathway', 'Translation Services Position', 'Available through RefuWork. Contact your case manager for referral.', 'c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000003');

-- ── Referrals ─────────────────────────────────────────────
INSERT INTO referrals (case_id, referral_type, description, partner_id, status, created_by) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'employment', 'Translation services — Arabic/English', 'a1000000-0000-0000-0000-000000000003', 'active', 'a1000000-0000-0000-0000-000000000001');
