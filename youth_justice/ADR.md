# Architecture Decision Records (ADR)

**Project:** Youth Justice Case Management System  
**Last Updated:** See `git log ADR.md` for incremental commit history

> ADRs are committed incrementally as decisions are made — not all at once at the end. Check the Git log for evidence.

---

## ADR-001: Explicit Through Models for All Many-to-Many Relationships

**Status:** Accepted

**Context:**  
The system needs two many-to-many relationships:
1. `Case` ↔ `Offence` — a case can involve multiple offences, an offence can appear in many cases
2. `Case` ↔ `Program` — a case can enrol in multiple programs, a program can have many cases enrolled

In both situations, the *relationship itself* carries meaningful attributes. For Case–Offence: the date and location the offence occurred. For Case–Program: enrolment status, start date, and completion date. These belong on neither entity alone — they describe the association between two entities.

**Alternatives Considered:**

| Option | Pros | Cons |
|--------|------|------|
| **Plain `ManyToManyField`** | Minimal code; Django handles the join table automatically | Cannot store extra attributes on the relationship; `date_of_offence` and `enrolment_date` have nowhere to go |
| **Separate model with two manual ForeignKeys** | Full control; no M2M magic | Loses Django's built-in M2M QuerySet API; more boilerplate; through model achieves the same without the loss |
| **Through model (chosen)** | Retains full M2M QuerySet API; stores extra relationship attributes; explicit and auditable | Cannot use `.add()` / `.remove()` shorthand — must create through instances directly or via admin inlines |

**Decision:**  
Use explicit `through` models for both relationships:
- `CaseOffence` — through model for `Case.offences`, storing `date_of_offence` and `location`
- `Enrolment` — through model for `Case.programs`, storing `status`, `enrolment_date`, and `completion_date`

This implements Django's *explicit is better than implicit* philosophy: the data model accurately represents domain requirements rather than hiding join-table attributes.

**Code Reference:**
- `cases/models.py` — `CaseOffence` class (through model for Case–Offence)
- `cases/models.py` — `Enrolment` class (through model for Case–Program)
- `cases/models.py` — `Case.offences` field: `ManyToManyField(Offence, through='CaseOffence')`
- `cases/models.py` — `Case.programs` field: `ManyToManyField(Program, through='Enrolment')`
- `cases/admin.py` — `CaseOffenceInline`, `EnrolmentInline` for admin editing

**Consequences:**
- Cannot use `case.offences.add(offence)` shorthand — must create `CaseOffence(case=..., offence=..., date_of_offence=...)` instances
- Full control over relationship data; can filter by `date_of_offence`, `status`, etc.
- Admin inlines make entering through-model records straightforward without custom views

---

## ADR-002: Class-Based Views for All CRUD Operations

**Status:** Accepted

**Context:**  
The application requires standard list, detail, create, and update operations for four models: `YoungPerson`, `Case`, `Program`, and `Caseworker`. Each operation follows the same pattern: query the model, pass data to a template, handle form submission, redirect on success.

**Alternatives Considered:**

| Option | Pros | Cons |
|--------|------|------|
| **Function-based views (FBVs)** | Easier to read for beginners; explicit, linear flow | Repetitive boilerplate — each CRUD operation reimplements the same request handling logic; violates DRY across four models |
| **Django REST Framework (DRF)** | API-first; auto-browsable; serialisers | Overkill for a server-rendered app; adds a large dependency; breaks the MTV pattern the assignment requires |
| **Generic Class-Based Views (chosen)** | DRY — one `ListView` handles all list pages; `LoginRequiredMixin` composable via Python MRO; `get_context_data()` provides a clean extension point | Slightly steeper learning curve; inheritance chain requires understanding `super()` |

**Decision:**  
Use Django's generic CBVs throughout: `ListView`, `DetailView`, `CreateView`, `UpdateView` from `django.views.generic`. Authentication is enforced at the class level via `LoginRequiredMixin` — this is cleaner and less error-prone than decorating every function.

This implements Django's *Don't Repeat Yourself* philosophy: the framework's generic views encode the correct HTTP method handling, form processing, and redirect logic — reimplementing this in FBVs would be reinventing the wheel.

**Code Reference:**
- `cases/views.py` — all imports from `django.views.generic`
- `cases/views.py` — `DashboardView(LoginRequiredMixin, ListView)`
- `cases/views.py` — `YoungPersonListView`, `YoungPersonDetailView`, `YoungPersonCreateView`, `YoungPersonUpdateView`
- `cases/views.py` — `CaseListView`, `CaseDetailView`, `CaseCreateView`, `CaseUpdateView`
- `cases/views.py` — `ProgramListView`, `ProgramDetailView`
- `cases/views.py` — `CaseworkerListView`

**Consequences:**
- Significantly less code than equivalent FBVs across all models
- `reverse_lazy()` required (not `reverse()`) in class-level attributes — URLs not available at import time
- `get_context_data(**kwargs)` must call `super()` to preserve the base context

---

## ADR-003: OneToOneField Profile Pattern for Caseworker

**Status:** Accepted

**Context:**  
Caseworkers need system login access (handled by Django's built-in `User` model) plus additional domain-specific fields: `staff_id`, `department`, `phone`. The question is how to extend `User` without breaking Django's auth machinery.

**Alternatives Considered:**

| Option | Pros | Cons |
|--------|------|------|
| **Custom `AbstractUser`** | Single model, no JOIN required for combined queries | Must be declared before the first migration — replacing auth midway through a project causes complex migration issues |
| **Store extra fields on `User` directly** | No extra model | Pollutes Django's built-in auth model with domain concerns; violates separation of concerns; impossible to do cleanly post-migration |
| **`OneToOneField` profile model (chosen)** | Clean separation of auth and domain concerns; non-destructive; fully supported Django pattern | Requires `select_related('caseworker__user')` for combined queries; creating a caseworker requires creating a `User` first |

**Decision:**  
`Caseworker` model holds a `OneToOneField` to Django's `User`. This is Django's documented *profile pattern* — the standard, recommended approach for extending auth without replacing it.

This implements Django's *loose coupling* philosophy: authentication concerns (password, session, permissions) stay in `User`; justice-system concerns (staff ID, department) stay in `Caseworker`.

**Code Reference:**
- `cases/models.py` — `Caseworker` class with `OneToOneField(User, on_delete=CASCADE, related_name='caseworker_profile')`
- `cases/views.py` — `select_related('caseworker__user')` wherever caseworker name is displayed
- `cases/admin.py` — `CaseworkerAdmin` registration

**Consequences:**
- Every view displaying caseworker name must use `select_related('caseworker__user')` to avoid an extra database query
- Creating a caseworker through the admin requires creating a `User` first
- Django's full permissions and group system remains available and unchanged

---

## ADR-004: QuerySet API Optimisation Strategy

**Status:** Accepted

**Context:**  
Django's ORM generates SQL lazily. Without explicit optimisation, list views that render related model names trigger N+1 queries — one additional query per row to fetch each related object. At 20 rows, a case list with client name and caseworker name would execute 41 queries per page load.

**Alternatives Considered:**

| Option | Pros | Cons |
|--------|------|------|
| **No optimisation** | Zero extra effort | N+1 queries; performance degrades linearly with data volume; poor engineering practice |
| **Raw SQL** | Maximum query control; predictable execution plan | Bypasses Django ORM entirely; not idiomatic; loses portability; harder to maintain |
| **`select_related` + `prefetch_related` + `annotate` + `Q` (chosen)** | Django-idiomatic; dramatic query reduction; composable; no raw SQL | Requires understanding which technique applies to which relationship type |

**Decision:**  
Apply four complementary QuerySet optimisation techniques at the view layer:

1. **`select_related()`** — for ForeignKey and OneToOne traversals. Generates a single SQL JOIN. Used wherever a view displays names from a related model (e.g. `caseworker__user`, `young_person`).
2. **`prefetch_related()`** — for reverse ForeignKey and ManyToMany traversals. Generates a separate optimised query per relationship, then joins in Python. Used for `cases`, `offences`, `programs`.
3. **`annotate(Count(...))`** — for aggregate counts displayed in list views. Computes the count in SQL, avoiding Python-side loops. Used for `case_count`, `enrolled_count`, `client_count`, `case_count`.
4. **`Q` objects** — for OR-based search across multiple fields. A single query instead of chained `.filter()` calls (which would produce AND logic). Used in all search bars.

**Code Reference:**
- `cases/views.py` — `DashboardView.get_queryset()`: `select_related('young_person', 'caseworker__user')`
- `cases/views.py` — `YoungPersonListView.get_queryset()`: `annotate(case_count=Count('cases'))` + `Q` search
- `cases/views.py` — `YoungPersonDetailView.get_context_data()`: `prefetch_related('offences')`
- `cases/views.py` — `ProgramListView.get_queryset()`: `annotate(enrolled_count=Count('enrolments', filter=Q(...)))`
- `cases/views.py` — `CaseworkerListView.get_queryset()`: `annotate(client_count=Count(..., distinct=True))`

**Consequences:**
- List views with 20 rows execute 2–3 queries instead of 41+
- `annotate()` values are available as attributes on model instances (e.g. `client.case_count` in templates)
- `distinct=True` required on `annotate` when multiple JOINs could multiply rows (e.g. caseworker with both clients and cases)

---

## ADR-005: MTV Pattern and Two-App Structure

**Status:** Accepted

**Context:**  
Django enforces the Model-Template-View (MTV) architectural pattern. The project question is how to decompose functionality into Django apps. Options range from a single monolithic app to many fine-grained apps.

**Alternatives Considered:**

| Option | Pros | Cons |
|--------|------|------|
| **Single monolithic app** | Simplest setup | Auth and domain logic tangled; violates loose coupling; difficult to scale or test independently |
| **One app per model** | Maximum separation | Overkill for a small project; excessive cross-app imports; complicates URL namespacing |
| **Two apps: `cases` + `accounts` (chosen)** | Clean separation of auth from domain; each app has a single cohesive responsibility; matches Django's recommended structure | Requires cross-app imports for the `Caseworker` ↔ `User` relationship |

**Decision:**  
Two Django apps:
- `cases` — all domain logic: models, views, templates, URL routes, admin
- `accounts` — authentication (delegates entirely to Django's built-in auth)

Within each app, Django's MTV separation is strictly enforced:
- **Models** (`models.py`) — data encapsulation and business logic. Methods like `age()`, `available_spots()`, `is_full()`, `active_case_count()` live here, not in views or templates. This is the *fat-model, thin-view* pattern.
- **Views** (`views.py`) — coordinate between models and templates using QuerySet API only. No business logic.
- **Templates** (`templates/`) — presentation only. No Python logic beyond iteration and simple conditionals.

**Implemented Django Philosophies:**

| Philosophy | Implementation |
|---|---|
| **DRY** | CBVs eliminate repeated CRUD boilerplate; base template inherited by all pages; shared business methods on models |
| **Loose coupling / tight cohesion** | Two-app structure; MTV layers separated; models don't import views |
| **Explicit is better than implicit** | Through models; explicit `select_related`; all settings declared |
| **Don't reinvent the wheel** | Built-in auth, admin, CBVs, form handling reused throughout |

**Code Reference:**
- `core/settings.py` — `INSTALLED_APPS` with `cases` and `accounts`
- `cases/models.py` — business logic methods (`age()`, `available_spots()`, `is_full()`)
- `cases/views.py` — CBV layer, no business logic
- `cases/templates/` — presentation only

**Consequences:**
- Adding any new feature follows a predictable path: model → view → template → URL → ADR
- Business logic tested at the model layer without needing HTTP requests

---

## ADR-006: Django's Built-in Authentication System

**Status:** Accepted

**Context:**  
The application needs user authentication — login, logout, and access control on all views. Options include building auth from scratch, using a third-party package, or using Django's included system.

**Alternatives Considered:**

| Option | Pros | Cons |
|--------|------|------|
| **Custom auth from scratch** | Complete control | Reimplements a solved, security-critical problem; high risk; violates DRY |
| **`django-allauth`** | Social auth, email verification, token support | Over-engineered for a staff-only intranet system; adds a large dependency |
| **Django built-in `django.contrib.auth` (chosen)** | Battle-tested; included with Django; covers login/logout/password reset; integrates seamlessly with admin panel | Limited UI customisation without overriding templates (we do override `login.html`) |

**Decision:**  
Use Django's built-in authentication system:
- `django.contrib.auth.urls` included in `core/urls.py` for `/accounts/login/`, `/accounts/logout/`, and password management routes
- `LoginRequiredMixin` applied to every view class requiring authentication
- `User` model used as auth base; extended via `Caseworker` profile (ADR-003)
- Custom `cases/templates/registration/login.html` overrides the default login page UI

This directly implements Django's *don't reinvent the wheel* philosophy.

**Code Reference:**
- `core/urls.py` — `path('accounts/', include('django.contrib.auth.urls'))`
- `core/settings.py` — `LOGIN_REDIRECT_URL`, `LOGOUT_REDIRECT_URL`, `LOGIN_URL`
- `cases/views.py` — `from django.contrib.auth.mixins import LoginRequiredMixin`
- `cases/templates/registration/login.html` — custom login UI

**Consequences:**
- Zero custom auth code to maintain; security patches handled by Django core team
- Password reset and change flows available at `/accounts/` URLs at no extra cost
- Admin panel shares the same auth — staff use one account for both the app and `/admin/`

---

## ADR Status Summary

| ADR | Title | Status |
|-----|-------|--------|
| ADR-001 | Through models for all M2M relationships | ✅ Accepted |
| ADR-002 | Class-Based Views for all CRUD operations | ✅ Accepted |
| ADR-003 | OneToOneField profile pattern for Caseworker | ✅ Accepted |
| ADR-004 | QuerySet API optimisation strategy | ✅ Accepted |
| ADR-005 | MTV pattern and two-app structure | ✅ Accepted |
| ADR-006 | Django's built-in authentication system | ✅ Accepted |
