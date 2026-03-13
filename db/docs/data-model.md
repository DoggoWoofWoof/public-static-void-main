# Data Model

## Entities

| Table | Description |
|-------|-------------|
| `profiles` | Users — authority, refugee, partner (with internal roles) |
| `cases` | Refugee cases with person details and status |
| `evidence` | Evidence items with trust classes |
| `documents` | Uploaded document records |
| `family_links` | Family connections with trust states |
| `announcements` | One-way authority-posted notices |
| `referrals` | Service referrals from partners |
| `scores` | Identity confidence score snapshots |
| `audit_log` | Action audit trail |

## Evidence Trust Classes

| Class | Weight | Examples |
|-------|--------|----------|
| Official | High (0.85–0.95) | Biometric match, government record, verified NGO record |
| Corroborated | Medium (0.60–0.70) | Family confirmation, employer confirmation, school confirmation |
| Self-declared | Low (0.15–0.30) | Profile details, reported family, education claims, skill declarations |

## Family Link Trust States

`declared` → `candidate_match` → `verified` (or `disputed`)

## Case Status Flow

`intake` → `under_review` → `provisional_identity` → `verified_identity` → `referred` → `closed`
