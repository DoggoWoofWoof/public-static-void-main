# Architecture

## System Overview

```
┌─────────────┐     ┌──────────────┐     ┌────────────┐
│   Client    │────▶│  FastAPI API  │────▶│  Supabase  │
│  HTML/CSS/JS│◀────│  (Python)    │◀────│  (Postgres) │
└─────────────┘     └──────┬───────┘     └────────────┘
                           │
                    ┌──────▼───────┐
                    │  ML Engine   │
                    │  RF / XGBoost│
                    └──────────────┘
```

## Components

### 1. Client (HTML/CSS/JS)
- Authority Dashboard — case list, stats, filters
- Case Detail — evidence table, score breakdown, evidence graph
- Refugee Self-Service Portal — self-declaration forms, announcements feed
- Partner Dashboard — referral management, announcement posting
- Login — role-based authentication

### 2. FastAPI Backend
- **Core**: config, security (JWT), dependency injection, logging
- **Routes**: auth, cases, evidence, documents, family_links, announcements, referrals, scoring
- **Services**: business logic layer
- **Repositories**: Supabase queries (Supabase-first)
- **ML**: feature builder, inference, training

### 3. Database (Supabase)
- Primary implementation: **Supabase**
- Tables: profiles, cases, evidence, documents, family_links, announcements, referrals, scores, audit_log
- Fallback: JSON repo only if Supabase setup fails

### 4. Identity Confidence Engine (ML)
- Random Forest and XGBoost models
- Trained on synthetic structured case data from policy-consistent evidence combinations
- Feature vector built from evidence trust classes and family link states
- Returns: predicted score, confidence band, top contributing factors, blocking constraints

## Internal Permission Roles

| Role | Permissions |
|------|------------|
| `intake_officer` | Create cases, add evidence |
| `reviewer` | Review evidence, update trust classes |
| `case_manager` | Full case management, referrals |
| `communications_publisher` | Post announcements |
| `partner_service_officer` | Manage referrals, view assigned cases |

## Data Trust Model

### Evidence Classes
- **Official** (weight 0.85–0.95): biometric match, government record, verified NGO record
- **Corroborated** (weight 0.60–0.70): family/employer/school confirmations
- **Self-declared** (weight 0.15–0.30): profile details, education claims, skill declarations

### Family Link States
`declared` → `candidate_match` → `verified` (or `disputed`)

## Refugee Submission Rules
Refugees **can** submit: profile details, family members, education claims, skill declarations, support needs.
Refugees **cannot**: directly verify themselves, overwrite accepted official data, trigger formal state transitions.

## Announcement Rules
- Announcements are **one-way** (no replies)
- Only verified authorities/partners can post
- Targeted by case / family / location / status
- Types: appointment reminders, food/shelter/medical, document requests, screening updates, employment pathways, school enrollment
