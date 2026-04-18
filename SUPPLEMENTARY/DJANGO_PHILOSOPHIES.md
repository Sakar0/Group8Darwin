# Django Design Philosophies — Evidence Document

**Project:** Youth Justice Case Management System  
**Purpose:** Explicit evidence of Django philosophies and patterns for assessment marking

---

## Django Philosophies Implemented

### 1. DRY — Don't Repeat Yourself

**Definition:** Every piece of knowledge should have a single, unambiguous representation in the system.

**Evidence in this project:**

| Where | How DRY is applied |
|-------|--------------------|
| `cases/views.py` | All CRUD operations use Django's generic CBVs (`ListView`, `DetailView`, `CreateView`, `UpdateView`) — the same request handling, form processing, and redirect logic is not reimplemented per model |
| `cases/templates/cases/base.html` | A single base template is inherited by all 10 page templates using `{% extends %}` — navigation, CSS, and message rendering are defined once |
| `cases/models.py` — `Program.is_full()` | Boolean check `available_spots() == 0` is defined once on the model — not repeated in three templates |
| `cases/models.py` — `YoungPerson.age()` | Age calculation defined once on the model — not repeated in templates or views |
| `core/settings.py` — `LOGIN_REDIRECT_URL` | Login redirect defined once in settings — not hardcoded in any view |

---

### 2. Loose Coupling / Tight Cohesion

**Definition:** Each component should have minimal knowledge of other components. Each component should have a single, well-defined responsibility.

**Evidence in this project:**

| Where | How loose coupling is applied |
|-------|------------------------------|
| Two-app structure: `cases` + `accounts` | Auth concerns (login, users) are in `accounts`; domain concerns (cases, clients, programs) are in `cases`. Neither app knows the implementation details of the other. |
| MTV layer separation | `models.py` never imports from `views.py` or templates. `views.py` never renders HTML directly — it only coordinates with models and passes context to templates. Templates contain no Python business logic. |
| `Caseworker` profile pattern (ADR-003) | `User` handles authentication; `Caseworker` handles domain data. Changes to the auth system do not affect domain logic and vice versa. |
| `cases/urls.py` separate from `core/urls.py` | Each app owns its own URL routes — `core/urls.py` includes them but does not define them |

---

### 3. Explicit is Better Than Implicit

**Definition:** Django should not guess. If something needs to happen, it should be stated explicitly.

**Evidence in this project:**

| Where | How explicit design is applied |
|-------|-------------------------------|
| `CaseOffence` and `Enrolment` through models | Instead of a plain `ManyToManyField` (which hides the join table), explicit through models make the relationship and its attributes visible and auditable (ADR-001) |
| `select_related()` in every view | QuerySet optimisations are stated explicitly at the view level — never left to Django's lazy default loading |
| `cases/models.py` — `unique_together` | Data integrity constraints are explicitly declared on through models — not assumed |
| `core/settings.py` | `LOGIN_URL`, `LOGIN_REDIRECT_URL`, `LOGOUT_REDIRECT_URL`, `TIME_ZONE`, `LANGUAGE_CODE` are all explicitly set — not left as Django defaults |
| `Meta.ordering` on every model | Default ordering is explicitly declared per model — not assumed or handled in views |

---

### 4. Don't Reinvent the Wheel

**Definition:** Django provides many tools. Use them rather than reimplementing.

**Evidence in this project:**

| Where | What is reused |
|-------|---------------|
| `django.contrib.auth.urls` in `core/urls.py` | Login, logout, password reset, and password change views are provided by Django — not written from scratch (ADR-006) |
| `LoginRequiredMixin` in all views | Access control applied via Django's mixin — not a custom decorator or middleware |
| `django.contrib.admin` | The entire admin panel — CRUD for all models, inline editing, search, list filters — uses Django's built-in admin |
| `CreateView` / `UpdateView` | Form rendering, validation, saving, and redirect on success are all handled by Django's generic views — not reimplemented |
| `Model.objects.annotate(Count(...))` | SQL aggregate functions used via the QuerySet API — no raw SQL, no Python counting loops |

---

## Django Design Patterns Implemented

### 1. Model-Template-View (MTV)

Django's fundamental architectural pattern. Each layer has a single responsibility:

| Layer | File | Responsibility |
|-------|------|---------------|
| Model | `cases/models.py` | Data structure, relationships, business logic methods |
| Template | `cases/templates/cases/*.html` | HTML presentation only — no business logic |
| View | `cases/views.py` | Coordinates between model (QuerySet) and template (context) |

### 2. Fat Model, Thin View

Business logic belongs on the model. Views are thin coordinators.

**Fat model methods:**
- `YoungPerson.age()` — computes current age
- `YoungPerson.active_case_count()` — queries open cases
- `Program.available_spots()` — computes remaining capacity
- `Program.is_full()` — boolean derived from capacity
- `Case.is_open()` — boolean status check
- `Case.hearing_count()` — count via reverse FK

**Thin views:** Views call `.get_queryset()` and `.get_context_data()` — they do not contain business logic.

### 3. QuerySet Lazy Evaluation + Optimisation

Django's QuerySets are lazy — they only hit the database when iterated. Views use:
- `select_related()` for FK/O2O — single JOIN
- `prefetch_related()` for reverse FK/M2M — separate optimised query
- `annotate(Count(...))` — SQL aggregates, no Python loops
- `Q` objects — OR-based filtering in one query

### 4. Template Inheritance

`base.html` defines the site skeleton. All 10 page templates extend it using `{% extends "cases/base.html" %}` and fill in `{% block content %}`. This is the Template Method design pattern applied to HTML.

### 5. Profile Pattern

`Caseworker` extends `User` via `OneToOneField`. The profile object adds domain-specific fields while the `User` object handles authentication. These are related but separately responsible objects.
