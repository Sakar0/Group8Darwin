"""
core/urls.py — Project-level URL configuration.

Django philosophy: Don't reinvent the wheel.
Django's built-in auth URL patterns (login, logout, password reset) are
included via django.contrib.auth.urls rather than reimplemented. (ADR-006)
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('', include('cases.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
