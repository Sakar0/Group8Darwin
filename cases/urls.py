"""
cases/urls.py — URL routes for the cases app.
All URL names follow the convention: model-action (e.g. case-list, case-detail).
"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.DashboardView.as_view(), name='dashboard'),

    # Young Person (Client)
    path('clients/', views.YoungPersonListView.as_view(), name='youngperson-list'),
    path('clients/add/', views.YoungPersonCreateView.as_view(), name='youngperson-create'),
    path('clients/<int:pk>/', views.YoungPersonDetailView.as_view(), name='youngperson-detail'),
    path('clients/<int:pk>/edit/', views.YoungPersonUpdateView.as_view(), name='youngperson-update'),

    # Cases
    path('cases/', views.CaseListView.as_view(), name='case-list'),
    path('cases/new/', views.CaseCreateView.as_view(), name='case-create'),
    path('cases/<int:pk>/', views.CaseDetailView.as_view(), name='case-detail'),
    path('cases/<int:pk>/edit/', views.CaseUpdateView.as_view(), name='case-update'),

    # Programs
    path('programs/', views.ProgramListView.as_view(), name='program-list'),
    path('programs/<int:pk>/', views.ProgramDetailView.as_view(), name='program-detail'),

    # Caseworkers
    path('caseworkers/', views.CaseworkerListView.as_view(), name='caseworker-list'),
]
