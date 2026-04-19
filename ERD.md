# Entity Relationship Diagram

**Project:** Youth Justice Case Management System

**Author:** Samirrimal

**Date:** 2026-04-19

---

## ERD — Mermaid Diagram

```mermaid
erDiagram
    USER {
        int id PK
        string username
        string first_name
        string last_name
        string email
        string password
    }
    CASEWORKER {
        int id PK
        int user_id FK
        string staff_id
        string phone
        string department
    }
    YOUNGPERSON {
        int id PK
        string first_name
        string last_name
        date date_of_birth
        char gender
        text address
        string phone
        string guardian_name
        string guardian_phone
        bool indigenous_status
        int assigned_caseworker_id FK
        datetime created_at
        datetime updated_at
    }
    OFFENCE {
        int id PK
        string name
        text description
        string severity
        bool requires_court
    }
    CASE {
        int id PK
        string case_number
        int young_person_id FK
        int caseworker_id FK
        string status
        string risk_level
        date opened_date
        date closed_date
        text notes
    }
    CASEOFFENCE {
        int id PK
        int case_id FK
        int offence_id FK
        date date_of_offence
        string location
        text details
    }
    COURTHEARING {
        int id PK
        int case_id FK
        datetime hearing_date
        string court_name
        string judge
        string outcome
        text outcome_notes
        datetime next_hearing_date
    }
    PROGRAM {
        int id PK
        string name
        string program_type
        text description
        int duration_weeks
        int capacity
        string facilitator
        bool is_active
    }
    ENROLMENT {
        int id PK
        int case_id FK
        int program_id FK
        date enrolment_date
        string status
        date completion_date
        text notes
    }

    USER ||--|| CASEWORKER : "has profile"
    CASEWORKER ||--o{ YOUNGPERSON : "assigned_caseworker"
    CASEWORKER ||--o{ CASE : "manages"
    YOUNGPERSON ||--o{ CASE : "involved_in"
    CASE ||--o{ CASEOFFENCE : "involves"
    OFFENCE ||--o{ CASEOFFENCE : "recorded_via"
    CASE ||--o{ COURTHEARING : "has"
    CASE ||--o{ ENROLMENT : "enrolled_via"
    PROGRAM ||--o{ ENROLMENT : "receives"
```

---

## Relationship Summary

| Relationship | Cardinality | Through Model | On Delete | Notes |
|---|---|---|---|---|
| `User` → `Caseworker` | One-to-One | — | CASCADE | Django profile pattern (ADR-003) |
| `Caseworker` → `YoungPerson` | One-to-Many | — | SET_NULL | Deleting caseworker preserves clients |
| `Caseworker` → `Case` | One-to-Many | — | SET_NULL | Deleting caseworker preserves cases |
| `YoungPerson` → `Case` | One-to-Many | — | CASCADE | Deleting client removes their cases |
| `Case` ↔ `Offence` | Many-to-Many | `CaseOffence` | CASCADE | Stores date_of_offence, location (ADR-001) |
| `Case` → `CourtHearing` | One-to-Many | — | CASCADE | Multiple hearings per case (adjournments) |
| `Case` ↔ `Program` | Many-to-Many | `Enrolment` | CASCADE | Stores status, enrolment_date (ADR-001) |

---

## Design Notes

### Through Models (ADR-001)
Both many-to-many relationships use explicit through models instead of plain `ManyToManyField`. This is because:
- `CaseOffence` stores `date_of_offence` and `location` — attributes of the specific occurrence, not of either `Case` or `Offence` alone
- `Enrolment` stores `status`, `enrolment_date`, and `completion_date` — attributes of the specific enrolment, not of either `Case` or `Program` alone

### Cascade Choices
- `SET_NULL` on `Caseworker` foreign keys — a caseworker leaving the organisation should not delete client and case records. Records become unassigned and can be reassigned.
- `CASCADE` on `YoungPerson → Case` — a case without a client has no meaning and should not persist.
- `CASCADE` on `Case → CourtHearing / CaseOffence / Enrolment` — these records are owned by the case.

### Fat Model Pattern (ADR-005)
Business logic methods live on models, not views or templates:
- `YoungPerson.age()` — calculates current age from `date_of_birth`
- `YoungPerson.active_case_count()` — counts open cases
- `Program.available_spots()` — computes remaining capacity from active enrolments
- `Program.is_full()` — boolean helper derived from `available_spots()`
- `Case.is_open()` — boolean helper for status check
- `Case.hearing_count()` — count of hearings for display
