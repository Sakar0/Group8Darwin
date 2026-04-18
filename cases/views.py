"""
cases/views.py

All views use Django's Class-Based Views (CBVs).

Django philosophies demonstrated:
  - DRY: CBVs eliminate repeated boilerplate across all CRUD operations (ADR-002)
  - Don't reinvent the wheel: LoginRequiredMixin, generic CBVs reused (ADR-006)
  - Loose coupling: views depend only on models via QuerySet API (ADR-005)

QuerySet optimisations throughout (ADR-004):
  - select_related()     → ForeignKey / OneToOne traversals (single SQL JOIN)
  - prefetch_related()   → reverse FK and M2M traversals (separate optimised query)
  - annotate(Count())    → aggregate values without Python-side looping
  - Q objects            → OR-based search filtering across multiple fields
  - filter() / count()   → standard QuerySet filtering and aggregation
"""

from django.views.generic import (
    ListView, DetailView, CreateView, UpdateView
)
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.db.models import Count, Q
from django.utils import timezone

from .models import (
    Case, YoungPerson, Program,
    CourtHearing, Enrolment, Caseworker, Offence
)


# ─── Dashboard ────────────────────────────────────────────────────────────────
class DashboardView(LoginRequiredMixin, ListView):
    """
    Landing page. Combines aggregate statistics with a recent case list.
    select_related avoids N+1 on the case list foreign keys.
    All counts use the QuerySet API — no Python-side counting.
    """
    model = Case
    template_name = 'cases/dashboard.html'
    context_object_name = 'recent_cases'

    def get_queryset(self):
        # select_related: fetches young_person and caseworker in a single JOIN
        return (
            Case.objects
            .select_related('young_person', 'caseworker__user')
            .order_by('-opened_date')[:10]
        )

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # filter() + count() — single DB query each, no Python loops
        context['total_cases'] = Case.objects.count()
        context['open_cases'] = Case.objects.filter(status='open').count()
        context['pending_cases'] = Case.objects.filter(status='pending').count()
        context['total_clients'] = YoungPerson.objects.count()
        context['total_programs'] = Program.objects.filter(is_active=True).count()
        # Upcoming hearings: pending outcome, future dates, ordered ascending
        context['upcoming_hearings'] = (
            CourtHearing.objects
            .filter(outcome='pending', hearing_date__gte=timezone.now())
            .select_related('case__young_person')
            .order_by('hearing_date')[:5]
        )
        # High-risk open cases
        context['high_risk_cases'] = (
            Case.objects
            .filter(status='open', risk_level='high')
            .select_related('young_person', 'caseworker__user')[:5]
        )
        return context


# ─── Young Person Views ───────────────────────────────────────────────────────
class YoungPersonListView(LoginRequiredMixin, ListView):
    """
    Lists all clients with optional name search.
    annotate() adds case_count per client without Python-side looping.
    Q objects enable OR-based search across first_name and last_name
    in a single database query.
    """
    model = YoungPerson
    template_name = 'cases/youngperson_list.html'
    context_object_name = 'clients'
    paginate_by = 20

    def get_queryset(self):
        qs = (
            YoungPerson.objects
            .select_related('assigned_caseworker__user')
            .annotate(case_count=Count('cases'))         # ADR-004: annotate
            .order_by('last_name', 'first_name')
        )
        query = self.request.GET.get('q', '').strip()
        if query:
            # Q objects: OR search across two fields in a single query (ADR-004)
            qs = qs.filter(
                Q(first_name__icontains=query) |
                Q(last_name__icontains=query)
            )
        return qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['search_query'] = self.request.GET.get('q', '')
        return context


class YoungPersonDetailView(LoginRequiredMixin, DetailView):
    """
    Full profile for one client with their complete case history.
    prefetch_related used for reverse FK (cases) and nested M2M (offences).
    """
    model = YoungPerson
    template_name = 'cases/youngperson_detail.html'
    context_object_name = 'client'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # prefetch_related: fetches cases and their offences efficiently (ADR-004)
        context['cases'] = (
            self.object.cases
            .select_related('caseworker__user')
            .prefetch_related('offences')
            .order_by('-opened_date')
        )
        return context


class YoungPersonCreateView(LoginRequiredMixin, CreateView):
    """
    Register a new young person.
    reverse_lazy() evaluates URL at call time, not import time. (ADR-002)
    """
    model = YoungPerson
    template_name = 'cases/form.html'
    fields = [
        'first_name', 'last_name', 'date_of_birth', 'gender',
        'address', 'phone', 'guardian_name', 'guardian_phone',
        'indigenous_status', 'assigned_caseworker'
    ]
    success_url = reverse_lazy('youngperson-list')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Register New Client'
        context['subtitle'] = 'Add a young person to the system'
        return context


class YoungPersonUpdateView(LoginRequiredMixin, UpdateView):
    model = YoungPerson
    template_name = 'cases/form.html'
    fields = [
        'first_name', 'last_name', 'date_of_birth', 'gender',
        'address', 'phone', 'guardian_name', 'guardian_phone',
        'indigenous_status', 'assigned_caseworker'
    ]
    success_url = reverse_lazy('youngperson-list')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = f'Edit Client: {self.object}'
        context['subtitle'] = 'Update personal details'
        return context


# ─── Case Views ───────────────────────────────────────────────────────────────
class CaseListView(LoginRequiredMixin, ListView):
    """
    Lists cases with optional status, risk-level, and name filters.
    select_related prevents N+1 on young_person and caseworker.
    Q objects used for multi-field search. (ADR-004)
    """
    model = Case
    template_name = 'cases/case_list.html'
    context_object_name = 'cases'
    paginate_by = 20

    def get_queryset(self):
        qs = (
            Case.objects
            .select_related('young_person', 'caseworker__user')
            .order_by('-opened_date')
        )
        status = self.request.GET.get('status', '').strip()
        risk = self.request.GET.get('risk', '').strip()
        query = self.request.GET.get('q', '').strip()

        if status:
            qs = qs.filter(status=status)
        if risk:
            qs = qs.filter(risk_level=risk)
        if query:
            qs = qs.filter(
                Q(case_number__icontains=query) |
                Q(young_person__first_name__icontains=query) |
                Q(young_person__last_name__icontains=query)
            )
        return qs

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['status_filter'] = self.request.GET.get('status', '')
        context['risk_filter'] = self.request.GET.get('risk', '')
        context['search_query'] = self.request.GET.get('q', '')
        context['status_choices'] = Case.STATUS_CHOICES
        return context


class CaseDetailView(LoginRequiredMixin, DetailView):
    """
    Full case view: details, offences, hearings, program enrolments.
    Uses select_related and prefetch_related to load all sub-data efficiently.
    """
    model = Case
    template_name = 'cases/case_detail.html'
    context_object_name = 'case'

    def get_queryset(self):
        return (
            Case.objects
            .select_related('young_person', 'caseworker__user')
            .prefetch_related('offences', 'programs')
        )

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['hearings'] = self.object.hearings.order_by('-hearing_date')
        context['enrolments'] = (
            self.object.enrolments
            .select_related('program')
            .order_by('-enrolment_date')
        )
        context['case_offences'] = (
            self.object.case_offences
            .select_related('offence')
            .order_by('-date_of_offence')
        )
        return context


class CaseCreateView(LoginRequiredMixin, CreateView):
    model = Case
    template_name = 'cases/form.html'
    fields = ['case_number', 'young_person', 'caseworker', 'status', 'risk_level', 'notes']
    success_url = reverse_lazy('case-list')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Open New Case'
        context['subtitle'] = 'Create a new case record'
        return context


class CaseUpdateView(LoginRequiredMixin, UpdateView):
    model = Case
    template_name = 'cases/form.html'
    fields = ['case_number', 'young_person', 'caseworker', 'status', 'risk_level', 'closed_date', 'notes']
    success_url = reverse_lazy('case-list')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = f'Update Case {self.object.case_number}'
        context['subtitle'] = 'Modify case details'
        return context


# ─── Program Views ────────────────────────────────────────────────────────────
class ProgramListView(LoginRequiredMixin, ListView):
    """
    Lists active rehabilitation programs.
    annotate() with filter adds enrolled_count per program without Python aggregation.
    """
    model = Program
    template_name = 'cases/program_list.html'
    context_object_name = 'programs'

    def get_queryset(self):
        return (
            Program.objects
            .filter(is_active=True)
            .annotate(
                enrolled_count=Count(
                    'enrolments',
                    filter=Q(enrolments__status='enrolled')
                )
            )
            .order_by('name')
        )


class ProgramDetailView(LoginRequiredMixin, DetailView):
    model = Program
    template_name = 'cases/program_detail.html'
    context_object_name = 'program'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['enrolments'] = (
            self.object.enrolments
            .select_related('case__young_person')
            .filter(status='enrolled')
            .order_by('enrolment_date')
        )
        context['completed_count'] = (
            self.object.enrolments.filter(status='completed').count()
        )
        return context


# ─── Caseworker Views ─────────────────────────────────────────────────────────
class CaseworkerListView(LoginRequiredMixin, ListView):
    """
    Lists all caseworkers with client and case counts.
    annotate() with distinct=True handles the double-counting from JOINs.
    """
    model = Caseworker
    template_name = 'cases/caseworker_list.html'
    context_object_name = 'caseworkers'

    def get_queryset(self):
        return (
            Caseworker.objects
            .select_related('user')
            .annotate(
                client_count=Count('clients', distinct=True),
                case_count=Count('cases', distinct=True)
            )
            .order_by('user__last_name')
        )
