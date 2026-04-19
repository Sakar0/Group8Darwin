# Youth Justice Case Management System

A Django web application for managing youth justice cases, clients, court hearings, and rehabilitation programs.

**Assessment 2 — Group Project | Youth Justice & Crime Theme**

---

## Quick Start

### Prerequisites
- Python 3.11 or higher
- pip

### Setup and Run

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_TEAM/youth_justice.git
cd youth_justice

# 2. Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# Mac / Linux
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run database migrations
python manage.py makemigrations
python manage.py migrate

# 5. Create an admin superuser
python manage.py createsuperuser
# Enter username, email, and password when prompted

# 6. Start the development server
python manage.py runserver
```

Open your browser:
- **App:** http://127.0.0.1:8000/
- **Admin panel:** http://127.0.0.1:8000/admin/

---

## Getting Started with Test Data

After running the server:

1. Go to http://127.0.0.1:8000/admin/
2. Log in with your superuser credentials
3. Create a **Caseworker** (requires creating a User first under Auth → Users)
4. Create an **Offence** (e.g. "Theft", severity: minor)
5. Create a **Program** (e.g. "Youth Diversion Program", type: diversion)
6. Create a **Young Person** (client) and assign to your caseworker
7. Create a **Case** linked to that young person

Then visit http://127.0.0.1:8000/ and log in to see the dashboard.

---

## Project Structure

```
youth_justice/
├── core/                        # Django project configuration
│   ├── settings.py              # All project settings
│   ├── urls.py                  # Root URL routing
│   └── wsgi.py
│
├── cases/                       # Main domain application
│   ├── models.py                # 8 domain models
│   ├── views.py                 # 12 class-based views
│   ├── urls.py                  # 13 URL routes
│   ├── admin.py                 # Admin registrations with inlines
│   └── templates/
│       ├── cases/               # 10 HTML templates
│       │   ├── base.html
│       │   ├── dashboard.html
│       │   ├── youngperson_list.html
│       │   ├── youngperson_detail.html
│       │   ├── case_list.html
│       │   ├── case_detail.html
│       │   ├── program_list.html
│       │   ├── program_detail.html
│       │   ├── caseworker_list.html
│       │   └── form.html
│       └── registration/
│           └── login.html       # Custom login page
│
├── accounts/                    # Auth app (Django built-in)
├── static/                      # Static assets
├── ADR.md                       # 6 Architecture Decision Records
├── ERD.md                       # Entity Relationship Diagram (Mermaid)
├── PROJECT_PLAN.md              # Team contract and project plan
├── requirements.txt             # Python dependencies
└── SUPPLEMENTARY/
    ├── CODE_REVIEW_1.md         # Review of models.py
    ├── CODE_REVIEW_2.md         # Review of views.py
    ├── CLASS_DIAGRAM.md         # UML class diagram (Mermaid)
    └── DJANGO_PHILOSOPHIES.md   # Evidence of philosophies and patterns
```

---

## Features

- **Dashboard** — live stats, upcoming hearings, high-risk cases
- **Client Management** — register, search, view, edit young persons
- **Case Management** — create, filter by status/risk, full detail view
- **Offence Recording** — severity classification, court referral flag
- **Court Hearings** — scheduling, outcome tracking, adjournment support
- **Program Enrolments** — capacity management, status tracking
- **Staff Directory** — caseworker profiles with client and case counts
- **Authentication** — login-protected all views, custom login page
- **Admin Panel** — full CRUD with inline editing for all models

---

## Architecture Decisions

See `ADR.md` for all 6 Architecture Decision Records documenting:
- ADR-001: Through models for M2M relationships
- ADR-002: Class-based views for all CRUD
- ADR-003: OneToOneField profile for Caseworker
- ADR-004: QuerySet optimisation strategy
- ADR-005: MTV pattern and two-app structure
- ADR-006: Django's built-in authentication

---

## Dependencies

```
Django>=4.2,<5.0
pillow>=10.0
```
