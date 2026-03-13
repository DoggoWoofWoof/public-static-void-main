# BorderBridge

> Identity confidence scoring and case management for displaced populations.

## Stack
- **Frontend:** HTML / CSS / JS (vanilla)
- **Backend:** FastAPI (Python)
- **Database:** Supabase (PostgreSQL)
- **Scoring Engine:** Random Forest / XGBoost

## Quick Start

### Run frontend
```bash
# Use any local server, e.g.
cd client
python -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

### Run backend
```bash
cd server
pip install -r requirements.txt
uvicorn app.main:app --reload
```
API will be at `http://127.0.0.1:8000`. Docs at `http://127.0.0.1:8000/docs`.

### Database
1. Create a Supabase project
2. Run `db/schema.sql` in Supabase SQL editor
3. Run `db/seed.sql` to populate demo data
4. Copy your Supabase URL and anon key into `.env`

## Environment Variables
Copy `.env.example` to `.env` and fill in values:
```bash
cp .env.example .env
```

## Demo Roles
| Role | Description |
|------|-------------|
| `authority` | Immigration officer — reviews cases, views scores |
| `refugee` | Displaced person — submits evidence, tracks status |
| `partner` | NGO/agency — manages referrals, posts announcements |

## Team
| Person | Area | Branch |
|--------|------|--------|
| Person 1 | Authority dashboard + case detail UI | `feature/client-authority` |
| Person 2 | Refugee portal + partner dashboard UI | `feature/client-refugee-partner` |
| Person 3 | FastAPI backend + API integration | `feature/backend-api` |
| Person 4 | Database schema + ML scoring | `feature/data-ml` |

## Branch Model
```
main   → demo-safe only
dev    → integration branch
feature/* → individual work
```
Only the integrator merges `dev → main`.
