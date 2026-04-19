# Code Review 1 — models.py

**Reviewer:** Sakar0  
**Author:** [Member 1 Name]  
**Date:** 19 April 2026  
**File Reviewed:** `cases/models.py`  
**Pull Request:** `feature/domain-models` → `main`

---

## Overview

This review covers the complete domain model layer for the Youth Justice Case Management System. The review focused on OO design quality, adherence to Django conventions, correctness of relationship definitions, and the fat-model pattern.

---

## Detailed Findings

### ✅ Strengths

**1. Through models correctly used for both M2M relationships**
Both `CaseOffence` and `Enrolment` are proper through models with meaningful extra fields. This is the correct design decision per ADR-001 — a plain `ManyToManyField` would lose `date_of_offence` and `enrolment_date`.

**2. Fat-model pattern applied consistently**
Business logic methods `age()`, `active_case_count()`, `available_spots()`, `is_full()`, `is_open()`, and `hearing_count()` all live on the model. This keeps views and templates clean and makes logic reusable and testable.

**3. `Meta` classes defined on all models**
`ordering`, `verbose_name`, and `verbose_name_plural` are all set — consistent defaults throughout the app without extra work in views.

**4. `__str__` methods on every model**
All models implement `__str__`, making admin panel and debug output readable.

**5. `SET_NULL` vs `CASCADE` used correctly**
- `SET_NULL` on `Caseworker` FK — a caseworker leaving should not delete client or case records
- `CASCADE` on `YoungPerson → Case` — a case without a client has no meaning

---

### 🔧 Issues Found and Fixed

**Issue 1: `YoungPerson.age()` was originally computed in the template**

*Original (template):*
```html
{{ client.date_of_birth|timesince }}
```
This is inaccurate and not age in years. The calculation belongs on the model.

*Fixed (models.py):*
```python
def age(self):
    today = timezone.now().date()
    dob = self.date_of_birth
    return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
```
**Rationale:** Fat-model pattern — business logic on the model, not in templates.

---

**Issue 2: `CaseOffence.unique_together` was missing**

*Original:*
```python
class Meta:
    ordering = ['-date_of_offence']
```

*Fixed:*
```python
class Meta:
    unique_together = ('case', 'offence')
    ordering = ['-date_of_offence']
```
**Rationale:** Without this constraint, the same offence could be recorded multiple times on a case, corrupting the data.

---

**Issue 3: `Program.is_full()` was missing — logic was duplicated in templates**

*Original (template):*
```html
{% if program.capacity == program.enrolled_count %}Full{% endif %}
```

*Fixed (models.py):*
```python
def is_full(self):
    return self.available_spots() == 0
```
**Rationale:** DRY — the check was used in two places. Centralising on the model means one change updates all uses.

---

**Issue 4: `Case.RISK_CHOICES` was missing — risk_level used a plain CharField**

*Original:*
```python
risk_level = models.CharField(max_length=10, default='low')
```

*Fixed:*
```python
RISK_CHOICES = [('low', 'Low'), ('medium', 'Medium'), ('high', 'High')]
risk_level = models.CharField(max_length=10, choices=RISK_CHOICES, default='low')
```
**Rationale:** Without `choices`, the admin field is a plain text box — any string can be entered, breaking template badge logic.

---

## Summary

| Finding | Severity | Status |
|---------|----------|--------|
| `age()` in template instead of model | Medium | ✅ Fixed |
| `unique_together` missing on `CaseOffence` | High | ✅ Fixed |
| `is_full()` duplicated in templates | Low | ✅ Fixed |
| `RISK_CHOICES` missing on `Case` | Medium | ✅ Fixed |

**Outcome:** All issues resolved. `models.py` approved for merge into `main`.

---

*Signed: [Member 3 Name], [Date]*
