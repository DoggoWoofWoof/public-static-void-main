# BorderBridge — Architecture Spec v1.0

## Problem Statement

Refugees and displaced persons crossing borders often lack official documentation. Upon arrival, multiple agencies (border authorities, NGOs, health teams) each create separate records in disconnected systems. This fragmentation leads to repeated registrations, lost information, and difficulty verifying identity — ultimately delaying integration support like employment, housing, and education.

**BorderBridge** is a coordination platform that bridges these fragmented systems. It does not replace existing infrastructure like UNHCR's PRIMES — it acts as a layer on top, connecting agencies and enabling smoother case handoffs.

---

## Core Concept

> BorderBridge connects fragmented refugee systems, builds identity confidence when documents are missing, and provides a guided portal that helps refugees and agencies move from arrival to integration without repeated registrations.

---

## System Components

### 1. Interoperability Hub (Core System)

The backbone of BorderBridge. Connects border authorities, immigration offices, NGOs, health agencies, municipal housing, and employers through a **single shared case ID**.

- Each agency sees only the data fields relevant to them (role-based access).
- Eliminates repeated registrations across agencies.

| Agency           | Data Visible           |
| ---------------- | ---------------------- |
| Border authority | Identity + biometrics  |
| NGO              | Support needs          |
| Employer         | Skills                 |
| Schools          | Children data          |

---

### 2. Identity Confidence Engine

Instead of binary "verified / not verified," identity is treated as **probabilistic**. Confidence builds over time from categorized evidence, driven by an ML model (Random Forest or XGBoost) trained on structured evidence features.

#### Data Trust Classes

All evidence submitted to the system is categorized into one of three classes:

**Official Evidence** (highest trust)
- Biometric match
- Government record
- Verified NGO record

**Corroborated Evidence** (medium trust)
- Family confirmation
- Employer confirmation
- School confirmation

**Self-Declared Information** (lowest initial trust)
- Refugee-submitted profile details
- Reported family members
- Education claims
- Skill declarations

The synthetic label generator assigns different weights to each class/type. Official evidence carries the most weight, self-declared the least.

#### Score Ranges

| Score  | Status          |
| ------ | --------------- |
| 0–39   | Under review    |
| 40–59  | Provisional     |
| 60–79  | Verified        |
| 80–100 | High confidence |

#### Workflow Guards

The ML model is **primary** for scoring, but hard governance constraints apply after prediction:

- No verified state if no reviewed evidence exists.
- No high-confidence state if disputed official evidence is present.
- No employment referral without case-manager approval.

#### Score Explanation Output

Each scoring request returns:

- **Predicted score** (0–100)
- **Confidence band** (under_review / provisional / verified / high_confidence)
- **Top contributing factors** (e.g., "Verified wife link increased score")
- **Blocking constraints** if any (e.g., "No reviewed official evidence prevents high-confidence status")

> For the hackathon, the model is trained on synthetic structured case data generated from policy-consistent evidence combinations. It is not trained on real production refugee data.

---

### 3. Identity Evidence Graph

A visual network graph showing how identity confidence is built through connections (family, NGO validations, education records, employer references). Each node contributes to the overall confidence score. Rendered with `vis-network` or `cytoscape.js`.

```
Ahmad Karimi
│
├── Wife (verified)
├── NGO Officer Validation
├── Education Record Match
└── Former Employer Reference
```

---

### 4. Refugee Self-Service Portal

A refugee-facing interface (plain HTML/CSS/JS) designed around patterns familiar from apps like WhatsApp and Telegram. It is **not** a public social network — it is a controlled, secure self-service portal for one-way official communication, structured self-submission, and family linkage.

#### Features

- **Refugee Profile** — structured identity data: name, languages, skills, education, family, identity confidence score.
- **Updates Feed** — one-way verified notices from authorities and agencies.
- **Job Opportunity Feed** — integration opportunities surfaced through case workers.
- **Family Linking** — link profiles of spouse, children, parents, siblings; submit family search requests for missing members.

#### Refugee Submission Rules

**Refugees can:**
- Submit self-declared profile details (skills, education, languages, work history)
- Submit family member details
- Submit education claims and skill declarations
- Submit support needs

**Refugees cannot:**
- Directly verify themselves
- Overwrite accepted official data
- Directly trigger formal case state transitions

All self-declared submissions enter the system at the lowest trust level and require review by an authorized actor before affecting the confidence score.

---

### 5. Integration Engine

Once identity confidence crosses a threshold, the system surfaces practical next steps:

- **Employment Matching** — matches skills, education, certifications to partner employers, shortage occupations, and subsidy-eligible roles. Matches go through case workers first.
- **Housing Pathway** — uses family size, children count, work location, and housing availability to recommend options.
- **Education Routing** — for children: nearest schools, language support, open seats. For adults: professional revalidation, bridge courses, language training, licensing requirements.
- **Community Placement** — optional, consent-based suggestions for existing communities from the same language/origin background, support groups, and community organisations.

---

## Announcement Rules

Announcements are **one-way, authority-posted, targeted communications**. Only verified authorities can post them.

### Announcement Types

- Appointment reminders
- Food / shelter / medical notices
- Document requests
- Interview or screening updates
- Approved employment pathway notices
- School enrollment next-step notices

### Targeting

Announcements are targeted by: case, family, location, status group, or segment. Refugees receive them passively through their updates feed — no reply or interaction mechanism.

---

## System Flow

```
1.  Person arrives at border
2.  Border officer creates case in BorderBridge
3.  Documents + biometrics captured
4.  System checks connected databases
5.  Identity confidence begins building (ML model)
6.  Evidence graph visualizes identity links
7.  Refugee profile created
8.  Refugee receives updates through feed
9.  Identity confidence crosses threshold → Integration engine activates
    (job suggestions, housing options, education routing)
10. Case moves between agencies without re-registration
```

---

## Demo Story — Ahmad Karimi

1. Ahmad arrives without documents
2. Case created in BorderBridge
3. System checks databases
4. Wife already exists in system → family confirmation (corroborated)
5. NGO validation added (official)
6. Education record match found (corroborated)
7. Identity graph grows — nodes visible
8. Confidence score reaches 65 → "Verified"
9. Integration engine activates
10. Job opportunity appears
11. Ahmad sees update on the self-service portal

---

## Technical Architecture

### Overview

Single deployable stack — no microservices, no queues, no event bus.

```
Frontend (HTML/CSS/JS)
    |
    | fetch()
    v
FastAPI
  - auth + role checks
  - case workflows
  - evidence ingestion
  - document metadata
  - announcements
  - referrals
  - scoring engine
    |
    v
JSON Seed Data (primary)
  - Local JSON files per entity
  - File-based storage for uploaded docs
  - Supabase as production-ready upgrade path
```

### Data Layer Decision

**Primary implementation: JSON repo for demo speed.**
Supabase (Postgres + Storage) is the production-ready upgrade path. The repository interface is the same — swap `json_repo.py` for `supabase_repo.py` without changing service logic.

---

### Tech Stack

| Layer    | Technology                                     |
| -------- | ---------------------------------------------- |
| Frontend | Plain HTML / CSS / JS (no React needed)        |
| Styling  | Vanilla CSS or Tailwind CDN                    |
| Graph    | `vis-network` or `cytoscape.js`                |
| Backend  | FastAPI (Python)                               |
| Database | JSON seed data (primary) / Supabase (upgrade)  |
| Auth     | Simple demo credentials in FastAPI             |
| ML       | scikit-learn (Random Forest) / XGBoost         |

---

### Roles & Permissions

#### Product-Level Roles

| Role      | Description                           |
| --------- | ------------------------------------- |
| refugee   | Self-service portal access            |
| authority | Government/border agency staff        |
| partner   | NGO / employer / service provider     |

#### Internal Permission Roles (Backend)

| Permission Role         | Capabilities                                              |
| ----------------------- | --------------------------------------------------------- |
| Intake officer          | Create cases, capture initial evidence/documents          |
| Reviewer / Verifier     | Review evidence, accept/reject/dispute items              |
| Case manager            | Manage case lifecycle, approve referrals, approve employment transitions |
| Communications publisher| Post announcements targeted by case/location/segment      |
| Partner service officer | View referred cases, update referral status               |

These map onto the three product roles. An authority user may have intake + reviewer + case manager + publisher permissions. A partner user has partner service officer permissions.

---

### Domain Model

| Entity              | Meaning                                             |
| ------------------- | --------------------------------------------------- |
| `Person`            | Human subject                                       |
| `Case`              | Active workflow instance                            |
| `EvidenceItem`      | One fact or claim (official / corroborated / self-declared) |
| `FamilyLink`        | Relationship with trust state (declared → candidate_match → verified / disputed) |
| `Document`          | Uploaded file + review state                        |
| `Announcement`      | One-way targeted notice from authority              |
| `Referral`          | Handoff to another department                       |
| `ScoreSnapshot`     | Stored model output + explanation for audit/history |
| `ExternalRecordLink`| Match to PRIMES / govt / NGO source                 |
| `AuditLog`          | Full traceability of all actions                    |

---

### Database Schema (Supabase / Postgres)

<details>
<summary><strong>profiles</strong></summary>

```sql
create table profiles (
  id uuid primary key,
  email text unique,
  full_name text,
  role_group text not null check (role_group in ('refugee','authority','partner')),
  agency_name text,
  created_at timestamptz default now()
);
```
</details>

<details>
<summary><strong>persons</strong></summary>

```sql
create table persons (
  id uuid primary key default gen_random_uuid(),
  primary_name text not null,
  alt_names jsonb default '[]'::jsonb,
  dob date,
  sex text,
  nationality text,
  primary_language text,
  created_at timestamptz default now(),
  created_by uuid references profiles(id)
);
```
</details>

<details>
<summary><strong>cases</strong></summary>

```sql
create table cases (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references persons(id) on delete cascade,
  case_code text unique not null,
  current_status text not null default 'intake_created',
  intake_location text,
  owner_agency text,
  created_by uuid references profiles(id),
  opened_at timestamptz default now(),
  closed_at timestamptz
);
```
</details>

<details>
<summary><strong>evidence_items</strong></summary>

```sql
create table evidence_items (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  person_id uuid not null references persons(id) on delete cascade,
  evidence_class text not null check (evidence_class in ('official','corroborated','self_declared')),
  evidence_type text not null,
  state text not null check (state in ('submitted','pending_review','reviewed','accepted','rejected','disputed')),
  source_actor_type text not null check (source_actor_type in ('refugee','authority','partner','system')),
  source_user_id uuid references profiles(id),
  payload jsonb not null default '{}'::jsonb,
  submitted_at timestamptz default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references profiles(id)
);
```
</details>

<details>
<summary><strong>family_links</strong></summary>

```sql
create table family_links (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  person_id uuid not null references persons(id) on delete cascade,
  related_person_id uuid references persons(id),
  relation_type text not null,
  link_status text not null check (link_status in ('declared','candidate_match','verified','disputed')),
  source_evidence_id uuid references evidence_items(id),
  created_at timestamptz default now()
);
```

**Trust states:**
- `declared` — claimed by refugee, unverified
- `candidate_match` — system found a possible match
- `verified` — confirmed by authority or corroborating evidence
- `disputed` — conflicting information present

Family links are **not automatically true**. They must progress through these states before contributing full weight to the confidence score.
</details>

<details>
<summary><strong>documents</strong></summary>

```sql
create table documents (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  person_id uuid not null references persons(id) on delete cascade,
  document_type text not null,
  storage_path text not null,
  state text not null check (state in ('uploaded','unreadable','pending_review','verified','rejected','expired')),
  uploaded_by uuid references profiles(id),
  uploaded_at timestamptz default now(),
  verified_by uuid references profiles(id),
  verified_at timestamptz
);
```
</details>

<details>
<summary><strong>score_snapshots</strong></summary>

```sql
create table score_snapshots (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  model_name text not null,
  model_version text not null,
  predicted_score numeric not null,
  confidence_band text,
  feature_snapshot jsonb not null,
  explanation jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
```
</details>

<details>
<summary><strong>announcements, referrals, external_record_links, audit_logs</strong></summary>

```sql
create table announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  announcement_type text not null,
  target_type text not null check (target_type in ('case','family','location','status_group','segment')),
  target_ref text not null,
  published_by uuid references profiles(id),
  published_at timestamptz default now(),
  valid_until timestamptz
);

create table referrals (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  referral_type text not null check (referral_type in ('referral','consultation','transfer','notification')),
  from_agency text not null,
  to_agency text not null,
  reason text,
  status text not null default 'open' check (status in ('open','accepted','declined','completed')),
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table external_record_links (
  id uuid primary key default gen_random_uuid(),
  case_id uuid not null references cases(id) on delete cascade,
  source_system text not null,
  external_record_id text,
  match_status text not null check (match_status in ('none','candidate','confirmed')),
  confidence_hint numeric,
  matched_fields jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create table audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
```
</details>

---

### FastAPI Project Structure

```
app/
  main.py
  core/
    config.py          # pydantic-settings + @lru_cache
    security.py
    deps.py            # get_current_user, require_role, get_scoring_service
  api/
    routes/
      cases.py
      evidence.py
      documents.py
      scoring.py
      announcements.py
      referrals.py
  schemas/
    case.py
    evidence.py
    document.py
    scoring.py
    announcement.py
    referral.py
  services/
    case_service.py
    evidence_service.py
    scoring_service.py
    announcement_service.py
    referral_service.py
  repositories/
    json_repo.py       # PRIMARY — reads/writes local JSON files
    supabase_repo.py   # UPGRADE PATH — drop-in Supabase replacement
  ml/
    feature_builder.py
    train_rf.py
    train_xgb.py
    infer.py
    models/
      rf_identity_score.joblib
      xgb_identity_score.json
data/
  seed/
    profiles.json
    persons.json
    cases.json
    evidence_items.json
    family_links.json
    documents.json
    announcements.json
    referrals.json
    score_snapshots.json
    external_record_links.json
    audit_logs.json
```

---

### API Routes (MVP)

| Resource      | Method | Path                                    |
| ------------- | ------ | --------------------------------------- |
| Cases         | POST   | `/cases`                                |
| Cases         | GET    | `/cases/{case_id}`                      |
| Cases         | GET    | `/cases/{case_id}/timeline`             |
| Evidence      | POST   | `/cases/{case_id}/evidence`             |
| Evidence      | GET    | `/cases/{case_id}/evidence`             |
| Evidence      | PATCH  | `/evidence/{evidence_id}/review`        |
| Family Links  | POST   | `/cases/{case_id}/family-links`         |
| Family Links  | PATCH  | `/family-links/{link_id}`               |
| Documents     | POST   | `/cases/{case_id}/documents/register`   |
| Documents     | PATCH  | `/documents/{document_id}/review`       |
| Scoring       | POST   | `/cases/{case_id}/score/recompute`      |
| Scoring       | GET    | `/cases/{case_id}/score/latest`         |
| Announcements | POST   | `/announcements`                        |
| Announcements | GET    | `/cases/{case_id}/announcements`        |
| Referrals     | POST   | `/cases/{case_id}/referrals`            |
| Referrals     | PATCH  | `/referrals/{referral_id}`              |

---

### ML Scoring Engine

#### Approach

Train a **regression model** (not classifier) to predict a continuous score 0–100. The model is trained on **synthetic structured case data** generated from policy-consistent evidence combinations — not real production refugee data.

**Recommended:** Start with Random Forest. Optionally benchmark XGBoost.

- Random Forest: easier baseline, less tuning, easier to explain.
- XGBoost: better tabular performance, more tuning required. Only use if you have time to compare.

#### Input Features

For each case, build a structured feature vector from evidence items, documents, family links, and external records:

| Feature                        | Description                                    |
| ------------------------------ | ---------------------------------------------- |
| `official_evidence_count`      | Total official evidence items                  |
| `corroborated_evidence_count`  | Total corroborated items                       |
| `self_declared_count`          | Total self-declared items                      |
| `accepted_official_count`      | Accepted official items                        |
| `accepted_corroborated_count`  | Accepted corroborated items                    |
| `disputed_count`               | Disputed items                                 |
| `rejected_count`               | Rejected items                                 |
| `biometric_match_present`      | Boolean (0/1)                                  |
| `government_record_present`    | Boolean (0/1)                                  |
| `verified_ngo_record_present`  | Boolean (0/1)                                  |
| `family_confirmation_present`  | Boolean (0/1)                                  |
| `verified_family_links_count`  | Count of verified family links                 |
| `documents_verified_count`     | Verified documents                             |
| `documents_rejected_count`     | Rejected documents                             |
| `external_confirmed_matches`   | External DB confirmed matches                  |

#### Training Strategy (Synthetic Data)

1. Generate **3,000–10,000 synthetic case rows** with varied evidence states.
2. Apply a **policy scoring function** to assign training labels:
   - Biometric accepted (official): +28
   - Government record accepted (official): +24
   - Verified NGO record (official): +15
   - Family confirmation accepted (corroborated): +10
   - School/employer confirmation (corroborated): +8 each
   - Self-declared education/skills: +2–3 each
   - Disputed official evidence: −18
   - Rejected official evidence: −12
   - Clamp result to 0–100.
3. Train RF/XGB to predict this score.
4. Demo talking point: *"Model trained on structured evidence patterns. Score is data-driven, but the platform applies governance constraints before advancing case status."*

#### Random Forest

```python
from sklearn.ensemble import RandomForestRegressor
import joblib

model = RandomForestRegressor(
    n_estimators=300, max_depth=10,
    min_samples_split=4, min_samples_leaf=2,
    random_state=42, n_jobs=-1
)
model.fit(X_train, y_train)
joblib.dump(model, "app/ml/models/rf_identity_score.joblib")
```

#### XGBoost

```python
from xgboost import XGBRegressor

model = XGBRegressor(
    n_estimators=400, max_depth=6, learning_rate=0.05,
    subsample=0.9, colsample_bytree=0.9,
    objective="reg:squarederror", random_state=42
)
model.fit(X_train, y_train)
model.save_model("app/ml/models/xgb_identity_score.json")
```

---

### Case State Machine

| State                 | Trigger                                                 |
| --------------------- | ------------------------------------------------------- |
| `intake_created`      | Case created                                            |
| `evidence_pending`    | First evidence or document added                        |
| `provisional_identity`| Predicted score 40–59                                   |
| `review_required`     | Disputes present                                        |
| `verified_for_handoff`| Predicted score ≥ 60 + officer review                   |
| `referred`            | Referral issued                                         |
| `service_in_progress` | Active engagement with an integration service           |

---

### Frontend Plan (HTML/CSS/JS)

No React required. Create the following pages:

| File                      | Purpose                                      |
| ------------------------- | -------------------------------------------- |
| `authority-dashboard.html`| Case list, intake form, review queue         |
| `case-detail.html`        | Case timeline, evidence graph, score display |
| `refugee-portal.html`     | Profile, updates feed, job feed              |
| `partner-dashboard.html`  | Referral management, announcements           |

- Use `fetch()` to call FastAPI endpoints.
- Small vanilla JS modules (no bundler needed).
- Tailwind CDN for fast styling.
- Evidence graph rendered with `vis-network` or `cytoscape.js`.

---

## Hackathon MVP Scope

### Will Build

- Intake case creation
- Evidence ingestion + review workflow
- Identity confidence scoring (ML-driven)
- Identity evidence graph visualization
- Agency dashboard (authority view)
- Refugee self-service portal (profile + updates feed)
- One announcement feed
- One employment referral flow (end-to-end demo)

### Deferred / Simulated

- Housing recommendation logic
- Education routing logic
- Community placement logic
- PRIMES integration (mocked API response)
- Biometric verification (mocked result)
- Full external partner APIs (mocked)
- Employer database (seeded JSON)
- School/housing APIs (seeded JSON)
- Supabase migration (JSON-first for demo)

---

## Implementation Order

| Phase   | Tasks                                                                  |
| ------- | ---------------------------------------------------------------------- |
| Phase 1 | JSON seed data setup, data directory structure, storage folder         |
| Phase 2 | FastAPI skeleton — case CRUD, evidence CRUD, documents, announcements, referrals |
| Phase 3 | Synthetic data generator, RF training, XGB training, score endpoint    |
| Phase 4 | Evidence graph endpoint, frontend dashboards, refugee portal, demo script |

---

## Team Split (5-person example)

| Role     | Task                                              |
| -------- | ------------------------------------------------- |
| Person 1 | Backend APIs + JSON repo + FastAPI skeleton        |
| Person 2 | Agency dashboard + case detail page               |
| Person 3 | Intake form + identity scoring UI                 |
| Person 4 | Evidence graph visualization (vis-network)        |
| Person 5 | Refugee self-service portal + demo flow           |

---

## Key Differentiators

1. **Not a replacement** — sits on top of existing systems like PRIMES.
2. **Identity is probabilistic** — ML-driven confidence score with data trust classes, not binary verification.
3. **Integration focus** — goes beyond registration into employment, housing, and education.
4. **Familiar UX for refugees** — guided self-service portal reduces friction.
5. **Role-based access** — agencies see only what they need; refugees cannot overwrite official data.
6. **Governance constraints** — hard workflow guards prevent reckless state transitions regardless of model output.
7. **Auditable** — every action logged, every score snapshot stored with feature inputs and explanation.

---

## Open Questions

1. Include voluntary repatriation feature?
2. Include aid / voucher tracking, or leave to PRIMES?
3. Include trauma / mental health referral flags?
4. Include legal aid matching?
5. Desktop-first or tablet-first demo?
6. Keep the name "BorderBridge"?
7. If time runs out, what gets cut first?

**Non-negotiables:** Interoperability concept, Identity Confidence Engine, one strong integration example (employment).
