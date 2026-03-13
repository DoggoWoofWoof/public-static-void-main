-- BorderBridge Schema — Supabase (PostgreSQL)
-- Primary implementation: Supabase-first

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Profiles ──────────────────────────────────────────────
CREATE TABLE profiles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email       TEXT UNIQUE NOT NULL,
  role        TEXT NOT NULL CHECK (role IN ('authority', 'refugee', 'partner')),
  internal_role TEXT CHECK (internal_role IN (
    'intake_officer', 'reviewer', 'case_manager',
    'communications_publisher', 'partner_service_officer'
  )),
  full_name   TEXT,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ── Cases ─────────────────────────────────────────────────
CREATE TABLE cases (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_code   TEXT UNIQUE NOT NULL,
  status      TEXT NOT NULL DEFAULT 'intake'
                CHECK (status IN (
                  'intake', 'under_review', 'provisional_identity',
                  'verified_identity', 'referred', 'closed'
                )),
  -- Person details (embedded for simplicity)
  person_name        TEXT NOT NULL,
  person_nationality TEXT,
  person_language    TEXT,
  person_dob         DATE,

  created_by  UUID REFERENCES profiles(id),
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- ── Evidence ──────────────────────────────────────────────
-- Trust classes: official, corroborated, self_declared
CREATE TABLE evidence (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id       UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  evidence_type TEXT NOT NULL,
  trust_class   TEXT NOT NULL DEFAULT 'self_declared'
                  CHECK (trust_class IN ('official', 'corroborated', 'self_declared')),
  source        TEXT,
  details       JSONB DEFAULT '{}',
  review_status TEXT NOT NULL DEFAULT 'pending'
                  CHECK (review_status IN ('pending', 'accepted', 'rejected')),
  reviewed_by   UUID REFERENCES profiles(id),
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ── Documents ─────────────────────────────────────────────
CREATE TABLE documents (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id     UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  filename    TEXT NOT NULL,
  doc_type    TEXT,
  storage_path TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- ── Family Links ──────────────────────────────────────────
-- Trust states: declared, candidate_match, verified, disputed
CREATE TABLE family_links (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id          UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  linked_case_id   UUID REFERENCES cases(id),
  relation         TEXT NOT NULL,
  linked_person_name TEXT NOT NULL,
  trust_state      TEXT NOT NULL DEFAULT 'declared'
                    CHECK (trust_state IN ('declared', 'candidate_match', 'verified', 'disputed')),
  verified_by      UUID REFERENCES profiles(id),
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- ── Announcements ─────────────────────────────────────────
-- One-way, authority-posted, targeted
CREATE TABLE announcements (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  announcement_type  TEXT NOT NULL CHECK (announcement_type IN (
    'appointment_reminder', 'food_shelter_medical', 'document_request',
    'screening_update', 'employment_pathway', 'school_enrollment'
  )),
  title              TEXT NOT NULL,
  body               TEXT NOT NULL,
  target_case_id     UUID REFERENCES cases(id),
  target_location    TEXT,
  target_status      TEXT,
  posted_by          UUID REFERENCES profiles(id),
  created_at         TIMESTAMPTZ DEFAULT now()
);

-- ── Referrals ─────────────────────────────────────────────
CREATE TABLE referrals (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id        UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  referral_type  TEXT NOT NULL CHECK (referral_type IN (
    'employment', 'housing', 'medical', 'legal', 'education'
  )),
  description    TEXT,
  partner_id     UUID REFERENCES profiles(id),
  status         TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  created_by     UUID REFERENCES profiles(id),
  created_at     TIMESTAMPTZ DEFAULT now()
);

-- ── Score Snapshots ───────────────────────────────────────
CREATE TABLE scores (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id           UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  predicted_score   FLOAT NOT NULL,
  confidence_band   TEXT NOT NULL,
  top_factors       JSONB DEFAULT '[]',
  blocking_constraints JSONB DEFAULT '[]',
  model_version     TEXT,
  computed_at       TIMESTAMPTZ DEFAULT now()
);

-- ── Audit Log ─────────────────────────────────────────────
CREATE TABLE audit_log (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action      TEXT NOT NULL,
  user_id     UUID REFERENCES profiles(id),
  case_id     UUID REFERENCES cases(id),
  details     JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ── Indexes ───────────────────────────────────────────────
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_evidence_case ON evidence(case_id);
CREATE INDEX idx_evidence_trust ON evidence(trust_class);
CREATE INDEX idx_family_links_case ON family_links(case_id);
CREATE INDEX idx_announcements_case ON announcements(target_case_id);
CREATE INDEX idx_referrals_case ON referrals(case_id);
CREATE INDEX idx_scores_case ON scores(case_id);
CREATE INDEX idx_audit_case ON audit_log(case_id);
