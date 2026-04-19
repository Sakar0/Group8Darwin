"""
cases/models.py

Core domain models for the Youth Justice Case Management System.

Domain: youth justice case management — models represent core entities (clients,
cases, offences, programs) and the explicit relationships between them.

Django philosophies applied:
    - Explicit is better than implicit: through models used for ALL M2M relationships
        so extra attributes are stored without ambiguity (ADR-001)
    - DRY: shared logic lives on the model — fat-model pattern (ADR-005)
    - Loose coupling: models do not import from views or templates (ADR-005)
"""

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# ─── Caseworker ───────────────────────────────────────────────────────────────
class Caseworker(models.Model):
    """
    Extends Django's built-in User via a OneToOne profile pattern.
    Stores justice-system-specific fields separate from auth concerns.
    ADR-003: OneToOneField profile — avoids replacing Django's auth model.
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='caseworker_profile'
    )
    staff_id = models.CharField(max_length=20, unique=True)
    phone = models.CharField(max_length=20, blank=True)
    department = models.CharField(max_length=100, blank=True)

    class Meta:
        ordering = ['user__last_name', 'user__first_name']

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.staff_id})"

    def full_name(self):
        return self.user.get_full_name()


# ─── YoungPerson ──────────────────────────────────────────────────────────────
class YoungPerson(models.Model):
    """
    Represents a young person (client) involved in the justice system.
    Fat-model pattern: business logic methods (age, active_case_count)
    live here rather than in views or templates. (ADR-005)
    """
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other / Non-binary'),
        ('N', 'Prefer not to say'),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    address = models.TextField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    guardian_name = models.CharField(max_length=200, blank=True)
    guardian_phone = models.CharField(max_length=20, blank=True)
    indigenous_status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # ForeignKey: many clients can be assigned to one caseworker
    assigned_caseworker = models.ForeignKey(
        Caseworker,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='clients'
    )

    class Meta:
        ordering = ['last_name', 'first_name']
        verbose_name = 'Young Person'
        verbose_name_plural = 'Young Persons'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def full_name(self):
        """Helper used in templates and admin."""
        return f"{self.first_name} {self.last_name}"

    def age(self):
        """Calculate current age from date_of_birth. Business logic on the model."""
        today = timezone.now().date()
        dob = self.date_of_birth
        return today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))

    def active_case_count(self):
        """Return number of currently open cases. Avoids logic in templates."""
        return self.cases.filter(status='open').count()


# ─── Offence ──────────────────────────────────────────────────────────────────
class Offence(models.Model):
    """
    A catalogue of offence types. Reusable across many cases.
    Severity drives downstream workflow decisions.
    """
    SEVERITY_CHOICES = [
        ('minor', 'Minor'),
        ('moderate', 'Moderate'),
        ('serious', 'Serious'),
        ('violent', 'Violent'),
    ]

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    severity = models.CharField(max_length=20, choices=SEVERITY_CHOICES)
    requires_court = models.BooleanField(default=False)

    class Meta:
        ordering = ['severity', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_severity_display()})"


# ─── Case ─────────────────────────────────────────────────────────────────────
class Case(models.Model):
    """
    Central aggregate of the domain. Links a young person to offences,
    a caseworker, court hearings, and rehabilitation programs.

    Both M2M relationships use explicit through models to store
    per-occurrence attributes. (ADR-001)
    """
    STATUS_CHOICES = [
        ('open', 'Open'),
        ('pending', 'Pending Court'),
        ('closed', 'Closed'),
        ('referred', 'Referred'),
        ('diverted', 'Diverted'),
    ]

    RISK_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    case_number = models.CharField(max_length=30, unique=True)
    young_person = models.ForeignKey(
        YoungPerson,
        on_delete=models.CASCADE,
        related_name='cases'
    )
    caseworker = models.ForeignKey(
        Caseworker,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='cases'
    )

    # M2M via explicit through model — ADR-001
    offences = models.ManyToManyField(
        Offence,
        through='CaseOffence',
        related_name='cases',
        blank=True
    )

    # M2M via explicit through model — ADR-001
    programs = models.ManyToManyField(
        'Program',
        through='Enrolment',
        related_name='cases',
        blank=True
    )

    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='open')
    risk_level = models.CharField(
        max_length=10, choices=RISK_CHOICES, default='low')
    opened_date = models.DateField(auto_now_add=True)
    closed_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        ordering = ['-opened_date']

    def __str__(self):
        return f"Case {self.case_number} – {self.young_person}"

    def is_open(self):
        return self.status == 'open'

    def hearing_count(self):
        return self.hearings.count()


# ─── CaseOffence (Through Model) ──────────────────────────────────────────────
class CaseOffence(models.Model):
    """
    Explicit join table for the Case–Offence M2M relationship.
    Stores per-occurrence data: when and where the offence occurred.

    ADR-001: chosen over plain ManyToManyField because date_of_offence
    and location are attributes of the *relationship*, not of either
    entity alone.
    Code reference: cases/models.py — this class
    """
    case = models.ForeignKey(
        Case, on_delete=models.CASCADE, related_name='case_offences')
    offence = models.ForeignKey(
        Offence, on_delete=models.CASCADE, related_name='case_offences')
    date_of_offence = models.DateField()
    location = models.CharField(max_length=200, blank=True)
    details = models.TextField(blank=True)

    class Meta:
        unique_together = ('case', 'offence')
        ordering = ['-date_of_offence']
        verbose_name = 'Case Offence'

    def __str__(self):
        return f"{self.case.case_number} → {self.offence.name} on {self.date_of_offence}"


# ─── CourtHearing ─────────────────────────────────────────────────────────────
class CourtHearing(models.Model):
    """
    Records each court appearance associated with a case.
    One case may have many hearings (adjournments, appeals, sentences).
    """
    OUTCOME_CHOICES = [
        ('pending', 'Pending'),
        ('adjourned', 'Adjourned'),
        ('dismissed', 'Dismissed'),
        ('sentenced', 'Sentenced'),
        ('diverted', 'Diverted'),
        ('acquitted', 'Acquitted'),
    ]

    case = models.ForeignKey(
        Case, on_delete=models.CASCADE, related_name='hearings')
    hearing_date = models.DateTimeField()
    court_name = models.CharField(max_length=200)
    judge = models.CharField(max_length=200, blank=True)
    outcome = models.CharField(
        max_length=20, choices=OUTCOME_CHOICES, default='pending')
    outcome_notes = models.TextField(blank=True)
    next_hearing_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-hearing_date']

    def __str__(self):
        return f"Hearing for {self.case.case_number} on {self.hearing_date.date()}"


# ─── Program ──────────────────────────────────────────────────────────────────
class Program(models.Model):
    """
    A rehabilitation or diversion program that cases can be enrolled in.
    available_spots() and is_full() are business logic methods on the model.
    """
    PROGRAM_TYPE_CHOICES = [
        ('rehabilitation', 'Rehabilitation'),
        ('diversion', 'Diversion'),
        ('education', 'Education'),
        ('counselling', 'Counselling'),
        ('community_service', 'Community Service'),
    ]

    name = models.CharField(max_length=200)
    program_type = models.CharField(
        max_length=30, choices=PROGRAM_TYPE_CHOICES, default='rehabilitation')
    description = models.TextField()
    duration_weeks = models.PositiveIntegerField()
    capacity = models.PositiveIntegerField(default=20)
    facilitator = models.CharField(max_length=200)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    def available_spots(self):
        """Returns remaining capacity based on active enrolments."""
        enrolled = self.enrolments.filter(status='enrolled').count()
        return max(0, self.capacity - enrolled)

    def is_full(self):
        return self.available_spots() == 0


# ─── Enrolment (Through Model) ────────────────────────────────────────────────
class Enrolment(models.Model):
    """
    Explicit join table for the Case–Program M2M relationship.
    Tracks enrolment lifecycle: status, dates, completion notes.

    ADR-001: chosen over plain ManyToManyField because enrolment_date,
    status and completion_date are attributes of the *relationship*.
    Code reference: cases/models.py — this class
    """
    STATUS_CHOICES = [
        ('enrolled', 'Enrolled'),
        ('completed', 'Completed'),
        ('withdrawn', 'Withdrawn'),
        ('referred', 'Referred'),
    ]

    case = models.ForeignKey(
        Case, on_delete=models.CASCADE, related_name='enrolments')
    program = models.ForeignKey(
        Program, on_delete=models.CASCADE, related_name='enrolments')
    enrolment_date = models.DateField(auto_now_add=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='enrolled')
    completion_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ('case', 'program')
        ordering = ['-enrolment_date']

    def __str__(self):
        return f"{self.case.young_person} → {self.program.name} ({self.get_status_display()})"
