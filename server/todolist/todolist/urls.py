from django.contrib import admin
from django.urls import path
from django.urls import re_path
from . import views
urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'api/new_url_test/(.*)', views.router),
]
