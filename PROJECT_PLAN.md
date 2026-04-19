# Project Plan & Team Contract
## Youth Justice Case Management System
### Assessment 2 — Django Web Application | Group Project

---

## 1. Project Overview

**Project Theme:** Option A — Theme 1: Youth Justice & Crime  
**Application Name:** Youth Justice Case Management System (YJCMS)  
**Framework:** Django 4.2 LTS  
**Language:** Python 3.11+  
**Database:** SQLite (development)  
**Version Control:** Git / GitHub (shared team repository)

### Purpose
The YJCMS is a web-based internal tool for youth justice workers to manage:
- Young person (client) records — demographics, guardian info, indigenous status
- Case records — lifecycle tracking from open to closed/diverted
- Offence recording — severity classification with court referral flags
- Court hearing scheduling — outcomes and adjournment tracking
- Rehabilitation/diversion program enrolments — capacity management and status tracking

### Scope

**In Scope:**
- Full CRUD for YoungPerson, Case, Program, Caseworker
- Court hearing and offence recording
- Dashboard with live statistics and upcoming hearings
- Authentication and login-required access control
- Admin panel for data management
- Search and filtering on list views

**Out of Scope:**
- Document upload / file attachments
- Email or SMS notifications
- Mobile application
- External API integrations
- Role-based permissions (all staff have equal access)

---

## 2. Team Members and Roles

| Name | Student ID | Primary Responsibility | Secondary Responsibility |
|------|-----------|----------------------|------------------------|
| [Member 1] | [ID] | Backend lead — models.py, views.py | ADR documentation |
| [Member 2] | [ID] | Frontend lead — templates, CSS | Testing and bug fixes |
| [Member 3] | [ID] | Database design — ERD, migrations | Code reviews |
| [Member 4] | [ID] | Architecture — settings, URLs, admin | Supplementary documentation |

> **Note:** All members contributed across all areas. Roles indicate primary ownership for accountability — not exclusive contribution. All members are expected to explain any part of the codebase at the viva.

---

## 3. Team Contract

### 3.1 Communication Standards
- Primary channel: Group messaging (Discord / WhatsApp)
- Weekly check-in: Every Friday at 3:00 PM via video call or in person
- Response time: Within 24 hours on weekdays, 48 hours on weekends
- Escalation: If a member is unresponsive for 48 hours, the group lead contacts them directly; if unresolved, the unit coordinator is informed

### 3.2 Code Standards
- All code committed to the shared GitHub repository only — no emailing files
- Commit messages must be descriptive and follow the pattern:  
  `feat: add YoungPerson list view with search`  
  `fix: correct N+1 query in DashboardView`  
  `docs: add ADR-004 for QuerySet optimisation`
- No direct commits to `main` — all work via feature branches
- Branches named: `feature/feature-name` or `fix/bug-description`
- Each pull request requires at least one peer review and approval before merging

### 3.3 ADR Commitment
- An ADR entry must be written **before or immediately after** implementing a significant architectural decision
- ADR commits are separate from code commits so markers can verify the incremental history
- No ADR entry is permitted to be backdated or written all at once at the end

### 3.4 Conflict Resolution
1. Raise disagreement in the group channel with written reasoning
2. Group discusses and votes — majority decision is final
3. If unresolved, all parties present their case to the unit coordinator
4. The group coordinator's decision is final

### 3.5 Contribution Expectations
- Each member makes at least one meaningful Git commit per week during the development period
- If a member cannot complete assigned tasks, they notify the group at least 48 hours before the relevant deadline
- All members are expected to be able to explain all submitted code at the viva — preparation is an individual responsibility
- Grade distribution is equal unless a member demonstrably fails to contribute, in which case the group may request individual adjustment via formal written request to the unit coordinator

---

## 4. Technology Decisions

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Language | Python 3.11+ | Django requirement |
| Framework | Django 4.2 LTS | Assignment requirement; long-term support |
| Database | SQLite | Zero configuration for development; swappable to PostgreSQL for production |
| Version control | Git + GitHub | Industry standard; commit history provides ADR evidence |
| Frontend | Django templates + inline CSS | No extra build tools; meets the assignment's server-rendered requirement |
| Auth | Django built-in auth | Battle-tested; ADR-006 |
| Architecture | Two apps (cases + accounts) | ADR-005 |

---

## 5. System Architecture Summary

```
youth_justice/
├── core/                   ← Project configuration
│   ├── settings.py         ← All environment settings (explicit, not implicit)
│   ├── urls.py             ← Root URL routing including auth URLs
│   └── wsgi.py
│
├── cases/                  ← Main domain app (all domain logic)
│   ├── models.py           ← 8 models with business logic methods
│   ├── views.py            ← 12 CBVs with QuerySet optimisation
│   ├── urls.py             ← 13 URL routes
│   ├── admin.py            ← Admin registrations with inlines
│   └── templates/cases/   ← 10 HTML templates
│       └── registration/  ← Login template override
│
├── accounts/               ← Auth app (delegates to Django built-in)
├── static/                 ← Static files
├── ADR.md                  ← 6 Architecture Decision Records
├── ERD.md                  ← Entity Relationship Diagram
├── PROJECT_PLAN.md         ← This document
├── SUPPLEMENTARY/          ← Code reviews, class diagram
└── requirements.txt
```

### Django Philosophies Demonstrated

| Philosophy | Where Applied |
|---|---|
| **DRY (Don't Repeat Yourself)** | CBVs eliminate repeated CRUD boilerplate; base template inherited by all 10 pages; shared business methods on models |
| **Loose coupling / tight cohesion** | Two-app structure separates auth from domain; MTV layers strictly separated |
| **Explicit is better than implicit** | Through models instead of plain M2M; explicit `select_related` calls; all settings declared explicitly |
| **Don't reinvent the wheel** | Django's built-in auth, admin, generic CBVs, and form handling reused throughout |

---

## 6. Work Plan

### Phase 1 — Setup (Week 1)
- [x] Create shared GitHub repository with branch protection rules
- [x] Initialise Django project (`core`) and apps (`cases`, `accounts`)
- [x] Draft initial ERD — identify all entities and relationships
- [x] Write **ADR-001** (through models) — commit before implementing models
- [x] Write ADR-005 (MTV + app structure) — commit before writing views
- [x] Implement `models.py` and run first migration

### Phase 2 — Core Backend (Week 2)
- [x] Write **ADR-002** (CBVs) — commit before writing views
- [x] Write **ADR-003** (Caseworker profile) — commit before writing Caseworker model
- [x] Implement all CBVs in `views.py`
- [x] Write `urls.py` for all routes
- [x] Write **ADR-004** (QuerySet optimisation) — commit alongside views
- [x] Register all models in `admin.py` with inlines

### Phase 3 — Templates and Frontend (Week 3)
- [x] Build `base.html` with navigation
- [x] Build all page templates (dashboard, list, detail, form pages)
- [x] Write **ADR-006** (auth system) — commit before login template
- [x] Implement login template override
- [x] Seed test data via admin panel

### Phase 4 — Documentation and Polish (Week 4)
- [x] Complete `ERD.md` with Mermaid diagram
- [x] Write `SUPPLEMENTARY/CODE_REVIEW_1.md`
- [x] Write `SUPPLEMENTARY/CODE_REVIEW_2.md`
- [x] Write `SUPPLEMENTARY/CLASS_DIAGRAM.md`
- [x] Final testing against submission checklist
- [x] Submit GitHub URL via Learnline

---

## 7. Testing Checklist

- [ ] `pip install -r requirements.txt` succeeds cleanly
- [ ] `python manage.py migrate` runs without errors
- [ ] `python manage.py createsuperuser` completes
- [ ] `python manage.py runserver` starts on `http://127.0.0.1:8000`
- [ ] Login page loads at `/accounts/login/`
- [ ] Login redirects to dashboard
- [ ] Dashboard stats load (no 500 errors)
- [ ] Client list loads and search works
- [ ] Case list loads and status/risk filters work
- [ ] Client detail page loads with case history
- [ ] Case detail page loads with offences, hearings, enrolments
- [ ] Programs list loads with enrolled count
- [ ] Staff list loads with client/case counts
- [ ] Create client form saves correctly
- [ ] Create case form saves correctly
- [ ] Edit forms pre-fill with existing data
- [ ] Admin panel accessible at `/admin/` with superuser
- [ ] All navigation links work without 404s
- [ ] Pagination works on list pages with many records
- [ ] Unauthenticated access to any view redirects to login

---

## 8. Submission Checklist

- [ ] GitHub repository URL submitted via Learnline before due date
- [ ] `ADR.md` — 6 entries, all with full structure and code references
- [ ] `ERD.md` — Mermaid diagram + relationship table
- [ ] `PROJECT_PLAN.md` — this document, updated from Assessment 1
- [ ] `SUPPLEMENTARY/CODE_REVIEW_1.md` — models review
- [ ] `SUPPLEMENTARY/CODE_REVIEW_2.md` — views review
- [ ] `SUPPLEMENTARY/CLASS_DIAGRAM.md` — class diagram
- [ ] `requirements.txt` — complete dependency list
- [ ] Complete runnable Django app with all templates
- [ ] Git history shows incremental ADR commits (not all at once)
- [ ] All four team members have commits in the repository

---

*Document version: 2.0 — updated for Assessment 2*  
*Original version (Assessment 1): [date]*
