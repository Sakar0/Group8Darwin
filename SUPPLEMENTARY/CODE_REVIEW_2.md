# Code Review 2 — views.py

**Reviewer:** [Member 4 Name]  
**Author:** [Member 1 Name]  
**Date:** [Date]  
**File Reviewed:** `cases/views.py`  
**Pull Request:** `feature/cbv-views` → `main`

---

## Overview

This review covers all class-based views in `cases/views.py`. The review focused on QuerySet efficiency, authentication enforcement, correct use of CBV patterns, and alignment with ADR-002 (CBVs) and ADR-004 (QuerySet optimisation).

---

## Detailed Findings

### ✅ Strengths

**1. `LoginRequiredMixin` on every view**
All 12 view classes mix in `LoginRequiredMixin` as the first base class. No view is accessible without authentication. The correct MRO (Method Resolution Order) is maintained — `LoginRequiredMixin` before the generic view.

**2. `reverse_lazy()` used in class-level `success_url`**
All `CreateView` and `UpdateView` subclasses use `reverse_lazy()` not `reverse()` for `success_url`. This is correct because class bodies are evaluated at import time when the URL configuration may not yet be loaded.

**3. `get_context_data(**kwargs)` always calls `super()`**
All `get_context_data` overrides begin with `context = super().get_context_data(**kwargs)`. This preserves the base context (including pagination data from `ListView`) which would be silently lost without the `super()` call.

**4. `annotate()` used for counts — no Python loops**
`YoungPersonListView`, `ProgramListView`, and `CaseworkerListView` all use `annotate(Count(...))` to compute counts in SQL. Templates receive these as attributes (e.g. `client.case_count`) without any Python-side aggregation.

---

### 🔧 Issues Found and Fixed

**Issue 1: `DashboardView` originally used no `select_related`**

*Original:*
```python
def get_queryset(self):
    return Case.objects.order_by('-opened_date')[:10]
```
With 10 rows, this triggered 21 additional queries — one each for `young_person` and `caseworker` per row.

*Fixed:*
```python
def get_queryset(self):
    return (
        Case.objects
        .select_related('young_person', 'caseworker__user')
        .order_by('-opened_date')[:10]
    )
```
**Rationale:** ADR-004 — `select_related` eliminates N+1 by generating a single SQL JOIN.

---

**Issue 2: `ProgramListView` annotated all enrolments, not just active ones**

*Original:*
```python
.annotate(enrolled_count=Count('enrolments'))
```
This counted withdrawn and completed enrolments too, giving an inflated and misleading number.

*Fixed:*
```python
.annotate(
    enrolled_count=Count(
        'enrolments',
        filter=Q(enrolments__status='enrolled')
    )
)
```
**Rationale:** The annotate `filter` argument allows conditional counting in a single query — no subquery needed.

---

**Issue 3: `CaseListView` search used chained `.filter()` (AND logic)**

*Original:*
```python
if query:
    qs = qs.filter(case_number__icontains=query)
    qs = qs.filter(young_person__first_name__icontains=query)
```
This produced AND logic — a case would only match if *both* fields contained the query. A search for "Smith" would return nothing unless the case number also contained "Smith".

*Fixed:*
```python
if query:
    qs = qs.filter(
        Q(case_number__icontains=query) |
        Q(young_person__first_name__icontains=query) |
        Q(young_person__last_name__icontains=query)
    )
```
**Rationale:** ADR-004 — `Q` objects with `|` produce OR logic in a single query. Also added `last_name` to the search fields.

---

**Issue 4: `CaseworkerListView` annotate produced inflated counts due to multiple JOINs**

*Original:*
```python
.annotate(
    client_count=Count('clients'),
    case_count=Count('cases')
)
```
When both annotations are applied simultaneously, the SQL JOINs multiply rows — a caseworker with 3 clients and 5 cases would produce `client_count=15` (3×5) and `case_count=15`.

*Fixed:*
```python
.annotate(
    client_count=Count('clients', distinct=True),
    case_count=Count('cases', distinct=True)
)
```
**Rationale:** `distinct=True` deduplicates the results of each COUNT independently, preventing row multiplication from the compound JOIN.

---

**Issue 5: `YoungPersonDetailView` did not use `prefetch_related` for offences**

*Original:*
```python
context['cases'] = self.object.cases.select_related('caseworker__user')
```
Accessing `case.offences` in the template for each case would trigger one query per case.

*Fixed:*
```python
context['cases'] = (
    self.object.cases
    .select_related('caseworker__user')
    .prefetch_related('offences')
    .order_by('-opened_date')
)
```
**Rationale:** `prefetch_related` for M2M traversals — fetches all offences for all cases in a single additional query.

---

## Summary

| Finding | Severity | Status |
|---------|----------|--------|
| No `select_related` in `DashboardView` | High | ✅ Fixed |
| `ProgramListView` counting all enrolment statuses | Medium | ✅ Fixed |
| `CaseListView` search using AND instead of OR | High | ✅ Fixed |
| `CaseworkerListView` double-counting from compound JOINs | High | ✅ Fixed |
| `YoungPersonDetailView` missing `prefetch_related` | Medium | ✅ Fixed |

**Outcome:** All issues resolved. `views.py` approved for merge into `main`.

---

*Signed: [Member 4 Name], [Date]*
