# API Contract

Source of truth between frontend and backend.

## Auth

### `POST /auth/login`
**Request:**
```json
{ "email": "user@example.com", "password": "demo1234" }
```
**Response:**
```json
{ "access_token": "jwt-token", "token_type": "bearer" }
```

---

## Cases

### `GET /cases`
Query params: `?status=intake&search=ahmad`

**Response:**
```json
[
  {
    "case_id": "uuid",
    "case_code": "BB-1001",
    "status": "provisional_identity",
    "person": {
      "name": "Ahmad Karimi",
      "nationality": "Syrian",
      "language": "Arabic",
      "date_of_birth": "1985-03-15"
    },
    "latest_score": {
      "predicted_score": 65.2,
      "confidence_band": "provisional_identity"
    },
    "created_at": "2026-03-10T08:00:00Z"
  }
]
```

### `GET /cases/{id}`
Same shape as single item above.

### `POST /cases`
**Request:**
```json
{
  "person": { "name": "New Person", "nationality": "Syrian" },
  "status": "intake"
}
```

---

## Evidence

### `GET /cases/{id}/evidence`
```json
[
  {
    "id": "uuid",
    "case_id": "uuid",
    "evidence_type": "verified_ngo_record",
    "trust_class": "official",
    "source": "UNHCR field office",
    "review_status": "accepted",
    "created_at": "2026-03-10T08:00:00Z"
  }
]
```

### `POST /cases/{id}/evidence`
```json
{
  "evidence_type": "family_confirmation",
  "trust_class": "corroborated",
  "source": "Wife Fatima",
  "details": {}
}
```

---

## Scoring

### `GET /cases/{id}/score/latest`
```json
{
  "case_id": "uuid",
  "predicted_score": 65.2,
  "confidence_band": "provisional_identity",
  "top_factors": [
    { "name": "Verified NGO record", "impact": 15.0 },
    { "name": "Family confirmation (wife)", "impact": 10.5 },
    { "name": "Employer confirmation", "impact": 8.3 }
  ],
  "blocking_constraints": [],
  "computed_at": "2026-03-10T10:00:00Z"
}
```

### `POST /cases/{id}/score/recompute`
Same response shape.

---

## Announcements

### `GET /cases/{id}/announcements`
```json
[
  {
    "id": "uuid",
    "announcement_type": "appointment_reminder",
    "title": "Interview Scheduled",
    "body": "...",
    "created_at": "2026-03-10T09:00:00Z"
  }
]
```

### `POST /announcements`
```json
{
  "announcement_type": "food_shelter_medical",
  "title": "Food Distribution",
  "body": "...",
  "target_case_id": "uuid"
}
```

---

## Referrals

### `GET /cases/{id}/referrals`
```json
[
  {
    "id": "uuid",
    "case_id": "uuid",
    "case_code": "BB-1001",
    "referral_type": "employment",
    "description": "Translation services",
    "status": "active",
    "created_at": "2026-03-10T09:00:00Z"
  }
]
```

### `POST /cases/{id}/referrals`
```json
{
  "referral_type": "employment",
  "description": "Translation services",
  "partner_id": "uuid"
}
```

---

## Family Links

### `GET /cases/{id}/family-links`
```json
[
  {
    "id": "uuid",
    "case_id": "uuid",
    "linked_case_id": "uuid",
    "relation": "spouse",
    "linked_person_name": "Fatima Karimi",
    "trust_state": "verified",
    "created_at": "2026-03-10T09:00:00Z"
  }
]
```

### `POST /cases/{id}/family-links`
```json
{
  "relation": "spouse",
  "linked_person_name": "Fatima Karimi"
}
```

---

## Documents

### `GET /cases/{id}/documents`
### `POST /cases/{id}/documents`
*File upload — TBD.*
