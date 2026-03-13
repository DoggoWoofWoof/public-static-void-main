# Demo Script

## Setup
1. Start backend: `cd server && uvicorn app.main:app --reload`
2. Open frontend: serve `client/` on port 3000
3. Ensure Supabase has schema + seed data loaded

## Demo Flow (3–5 minutes)

### Act 1 — Authority Dashboard (1 min)
1. Open authority dashboard
2. Show case list with BB-1001, BB-1002, BB-1003
3. Point out status badges and score column
4. Filter by "provisional_identity" to show Ahmad's case

### Act 2 — Case Detail (1.5 min)
1. Click on BB-1001 (Ahmad Karimi)
2. Show person details
3. **Key moment**: Score badge showing 65.2 → "provisional identity"
4. Walk through score explanation:
   - Top factors: NGO verification (+15), Family confirmation (+10.5), Employer (+8.3)
   - No blocking constraints
5. Show evidence table with trust class badges (official/corroborated/self-declared)
6. Show evidence graph connecting Ahmad ↔ Fatima ↔ evidence nodes

### Act 3 — Refugee Portal (1 min)
1. Switch to refugee portal
2. Show self-declaration tabs (profile, family, education, support needs)
3. **Key clarification**: "Refugees submit — officers verify. Self-declared data does not directly change scores."
4. Show announcements feed (appointment reminder, food distribution)

### Act 4 — Score Recompute (30 sec)
1. Back on case detail
2. Click "Recompute Score"
3. Show updated score with explanation

### Closing (30 sec)
- Summarize: transparent, explainable identity confidence
- Not a black box — officers see exactly why a score is what it is
- Refugees have agency to submit, but cannot self-verify
